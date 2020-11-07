import React from 'react';
import Storage from '@utils/storage';

export const AppContext = React.createContext<AppViewModel>(null);

export default class AppViewModel {
    constructor() {
        window.addEventListener('beforeunload', () => {
            Storage.set(Storage.Keys.lastVisitedPage, window.location.hash.substr(1));
        });
    }
}
