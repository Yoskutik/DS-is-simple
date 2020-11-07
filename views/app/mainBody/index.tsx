import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from '@components';
import Storage from '@utils/storage';
import Sidebar from './sidebar';
import './style.scss';

const pages = {
    '/About': React.lazy(() => import('@pages/About')),
    '/Authors': React.lazy(() => import('@pages/Authors')),
    '/NLP/Russian-homework': React.lazy(() => import('@pages/NLP/RussianHomework')),
};

const MainBody: React.FC = () => (
    <main className="app__main">
        <HashRouter hashType="noslash">
            <Sidebar/>
            <div className="app__main_container">
                <React.Suspense fallback={ <Spinner className="app__main_spinner" size={96} /> }>
                    <Switch>
                        {Object.keys(pages).map(path => (
                            <Route exact path={path} component={pages[path]} key={Math.random()} />
                        ))}
                        <Redirect exact from="/" to={Storage.get(Storage.Keys.lastVisitedPage) || '/About'} />
                    </Switch>
                </React.Suspense>
            </div>
        </HashRouter>
    </main>
);

export default MainBody;
