import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item } from './components';
import itemsList from './components/itemsList.json';
import SidebarViewModel, { SidebarContext } from './sidebarViewModel';
import './style.scss';

const viewModel = new SidebarViewModel();

const Sidebar: React.FC = observer(() => (
    <div className={`sidebar ${viewModel.toggled ? 'toggled' : ''}`}
         style={{ flexBasis: viewModel.width, width: viewModel.width, userSelect: viewModel.dragged ? 'none' : null }}>
        <div className="sidebar__toggle">
            <button className="sidebar__toggle_btn" onClick={viewModel.onToggleBtnClick}/>
        </div>
        <SidebarContext.Provider value={viewModel}>
            {itemsList.map(it => (
                <Item {...it} key={Math.random()} />
            ))}
        </SidebarContext.Provider>
        <div className="sidebar__slider" onMouseDown={viewModel.onSliderMouseDown}/>
    </div>
));

export default Sidebar;
