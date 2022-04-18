import { Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import { memoComponent } from '../../util/memo-component';
import { GithubExplorerPopularRepos } from './github-explorer-popular-repos.component';
import { GithubExplorerStarredRepos } from './github-explorer-starred-repos.component';

export interface GithubExplorerProps {}

export const GithubExplorer: React.FC<GithubExplorerProps> = memoComponent('GithubExplorer', () => {
    return (
        <Pivot>
            <PivotItem headerText="Popular repos">
                <GithubExplorerPopularRepos />
            </PivotItem>
            <PivotItem headerText="Starred repos">
                <GithubExplorerStarredRepos />
            </PivotItem>
        </Pivot>
    );
});
