import React from 'react';
import { DataTable, Text, Button, Container } from '@components';
import nounsCsvPath from '@assets/data/NLP/RussianHomework/nouns.csv';
import nounsPreviewCsv from '@assets/data/NLP/RussianHomework/nouns_preview.tsv';

const Data: React.FC = () => (
    <div>
        <DataTable data={nounsPreviewCsv} />
        <Text>
            В таблице представлена выборка из 10 элементов конечного набора данных. Для вашего удобства вы также можете
            скачать данные для слов каждой части речи по отдельности
        </Text>
        <Container>
            <Button href={nounsCsvPath} download>
                Все
            </Button>
            <Button href={nounsCsvPath} download>
                Существительные
            </Button>
            <Button href={nounsCsvPath} download>
                Прилагательные
            </Button>
        </Container>
    </div>
);

export default Data;
