import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tooltip } from '@components';
import FooterViewModel from './footerViewModel';
import './style.scss';

const viewModel = new FooterViewModel();

const Footer = observer(() => (
    <footer className="app__footer">
        {viewModel.showLicenceTooltip && (
            <Tooltip bottom="2.9rem" right="0.5rem">
                Вы можете спокойно контент этого сайта в любых Ваших целях.
                Для этого достаточно добавить ссылку на него в источниках.
            </Tooltip>
        )}
        <div className="app__footer_container">
            <span className="app__footer_licence"
                  onMouseEnter={viewModel.onLicenceMouseEnter}
                  onMouseLeave={viewModel.onLicenceMouseLeave}>
                License: MIT
            </span>
            <a className="app__footer_author" href="https://github.com/Yoskutik" target="_blank" rel="noreferrer">
                &#169; Yoskutik
            </a>
        </div>
    </footer>
));

export default Footer;
