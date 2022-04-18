import React, { useMemo } from 'react';
import { CommandBar } from '@fluentui/react';
import { memoComponent } from '../../util/memo-component';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';
import { useLocalStarredRepos } from '../../util/local-storage.hooks';
import { useGithubExplorerCommandBar } from './hooks/github-explorer.command-bar.hook';

export interface GithubExplorerStarredReposProps {}

export const GithubExplorerStarredRepos: React.FC<GithubExplorerStarredReposProps> = memoComponent('GithubExplorerStarredRepos', () => {
    const { actions, starredRepos } = useLocalStarredRepos();
    const availableLanguages = useMemo(() => {
        return Array.from(new Set(starredRepos.map((item) => item.language)));
    }, [starredRepos]);

    const {
        filteredLanguages,
        barProps: { farItems },
    } = useGithubExplorerCommandBar(availableLanguages, [], actions);

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
            <CommandBar items={[]} farItems={farItems} />
            <GithubExplorerRepoList items={tableItems} />
        </div>
    );
});
