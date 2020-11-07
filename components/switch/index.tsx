import React from 'react';
import SwitchViewModel from './switchViewModel';
import './style.scss';

const viewModel = new SwitchViewModel();

export const Switch: React.FC = ({ children }) => (
    <div className="page__switch" onClick={viewModel.onItemClick}>
        {children}
    </div>
);

export * from './item';
