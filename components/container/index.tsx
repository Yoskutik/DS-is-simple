import React from 'react';
import './style.scss';

export const Container: React.FC = ({ children }) => {
    console.log(children);
    console.log(children[0]);
    return (
        <div className="page__container">
            {children}
        </div>
    );
};
