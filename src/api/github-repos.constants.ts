export const GITHUB_REPOS_URL = 'https://api.github.com/search/repositories';

export function getGithubPopularReposApiUrl(fromMillis?: number): string {
    if (fromMillis == null) {
        return getGithubPopularReposApiUrl(0);
    }

    function padNumber(num: number) {
        if (num < 10) {
            return `0${num}`;
        }

        return `${num}`;
    }

    const baseUrl = `${GITHUB_REPOS_URL}?sort=stars&order=desc`;
    const fromDate = new Date(fromMillis);

    return `${baseUrl}&q=created:>${fromDate.getUTCFullYear()}-${padNumber(1 + fromDate.getUTCMonth())}-${padNumber(
        fromDate.getUTCDate(),
    )}`;
}
