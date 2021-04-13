import { Constructable } from '@utils';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Container } from 'typedi';

export interface ViewProps<T = Constructable> {
    viewModel?: T;
}

export type View<R> = FC<Omit<R, keyof ViewProps>>;

export const view = <T extends unknown, R extends ViewProps<T> = ViewProps<T>>(
    Clazz: Constructable<T>, component: FC<R>,
): View<R> => {
    component.defaultProps ||= {};
    component.defaultProps.viewModel = Container.get(Clazz);
    return observer(component);
};
