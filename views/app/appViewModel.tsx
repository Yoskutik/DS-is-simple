import React from 'react';
import { Service } from 'typedi';
import Storage from '@utils/storage';

export const AppContext = React.createContext<AppViewModel>(null);

@Service()
export default class AppViewModel {
    a = 1;

    log = () => {
        console.log(123);
    };

    constructor() {
        window.addEventListener('beforeunload', () => {
            Storage.set(Storage.Keys.lastVisitedPage, window.location.hash.substr(1));
        });
    }
}
