import { GithubReposResponse } from './github-repos.types';
import { getGithubPopularReposApiUrl } from './github-repos.constants';

export async function getGithubPopularRepos(fromMillis?: number): Promise<GithubReposResponse> {
    const response = await fetch(getGithubPopularReposApiUrl(fromMillis));
    return response.json();
}
