import { useCallback, useEffect, useMemo, useState } from 'react';
import { GithubRepo } from '../api/github-repos.types';

const LOCAL_STORAGE_STARRED_REPOS_KEY = 'tofr.starred_repos';

export const useLocalStarredRepos = () => {
    const [starredReposMap, setStarredReposMap] = useState<Record<string, GithubRepo>>({});
    const starredRepos = useMemo(() => Object.values(starredReposMap), [starredReposMap]);

    useEffect(() => {
        const storedContent = localStorage.getItem(LOCAL_STORAGE_STARRED_REPOS_KEY);
        if (storedContent == null) {
            return;
        }

        // tofr: We could do some more checks here if the parsed content is valid
        setStarredReposMap(JSON.parse(storedContent));
    }, []);

    const isStarredRepo = useCallback(
        (repo: Pick<GithubRepo, 'id'>) => {
            return starredReposMap[repo.id] != null;
        },
        [starredReposMap],
    );

    const deleteStarredRepo = useCallback((repo: Pick<GithubRepo, 'id'>) => {
        setStarredReposMap((oldStarredReposMap) => {
            const { [repo.id]: deletedRepo, ...remainingStarredReposMap } = oldStarredReposMap;

            if (deletedRepo == null) {
                return oldStarredReposMap;
            }

            localStorage.setItem(LOCAL_STORAGE_STARRED_REPOS_KEY, JSON.stringify(remainingStarredReposMap));
            return remainingStarredReposMap;
        });
    }, []);

    const addStarredRepo = useCallback((repo: GithubRepo) => {
        setStarredReposMap((oldStarredReposMap) => {
            const newStarredReposMap = {
                ...oldStarredReposMap,
                [repo.id]: repo,
            };

            localStorage.setItem(LOCAL_STORAGE_STARRED_REPOS_KEY, JSON.stringify(newStarredReposMap));
            return newStarredReposMap;
        });
    }, []);

    return {
        actions: {
            deleteStarredRepo,
            addStarredRepo,
        },
        starredRepos,
        isStarredRepo,
    };
};
