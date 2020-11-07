import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Page, Title, Switch, SwitchItem } from '@components';

const switchItems = [
    'Превью',
    'Код',
    'Данные',
    'Ссылки',
    'Ссылки',
];

const NlpRussianHomework: React.FC = observer(() => {
    const [content, setContent] = useState(null);

    return (
        <Page>
            <Title>Домашка по русскому</Title>
            <Switch>
                {switchItems.map((it, i) => (
                    <SwitchItem onClick={() => setContent(it)} value={it} active={i === 0} key={Math.random()} />
                ))}
            </Switch>
            {content}
        </Page>
    );
});

export default NlpRussianHomework;
