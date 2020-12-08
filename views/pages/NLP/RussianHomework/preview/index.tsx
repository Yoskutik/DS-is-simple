import React, { CSSProperties } from 'react';
import { Button, Container, Text } from '@components';

const style: CSSProperties = {
    flex: 1,
};

const formStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    gridColumnGap: '0.8rem',
    gridRowGap: '0.4rem',
};

const Preview: React.FC = () => (
    <Container>
        <div>
            <h2>Превью</h2>
            <form autoComplete="off" style={formStyle}>
                <label>Слово:</label>
                <input type="text" name="word" />
                <label>фиговофыв:</label>
                <input type="text" name="word" />
                <Button>Отправить</Button>
            </form>
        </div>
        <div style={style}>
            <h2>Описание</h2>
            <Text>
                Задача организации, в особенности же укрепление и развитие структуры требуют определения и уточнения
                дальнейших направлений развития. Равным образом сложившаяся структура организации влечет за собой
                процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.
                Разнообразный и богатый опыт реализация намеченных плановых заданий позволяет оценить значение
                существенных финансовых и административных условий.
            </Text>
        </div>
    </Container>
);

export default Preview;
