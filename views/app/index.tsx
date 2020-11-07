import { observer } from 'mobx-react-lite';
import React from 'react';
import AppViewModel, { AppContext } from './appViewModel';
import Footer from './footer';
import Header from './header';
import MainBody from './mainBody';
import './style.scss';

const viewModel = new AppViewModel();

const App = observer(() => (
    <AppContext.Provider value={viewModel}>
        <div className="app">
            <Header />
            <MainBody />
            <Footer />
        </div>
    </AppContext.Provider>
));

export default App;
