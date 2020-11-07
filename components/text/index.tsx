import React from 'react';
import './style.scss';

export const Text: React.FC = ({ children }) => (
    <p className="page__text">
        {children}
    </p>
);
