import { action, observable } from 'mobx';
import React from 'react';
import IItem from './iItem';

export default class ItemViewModel {
    public maxHeight = null;

    @action
    public onHeaderClick = (props: IItem, evt: React.MouseEvent): void => {
        if (!props.list) return;

        const item = (evt.target as HTMLBaseElement).closest('.sidebar__item') as HTMLDivElement;
        this.maxHeight = this.maxHeight ? null : item.scrollHeight * 3;
    };
}
