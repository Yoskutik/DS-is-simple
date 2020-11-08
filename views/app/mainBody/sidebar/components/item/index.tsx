import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from '@components/icons';
import { SidebarContext } from '../../sidebarViewModel';
import IItem from './iItem';
import ItemViewModel from './itemViewModel';
import './style.scss';

const viewModel = new ItemViewModel();

export const Item: React.FC<IItem> = observer(props => {
    const CurrentIcon = Icons[props.icon];
    return (
        <div className={`sidebar__item ${props.toBottom ? 'to-bottom' : ''}`}
             style={{ maxHeight: viewModel.maxHeight }}>
            <SidebarContext.Consumer>
                {sidebarViewModel => (
                    <>
                        {props.list ? (
                            <div className="sidebar__item_header"
                                 onClick={viewModel.onHeaderClick.bind(null, props)}>
                                <CurrentIcon className="sidebar__item_icon" size="1.5rem" fill="#F0F0F0" />
                                {!sidebarViewModel.toggled && (
                                    <h2 className="sidebar__item_title">
                                        {props.title}
                                    </h2>
                                )}
                            </div>
                        ) : (
                            <div className="sidebar__item_header"
                                 onClick={viewModel.onHeaderClick.bind(null, props)}>
                                <CurrentIcon className="sidebar__item_icon" size="1.5rem" fill="#F0F0F0" />
                                <Link to={props.href}>
                                    {!sidebarViewModel.toggled && (
                                        <h2 className="sidebar__item_title" onClick={sidebarViewModel.onLinkClick}>
                                            {props.title}
                                        </h2>
                                    )}
                                </Link>
                            </div>
                        )}
                        {!sidebarViewModel.toggled && props.list && (
                            <ul className="sidebar__item_list">
                                {Object.keys(props.list).map(key => (
                                    <Link to={`/${props.list[key]}`} key={Math.random()}
                                          onClick={sidebarViewModel.onLinkClick}>
                                        <li>{key}</li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </SidebarContext.Consumer>
        </div>
    );
});
