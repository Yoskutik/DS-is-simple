export default class Storage {
    public static readonly Keys = {
        sidebarWidth: 'sidebar-width',
        sidebarToggled: 'sidebar-toggled',
        lastVisitedPage: 'last-visited-page',
    };

    public static set = (key: string, value: number | string | Record<string, unknown> | boolean): void => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    public static get = <T>(key: string): T => JSON.parse(localStorage.getItem(key));
}

// ============================

type Constructable<T = any> = { new (...args: any[]): T };

const dateParser = (_key: string, value: any) => {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|([+-])([\d|:]*))?$/;
    const reMsAjax = /^\/Date\((d|-|.*)\)[/|\\]$/;

    if (typeof value === 'string') {
        if (reISO.exec(value)) return new Date(value);

        const ms = reMsAjax.exec(value);
        if (ms) {
            const b = ms[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }
    return value;
};

export class LocalStorage {
    private static prefix = packageJSON.version;

    static get = <T extends unknown>(key: string): T => JSON.parse(
        localStorage.getItem(`${LocalStorage.prefix}-${key}`), dateParser,
    );

    static set = (key: string, value: any): void => localStorage.setItem(
        `${LocalStorage.prefix}-${key}`, JSON.stringify(value),
    );
}

const saveNameSymbol = Symbol('LocalStorage save name');

export const EnableAutoSave = (name: string): PropertyDecorator => (target, propertyKey) => {
    const value: Record<string, string> = Reflect.getMetadata(saveNameSymbol, target) || {};
    value[propertyKey as any] = name;
    Reflect.defineMetadata(saveNameSymbol, value, target);
};

export const AutoSavable = <T extends Constructable>(Clazz: T): T => {
    const metadata: Record<string, string> = Reflect.getMetadata(saveNameSymbol, Clazz.prototype);
    const tmp = class extends Clazz {
        constructor(...args: any[]) {
            super(...args);
            Object.entries(metadata).forEach(([field, saveName]) => {
                const initialValue = LocalStorage.get(saveName);
                if (initialValue !== null && initialValue !== undefined) {
                    this[field] = this[field] instanceof ObservableSet ? new Set(initialValue as any[]) : initialValue;
                }
                reaction(() => this[field], v => {
                    LocalStorage.set(saveName, v instanceof ObservableSet ? [...v] : toJS(v));
                });
            });
        }
    };
    Object.defineProperty(tmp, 'name', { value: Clazz.name });
    return tmp;
};
