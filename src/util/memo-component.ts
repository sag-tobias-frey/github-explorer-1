import React, { ComponentProps, ComponentType } from 'react';

export function memoComponent<T extends ComponentType<any>>(
    componentName: string,
    component: T,
    areEqual?: (prev: Readonly<ComponentProps<T>>, next: Readonly<ComponentProps<T>>) => boolean,
) {
    const memo = React.memo(component, areEqual);
    memo.displayName = componentName;
    return memo;
}
