import React, { useEffect, useState } from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, Link, Spinner, SpinnerSize } from '@fluentui/react';
import { memoComponent } from '../../util/memo-component';
import { GithubReposResponse } from '../../api/github-repos.types';
import { getGithubPopularRepos } from '../../api/github-repos.requests';

export interface GithubExplorerPopularReposProps {}

const ONE_WEEK_IN_MILLIS = 7 * 24 * 60 * 60 * 1000;

const TABLE_COLUMNS: IColumn[] = [
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 350,
        onRenderField(props, def) {
            if (props == null || def == null) {
                return null;
            }

            return <Link href={props.item.html_url}>{def(props)} </Link>;
        },
    },
    {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 300,
        maxWidth: 700,
    },
    {
        key: 'language',
        name: 'Language',
        fieldName: 'language',
        minWidth: 100,
        maxWidth: 200,
    },
    {
        key: 'stars',
        name: 'Stars',
        fieldName: 'stargazers_count',
        minWidth: 50,
        maxWidth: 100,
    },
    {
        key: 'watchers',
        name: 'Watchers',
        fieldName: 'watchers_count',
        minWidth: 50,
        maxWidth: 100,
    },
    {
        key: 'forks',
        name: 'Forks',
        fieldName: 'forks_count',
        minWidth: 50,
        maxWidth: 100,
    },
];

const TABLE_STYLES = {};

export const GithubExplorerPopularRepos: React.FC<GithubExplorerPopularReposProps> = memoComponent('GithubExplorerPopularRepos', () => {
    const [repos, setRepos] = useState<GithubReposResponse>();
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        void getGithubPopularRepos(new Date(Date.now() - ONE_WEEK_IN_MILLIS).getTime())
            .then(setRepos)
            .catch(setError);
    }, []);

    if (error == null && repos == null) {
        return <Spinner size={SpinnerSize.large} />;
    }

    if (error != null) {
        return <div>There was an error contacting GitHub: ${error}</div>;
    }

    return (
        <DetailsList
            columns={TABLE_COLUMNS}
            items={repos?.items ?? []}
            layoutMode={DetailsListLayoutMode.justified}
            styles={TABLE_STYLES}
        />
    );
});
