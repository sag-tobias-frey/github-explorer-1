import React from 'react';
import preval from 'preval.macro';
import { memoComponent } from './memo-component';

export interface GitInfoProps {}

export const {
    buildTime: GIT_BUILD_TIME,
    branchName: GIT_BRANCH_NAME,
    commitHash: GIT_COMMIT_HASH,
    repo: GIT_REPO,
} = preval`
    const { execSync } = require('child_process');
    const execWithDefault = (command, def) => {
        try {
            return execSync(command, 'utf8').toString();
        } catch(e) {
            console.log('There was an error executing "' + command + '", skipping...');
            return def;
        }
    };
    
    const repoUrl = execWithDefault('git config --get remote.origin.url', '-');
    const repo = repoUrl.indexOf('github.com:') >= 0
        ? repoUrl.match(/.*github.com:(.*).git/)[1]
        : repoUrl.match(/.*github.com\\/(.*)/)[1];
    
    module.exports = {
        buildTime: Date.now(),
        branchName: execWithDefault('git rev-parse --abbrev-ref HEAD', '-').trim(),
        commitHash: execWithDefault('git rev-parse HEAD', '-').trim(),
        repo
    };
`;

export const GitInfo: React.FC<GitInfoProps> = memoComponent('GitInfo', () => {
    return (
        <div style={{ textAlign: 'center', padding: 4, border: '1px solid', margin: 8 }}>
            <a href={`https://github.com/${GIT_REPO}/tree/${GIT_COMMIT_HASH}`}>{GIT_COMMIT_HASH}</a> from{' '}
            <a href={`https://github.com/${GIT_REPO}/tree/${GIT_BRANCH_NAME}`}>{GIT_BRANCH_NAME}</a> @{' '}
            {new Date(GIT_BUILD_TIME).toLocaleString()}
        </div>
    );
});
