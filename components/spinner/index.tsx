import React from 'react';
import { SpinnerIcon } from '@components/icons';
import './style.scss';

interface ISpinner {
    className?: string,
    size?: number,
}

export const Spinner: React.FC<ISpinner> = ({ className, size }) => (
    <div className={`spinner ${className || ''}`}>
        <SpinnerIcon size={size || 16} />
    </div>
);
