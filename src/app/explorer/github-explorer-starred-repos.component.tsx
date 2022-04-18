import React, { useMemo } from 'react';
import { CommandBar } from '@fluentui/react';
import { memoComponent } from '../../util/memo-component';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';
import { useLocalStarredRepos } from '../../util/local-storage.hooks';
import { useGithubExplorerCommandBar } from './hooks/github-explorer.command-bar.hook';
import { useRepoSelection } from './hooks/github-explorer.selection.hook';

export interface GithubExplorerStarredReposProps {}

export const GithubExplorerStarredRepos: React.FC<GithubExplorerStarredReposProps> = memoComponent('GithubExplorerStarredRepos', () => {
    const { actions, starredRepos } = useLocalStarredRepos();
    const { selectedRepos, tableSelection } = useRepoSelection();

    const availableLanguages = useMemo(() => {
        return Array.from(new Set(starredRepos.map((item) => item.language)));
    }, [starredRepos]);

    const {
        filteredLanguages,
        barProps: { items, farItems },
    } = useGithubExplorerCommandBar(availableLanguages, selectedRepos, actions, { hideStar: true });

    const tableItems = useMemo(() => {
        if (starredRepos == null) {
            return [];
        }

        return starredRepos
            .filter((repo) => filteredLanguages.size === 0 || filteredLanguages.has(repo.language))
            .sort((repo1, repo2) => repo2.stargazers_count - repo1.stargazers_count)
            .map((repo) => ({ ...repo, isLocalStarred: true }));
    }, [filteredLanguages, starredRepos]);

    return (
        <div style={{ paddingTop: 8 }}>
            <CommandBar items={items} farItems={farItems} />
            <GithubExplorerRepoList items={tableItems} selection={tableSelection} />
        </div>
    );
});
