import React, { useEffect, useMemo, useState } from 'react';
import { CommandBar, Selection, Spinner, SpinnerSize } from '@fluentui/react';
import { memoComponent } from '../../util/memo-component';
import { GithubRepo, GithubReposResponse } from '../../api/github-repos.types';
import { getGithubPopularRepos } from '../../api/github-repos.requests';
import { useLocalStarredRepos } from '../../util/local-storage.hooks';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';
import { useGithubExplorerCommandBar } from './hooks/github-explorer.command-bar.hook';

export interface GithubExplorerPopularReposProps {}

const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;

export const GithubExplorerPopularRepos: React.FC<GithubExplorerPopularReposProps> = memoComponent('GithubExplorerPopularRepos', () => {
    const [repos, setRepos] = useState<GithubReposResponse>();
    const [error, setError] = useState<unknown>();

    const [selectedRepos, setSelectedRepos] = useState<GithubRepo[]>([]);
    const [tableSelection] = useState(
        () =>
            new Selection({
                onSelectionChanged() {
                    setSelectedRepos(tableSelection.getSelection() as GithubRepo[]);
                },
            }),
    );

    const availableLanguages = useMemo(() => {
        return Array.from(new Set(repos?.items.map((item) => item.language)));
    }, [repos?.items]);

    const { actions, isStarredRepo } = useLocalStarredRepos();

    const {
        filteredLanguages,
        barProps: { items, farItems },
    } = useGithubExplorerCommandBar(availableLanguages, selectedRepos, actions);

    const tableItems = useMemo(() => {
        if (repos == null) {
            return [];
        }

        return repos.items
            .filter((repo) => filteredLanguages.size === 0 || filteredLanguages.has(repo.language))
            .map((repo) => ({ ...repo, isLocalStarred: isStarredRepo(repo) }));
    }, [filteredLanguages, isStarredRepo, repos]);

    useEffect(() => {
        void getGithubPopularRepos(new Date(Date.now() - ONE_WEEK_IN_MILLIS).getTime())
            .then((reposResponse) => {
                setRepos({
                    ...reposResponse,
                    items: reposResponse.items.sort((repo1, repo2) => repo2.stargazers_count - repo1.stargazers_count),
                });
            })
            .catch(setError);
    }, []);

    if (error == null && repos == null) {
        return <Spinner size={SpinnerSize.large} />;
    }

    if (error != null) {
        return <div>There was an error contacting GitHub: ${error}</div>;
    }

    return (
        <div style={{ paddingTop: 8 }}>
            <CommandBar items={items} farItems={farItems} />
            <GithubExplorerRepoList items={tableItems} selection={tableSelection} />
        </div>
    );
});
