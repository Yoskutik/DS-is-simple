import React from 'react';
import './style.scss';

export const Container: React.FC = ({ children }) => (
    <div className="page__container">
        {children}
    </div>
);
