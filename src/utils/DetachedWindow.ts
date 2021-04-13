import { Constructable } from '@utils';
import { extendObservable } from 'mobx';

export type TDetachedWindowOptions = {
    closeOnUnload: boolean;
};

const defaultOptions: TDetachedWindowOptions = {
    closeOnUnload: true,
};

export interface IDetachedWindow<T> {
    factoryData: T;
    log: (type: string, body: Record<string, any>) => void;
}

export const DetachedWindow = (options: TDetachedWindowOptions = defaultOptions) => <R extends Constructable>(Clazz: R): R & { factoryData: any } => {
    const tmp = class extends Clazz {
        constructor(...args: any[]) {
            super(...args);

            extendObservable(this, {
                factoryData: {
                    a: options.closeOnUnload,
                },
            });
        }

        log = (type: string, body: Record<string, any>): void => {
            console.log(type, body);
        };
    };
    Object.defineProperty(tmp, 'name', { value: Clazz.name });
    return tmp as any;
};
