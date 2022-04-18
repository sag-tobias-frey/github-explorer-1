import { useState } from 'react';
import { Selection } from '@fluentui/react';
import { GithubRepo } from '../../../api/github-repos.types';

export const useRepoSelection = () => {
    const [selectedRepos, setSelectedRepos] = useState<GithubRepo[]>([]);
    const [tableSelection] = useState(
        () =>
            new Selection({
                onSelectionChanged() {
                    setSelectedRepos(tableSelection.getSelection() as GithubRepo[]);
                },
            }),
    );

    return {
        selectedRepos,
        tableSelection,
    };
};
