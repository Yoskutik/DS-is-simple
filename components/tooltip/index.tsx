import React from 'react';
import './style.scss';

interface ITooltip {
    children: string,
    top?: number | string,
    bottom?: number | string,
    right?: number | string,
    left?: number | string,
}

export const Tooltip: React.FC<ITooltip> = props => (
    <div className="tooltip" style={{
        top: props.top,
        bottom: props.bottom,
        right: props.right,
        left: props.left,
    }}>
        <p className="tooltip__body">{props.children}</p>
    </div>
);
