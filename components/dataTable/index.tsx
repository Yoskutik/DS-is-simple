import React, { useState } from 'react';
import './style.scss';

interface IDataTable {
    data: unknown[][],
}

export const DataTable: React.FC<IDataTable> = ({ data }) => {
    const [left, setLeft] = useState(null);

    return (
        <div className="page__data-table" onScroll={evt => {
            setLeft((evt.target as HTMLDivElement).scrollLeft);
        }}>
            <table className="page__data-table_indices" style={{ left }}>
                <thead>
                    <tr>
                        <th>{data[0][0]}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1).map(row => (
                        <tr key={Math.random()}>
                            <td>{row[0]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className="page__data-table_data">
                <thead>
                    <tr>
                        {data[0].map(it => (
                            <th key={Math.random()}>{it}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(1).map(row => (
                        <tr key={Math.random()}>
                            {row.map(it => (
                                <td key={Math.random()}>{it || 'None'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
