import React from 'react';
import './style.scss';

export const Page: React.FC = ({ children }) => (
    <div className="page">
        {children}
    </div>
);
