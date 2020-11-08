import React from 'react';
import { DownloadIcon } from '@components/icons';
import './style.scss';

interface IButton {
    download?: boolean,
    href?: string,
}

export const Button: React.FC<IButton> = props => (
    <a className="page__button" href={props.href} download={props.download}>
        <button>
            <span>
                {props.children}
            </span>
            <DownloadIcon className="page__button_icon" size="1rem"/>
        </button>
    </a>
);
