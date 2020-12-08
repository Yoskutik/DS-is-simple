import React from 'react';
import { DownloadIcon } from '@components/icons';
import './style.scss';

interface IButton {
    download?: boolean,
    href?: string,
    onClick?: (evt?: React.MouseEvent) => void,
}

export const Button: React.FC<IButton> = props => (
    <a className="page__button" href={props.href} download={props.download}>
        <button onClick={props.onClick}>
            <span>
                {props.children}
            </span>
            {props.download && <DownloadIcon className="page__button_icon" size="1rem"/> }
        </button>
    </a>
);
