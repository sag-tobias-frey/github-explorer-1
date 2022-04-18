import React, { useEffect, useMemo, useState } from 'react';
import { CommandBar, Selection, Spinner, SpinnerSize } from '@fluentui/react';
import { memoComponent } from '../../util/memo-component';
import { GithubRepo, GithubReposResponse } from '../../api/github-repos.types';
import { getGithubPopularRepos } from '../../api/github-repos.requests';
import { useLocalStarredRepos } from '../../util/local-storage.hooks';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';

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

    const {
        actions: { addStarredRepo },
        isStarredRepo,
    } = useLocalStarredRepos();

    const tableItems = useMemo(() => {
        if (repos == null) {
            return [];
        }

        return repos.items.map((repo) => ({ ...repo, isLocalStarred: isStarredRepo(repo) }));
    }, [isStarredRepo, repos]);

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
            <CommandBar
                items={[
                    {
                        key: 'star_repo',
                        text: 'Star repo',
                        disabled: selectedRepos?.length <= 0,
                        iconProps: {
                            iconName: 'FavoriteStar',
                        },
                        onClick() {
                            selectedRepos.forEach(addStarredRepo);
                        },
                    },
                ]}
            />
            <GithubExplorerRepoList items={tableItems} selection={tableSelection} />
        </div>
    );
});
