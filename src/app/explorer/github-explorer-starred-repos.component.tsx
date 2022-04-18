import React from 'react';
import { memoComponent } from '../../util/memo-component';

export interface GithubExplorerStarredReposProps {}

export const GithubExplorerStarredRepos: React.FC<GithubExplorerStarredReposProps> = memoComponent('GithubExplorerStarredRepos', () => {
    return <div>Starred Repos</div>;
});
