import React, { useMemo } from 'react';
import { memoComponent } from '../../util/memo-component';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';
import { useLocalStarredRepos } from '../../util/local-storage.hooks';

export interface GithubExplorerStarredReposProps {}

export const GithubExplorerStarredRepos: React.FC<GithubExplorerStarredReposProps> = memoComponent('GithubExplorerStarredRepos', () => {
    const { starredRepos } = useLocalStarredRepos();

    const tableItems = useMemo(() => {
        if (starredRepos == null) {
            return [];
        }

        return starredRepos
            .sort((repo1, repo2) => repo2.stargazers_count - repo1.stargazers_count)
            .map((repo) => ({ ...repo, isLocalStarred: true }));
    }, [starredRepos]);

    return <GithubExplorerRepoList items={tableItems} />;
});
