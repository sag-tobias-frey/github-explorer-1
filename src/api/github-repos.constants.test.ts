import { getGithubPopularReposApiUrl, GITHUB_REPOS_URL } from './github-repos.constants';

test('check repo url creation without from time', () => {
    expect(getGithubPopularReposApiUrl().startsWith(GITHUB_REPOS_URL)).toBeTruthy();
    expect(getGithubPopularReposApiUrl().includes('sort=stars')).toBeTruthy();
    expect(getGithubPopularReposApiUrl().includes('order=desc')).toBeTruthy();
});

test('check repo url creation with from time (1970-01-01)', () => {
    expect(getGithubPopularReposApiUrl(0).startsWith(GITHUB_REPOS_URL)).toBeTruthy();
    expect(getGithubPopularReposApiUrl(0).includes('sort=stars')).toBeTruthy();
    expect(getGithubPopularReposApiUrl(0).includes('order=desc')).toBeTruthy();
    expect(getGithubPopularReposApiUrl(0).includes('q=created:>1970-01-01')).toBeTruthy();
});

test('check repo url creation with from time (2022-04-18)', () => {
    expect(getGithubPopularReposApiUrl(1650278249971).startsWith(GITHUB_REPOS_URL)).toBeTruthy();
    expect(getGithubPopularReposApiUrl(1650278249971).includes('sort=stars')).toBeTruthy();
    expect(getGithubPopularReposApiUrl(1650278249971).includes('order=desc')).toBeTruthy();
    expect(getGithubPopularReposApiUrl(1650278249971).includes('q=created:>2022-04-18')).toBeTruthy();
});
