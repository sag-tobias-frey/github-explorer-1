import { DetailsList, DetailsListLayoutMode, IColumn, ISelection, Link, SelectionMode } from '@fluentui/react';
import React from 'react';
import { memoComponent } from '../../util/memo-component';
import { GithubRepo } from '../../api/github-repos.types';

export interface GithubExplorerRepoListProps {
    items: (GithubRepo & { isLocalStarred: boolean })[];
    selection?: ISelection<GithubRepo>;
}

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

            return (
                <Link href={props.item.html_url} key={props.item.id}>
                    {def(props)}
                </Link>
            );
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
    {
        key: 'is_local_starred',
        name: 'Starred',
        fieldName: 'isLocalStarred',
        minWidth: 50,
        maxWidth: 100,
    },
];

const TABLE_STYLES = {};

export const GithubExplorerRepoList = memoComponent('GithubExplorerRepoList', ({ items, selection }) => {
    return (
        <DetailsList
            columns={TABLE_COLUMNS}
            items={items}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={selection == null ? SelectionMode.none : SelectionMode.multiple}
            selection={selection}
            styles={TABLE_STYLES}
        />
    );
});
