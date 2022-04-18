import React from 'react';
import { memoComponent } from '../../util/memo-component';

export interface GithubExplorerPopularReposProps {}

export const GithubExplorerPopularRepos: React.FC<GithubExplorerPopularReposProps> = memoComponent('GithubExplorerPopularRepos', () => {
    return <div>Popular Repos</div>;
});
