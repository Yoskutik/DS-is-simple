import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Page, Title, Switch, SwitchItem } from '@components';

const NlpRussianHomework: React.FC = observer(() => {
    const [content, setContent] = useState(null);

    return (
        <Page>
            <Title>Домашка по русскому</Title>
            <Switch>
                <SwitchItem active onClick={() => setContent('Превью')} value="Превью" />
                <SwitchItem onClick={() => setContent('Код')} value="Код" />
                <SwitchItem onClick={() => setContent('Данные')} value="Данные" />
                <SwitchItem onClick={() => setContent('Ссылки')} value="Ссылки" />
            </Switch>
            {content}
        </Page>
    );
});

export default NlpRussianHomework;
