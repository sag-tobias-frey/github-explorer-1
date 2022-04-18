module.exports = {
    extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],

    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
                singleQuote: true,
                printWidth: 140,
                'editor.formatOnSave': true,
                proseWrap: 'always',
                tabWidth: 4,
                requireConfig: false,
                useTabs: false,
                trailingComma: 'all',
                bracketSpacing: true,
                bracketSameLine: true,
                semi: true
            }
        ]
    },

    overrides: [
        {
            extends: [
                'airbnb',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:import/typescript'
            ],
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 2018,
                sourceType: 'module',
                project: './tsconfig.json'
            },
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    'warn',
                    {
                        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                        filter: {
                            regex: '^(unstable)?_',
                            match: false
                        },
                        selector: ['variable']
                    }
                ],
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-member-accessibility': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-empty-interface': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-floating-promises': [
                    'error',
                    {
                        ignoreVoid: true
                    }
                ],
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-shadow': ['warn'],
                '@typescript-eslint/unbound-method': 'off',
                '@typescript-eslint/prefer-interface': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',

                'arrow-body-style': 'off',

                'react/function-component-definition': [
                    'error',
                    {
                        namedComponents: 'arrow-function',
                        unnamedComponents: 'arrow-function'
                    }
                ],
                'react/jsx-closing-bracket-location': [
                    'error',
                    {
                        nonEmpty: 'after-props',
                        selfClosing: 'tag-aligned'
                    }
                ],
                'react/jsx-curly-newline': 'off',
                'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
                'react/jsx-indent': ['warn', 4],
                'react/jsx-indent-props': ['warn', 4],
                'react/jsx-one-expression-per-line': 'off',
                'react/jsx-props-no-spreading': ['off', {}],
                'react/jsx-uses-vars': 2,
                'react/jsx-wrap-multilines': ['warn', { declaration: false, assignment: false }],
                'react/no-unstable-nested-components': [
                    'error',
                    {
                        allowAsProps: true
                    }
                ],
                'react-hooks/exhaustive-deps': [
                    'warn',
                    {
                        additionalHooks: '^.*WithDeps$',
                        enableDangerousAutofixThisMayCauseInfiniteLoops: true
                    }
                ],

                'import/extensions': 'off',
                'import/no-cycle': 'error',
                'import/no-named-as-default': 'off',
                'import/no-unresolved': 'off',
                'import/prefer-default-export': 'off',

                indent: 'off',
                'linebreak-style': 'off',

                'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
                'no-void': ['error', { allowAsStatement: true }],
                'no-console': 'error',
                'no-continue': 'off',

                'object-curly-newline': 'off'
            }
        }
    ]
};
