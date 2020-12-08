import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
    Page, Title, Switch, SwitchItem, LoadingSuspense,
} from '@components';

const Preview = React.lazy(() => import('./preview'));
const Data = React.lazy(async () => import('./data'));

const NlpRussianHomework: React.FC = observer(() => {
    const [Content, setContent] = useState<React.FC>(Preview);

    return (
        <Page>
            <Title>Домашка по русскому</Title>
            <Switch>
                <SwitchItem onClick={() => setContent(Preview)} value="Превью" active />
                <SwitchItem onClick={() => setContent(Data)} value="Код" />
                <SwitchItem onClick={() => setContent(React.Fragment)} value="Данные" />
            </Switch>
            <LoadingSuspense>
                <Content />
            </LoadingSuspense>
        </Page>
    );
});

export default NlpRussianHomework;
