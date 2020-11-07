import React from 'react';
import './style.scss';

interface ISwitchItem {
    onClick: () => void,
    value: string,
    active?: boolean,
}

export const SwitchItem: React.FC<ISwitchItem> = props => (
    <span className={`page__switch_item ${props.active ? 'active' : ''}`} onClick={props.onClick}>
        {props.value}
    </span>
);
