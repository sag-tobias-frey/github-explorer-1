import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStarredRepos } from './local-storage.hooks';
import { GithubRepo } from '../api/github-repos.types';

const TEST_REPO: GithubRepo = {
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
};

const TEST_REPO_2: GithubRepo = {
    ...TEST_REPO,
    id: 105,
};

beforeEach(() => localStorage.clear());

test('[useLocalStarredRepos] check initial creation', () => {
    const { result } = renderHook(useLocalStarredRepos);

    expect(result.current.starredRepos.length).toEqual(0);
});

test('[useLocalStarredRepos] check adding repos to local storage', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    expect(result.current.starredRepos.length).toEqual(1);
    expect(result.current.starredRepos[0]).toEqual(TEST_REPO);
});

test('[useLocalStarredRepos] check adding same repo twice to local storage', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    expect(result.current.starredRepos.length).toEqual(1);
    expect(result.current.starredRepos[0]).toEqual(TEST_REPO);
});

test('[useLocalStarredRepos] check adding multiple repos to local storage', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO_2);
    });

    expect(result.current.starredRepos.length).toEqual(2);
    expect(result.current.starredRepos).toContain(TEST_REPO);
    expect(result.current.starredRepos).toContain(TEST_REPO_2);
});

test('[useLocalStarredRepos] check adding multiple repos to local storage in the same render phase', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
        result.current.actions.addStarredRepo(TEST_REPO_2);
    });

    expect(result.current.starredRepos.length).toEqual(2);
    expect(result.current.starredRepos).toContain(TEST_REPO);
    expect(result.current.starredRepos).toContain(TEST_REPO_2);
});

test('[useLocalStarredRepos] check deleting repos from local storage', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.deleteStarredRepo({
            id: TEST_REPO.id,
        });
    });

    expect(result.current.starredRepos.length).toEqual(0);
});

test('[useLocalStarredRepos] check deleting repos from local storage with multiple added', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO_2);
    });

    act(() => {
        result.current.actions.deleteStarredRepo({
            id: TEST_REPO_2.id,
        });
    });

    expect(result.current.starredRepos.length).toEqual(1);
    expect(result.current.starredRepos[0]).toEqual(TEST_REPO);
});

test('[useLocalStarredRepos] check deleting non-starred repos from local storage', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.deleteStarredRepo({
            id: 9999,
        });
    });

    expect(result.current.starredRepos.length).toEqual(1);
    expect(result.current.starredRepos[0]).toEqual(TEST_REPO);
});

test('[useLocalStarredRepos] checking for starred repos', () => {
    const { result } = renderHook(useLocalStarredRepos);

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO);
    });

    act(() => {
        result.current.actions.addStarredRepo(TEST_REPO_2);
    });

    expect(result.current.isStarredRepo(TEST_REPO)).toEqual(true);
    expect(result.current.isStarredRepo(TEST_REPO_2)).toEqual(true);
    expect(result.current.isStarredRepo({ id: 9999 })).toEqual(false);
});
