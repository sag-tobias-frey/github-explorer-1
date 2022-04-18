export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    url: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language: string;
}

export interface GithubReposResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubRepo[];
}
