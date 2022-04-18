import React from 'react';
import { memoComponent } from '../util/memo-component';
import { GitInfo } from '../util/git-info.component';

export interface AppProps {}

export const App: React.FC<AppProps> = memoComponent('App', () => {
    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1, padding: 8 }}>
                <h1>React-Scripts starter by Tobias</h1>
            </div>
            <div>
                <GitInfo />
            </div>
        </div>
    );
});
