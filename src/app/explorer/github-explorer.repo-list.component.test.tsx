import { render, screen } from '@testing-library/react';
import React from 'react';
import { GithubExplorerRepoList } from './github-explorer.repo-list.component';
import { GithubRepo } from '../../api/github-repos.types';

const TEST_REPO: GithubRepo & { isLocalStarred: boolean } = {
    id: 1234,
    name: 'test repo',
    full_name: 'full test repo',
    html_url: 'https://example.com',
    url: 'https://example.com',
    description: 'test repo description',
    stargazers_count: 1000,
    watchers_count: 2000,
    forks_count: 3000,
    language: 'HTML',
    isLocalStarred: true,
};

const TEST_REPO_2: GithubRepo & { isLocalStarred: boolean } = {
    id: 1234,
    name: 'other repo',
    full_name: 'full other repo',
    html_url: 'https://example.com',
    url: 'https://example.com',
    description: 'test other description',
    stargazers_count: 2000,
    watchers_count: 3000,
    forks_count: 4000,
    language: '',
    isLocalStarred: false,
};

test('renders repo list items', () => {
    render(<GithubExplorerRepoList items={[TEST_REPO, TEST_REPO_2]} />);

    const testRepo = screen.getByText(/test repo description/i);
    expect(testRepo).toBeInTheDocument();

    const otherRepo = screen.getByText(/test other description/i);
    expect(otherRepo).toBeInTheDocument();

    const starredRepo = screen.getByText(/true/i);
    expect(starredRepo).toBeInTheDocument();

    const unStarredRepo = screen.getByText(/false/i);
    expect(unStarredRepo).toBeInTheDocument();
});
