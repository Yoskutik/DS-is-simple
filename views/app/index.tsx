import { observer } from 'mobx-react-lite';
import {Container} from "typedi";
import React, {FC} from 'react';
import AppViewModel, { AppContext } from './appViewModel';
import Footer from './footer';
import Header from './header';
import MainBody from './mainBody';
import './style.scss';

type Constructable<T = any> = { new (...args: any[]): T };

interface ViewProps<T> {
    viewModel?: T;
}

interface AppProps extends ViewProps<AppViewModel> {
    asd: number;
}

const view = <T extends unknown, R extends ViewProps<any> = ViewProps<T>>(Clazz: Constructable<T>, component: FC<R>): FC<R> => {
    component.defaultProps = {};
    component.defaultProps.viewModel = Container.get(Clazz);
    return observer(component);
};

const App: FC<AppProps> = view(AppViewModel, ({ viewModel }) => {
    viewModel.log();

    return (
        <AppContext.Provider value={viewModel}>
            <div className="app">
                <Header />
                <MainBody />
                <Footer />
            </div>
        </AppContext.Provider>
    );
});

export default App;
