import { getGithubPopularRepos } from './github-repos.requests';

test('check github repos request response', async () => {
    const response = await getGithubPopularRepos();

    expect(response.total_count).toBeGreaterThan(0);
    expect(response.items[0].id).toBeTruthy();
    expect(response.items[0].name).toBeTruthy();
    expect(response.items[0].description).toBeTruthy();
    expect(response.items[0].stargazers_count).toBeGreaterThanOrEqual(0);
});
