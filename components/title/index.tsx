import React from 'react';
import './style.scss';

export const Title: React.FC = ({ children }) => (
    <h2 className="page__title">
        {children}
    </h2>
);
