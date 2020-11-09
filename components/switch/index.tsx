import { observer } from 'mobx-react-lite';
import React from 'react';
import SwitchViewModel from './switchViewModel';
import './style.scss';

const viewModel = new SwitchViewModel();

export const Switch: React.FC = observer(({ children }) => (
    <div className="page__switch" onClick={viewModel.onItemClick}
         style={{ maxHeight: viewModel.toggled ? '1000px' : null }}>
        {children}
    </div>
));

export * from './item';
