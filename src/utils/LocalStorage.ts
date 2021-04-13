import packageJSON from '@root/package.json';
import { Constructable } from '@utils';
import { extendObservable, ObservableSet, reaction, toJS } from 'mobx';
import { Service } from 'typedi';

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

  static keys = (): string[] => Object.keys(localStorage);

  static set = (key: string, value: any): void => localStorage.setItem(
    `${LocalStorage.prefix}-${key}`, JSON.stringify(value),
  );

  static delete = (key: string): void => localStorage.removeItem(key);
}

(() => {
  const [v0, v1] = packageJSON.version.match(/\d+/g).map(it => +it);

  LocalStorage.keys().forEach(key => {
    const keyVersion = key.match(/\d+\.\d+\.\d+/)?.[0];
    if (!keyVersion) return;
    const [a, b] = keyVersion.match(/\d+/g).map(it => +it);
    if (a < v0 || (a === v0 && b < v1)) {
      LocalStorage.delete(key);
    }
  });
})();

const saveNameSymbol = Symbol('LocalStorage auto save name');

const registerMetadata = (target, propertyKey: string, name: string): void => {
  const value: Record<string, string> = Reflect.getMetadata(saveNameSymbol, target) || {};
  value[propertyKey] = name;
  Reflect.defineMetadata(saveNameSymbol, value, target);
};

type TAutoSaveField = ((name: string) => PropertyDecorator) & PropertyDecorator;

export const AutoSaveField: TAutoSaveField = (...args: any[]) => {
  if (args.length === 1) {
    return (target, propertyKey: string) => registerMetadata(target, propertyKey, args[0]);
  }
  registerMetadata(args[0], args[1], `${args[0].constructor.name}@${args[1]}`);
  return undefined;
};

export const AutoSavable = <T extends Constructable>(Clazz: T): T => {
  const metadata: Record<string, string> = Reflect.getMetadata(saveNameSymbol, Clazz.prototype);

  Object.keys(metadata).forEach(field => {
    extendObservable(Clazz.prototype, {
      [field]: field,
    });
  });

  const tmp = {};
  tmp[Clazz.name] = class extends Clazz {
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
  Object.defineProperty(tmp[Clazz.name], 'name', { value: Clazz.name });
  Service()(tmp[Clazz.name]);

  return tmp[Clazz.name];
};
