import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from '@components/icons';
import { SidebarContext } from '../../sidebarViewModel';
import IItem from './iItem';
import ItemViewModel from './itemViewModel';
import './style.scss';

const viewModel = new ItemViewModel();

interface IItemHeader {
    props: IItem,
}

const ItemHeader: React.FC<IItemHeader> = ({ children, props }) => (
    <>
        {props.list ? (
            <div className="sidebar__item_header" onClick={viewModel.onHeaderClick.bind(null, props)}>
                {children}
            </div>
        ) : (
            <Link to={props.href}>
                <div className="sidebar__item_header" onClick={viewModel.onHeaderClick.bind(null, props)}>
                    {children}
                </div>
            </Link>
        )}
    </>
);

export const Item: React.FC<IItem> = observer(props => {
    const CurrentIcon = Icons[props.icon];
    return (
        <div className={`sidebar__item ${props.toBottom ? 'to-bottom' : ''}`}
             style={{ maxHeight: viewModel.maxHeight }}>
            <ItemHeader props={props}>
                <CurrentIcon className="sidebar__item_icon" size="1.5rem" fill="#F0F0F0" />
                <SidebarContext.Consumer>
                    {value => !value.toggled && (
                        <h2 className="sidebar__item_title">{props.title}</h2>
                    )}
                </SidebarContext.Consumer>
            </ItemHeader>
            <SidebarContext.Consumer>
                {value => !value.toggled && props.list && (
                    <ul className="sidebar__item_list">
                        {Object.keys(props.list).map(key => (
                            <Link to={`/${props.list[key]}`} key={Math.random()}>
                                <li>{key}</li>
                            </Link>
                        ))}
                    </ul>
                )}
            </SidebarContext.Consumer>
        </div>
    );
});
