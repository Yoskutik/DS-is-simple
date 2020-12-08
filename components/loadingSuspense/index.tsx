import React from 'react';
import { Spinner } from '@components';

export const LoadingSuspense: React.FC = ({ children }) => (
    <React.Suspense fallback={<Spinner className="app__main_spinner" size={96} />}>
        {children}
    </React.Suspense>
);
