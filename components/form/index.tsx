import React from 'react';
import { Button } from '@components';

export const Form: React.FC = ({ children }) => {
    console.log(children[0]);
    return (
        <form autoComplete="off">
            <label>Слово:</label>
            <input type="text" name="word" />
            <label>фиговофыв:</label>
            <input type="text" name="word" />
            <Button>Отправить</Button>
        </form>
    );
};
