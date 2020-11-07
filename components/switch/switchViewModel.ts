import React from 'react';

export default class SwitchViewModel {
    public onItemClick = (evt: React.MouseEvent): void => {
        const item = (evt.target as HTMLWebViewElement).closest('.page__switch_item') as HTMLDivElement;
        if (!item || item.classList.contains('active')) return;

        const switchElement = item.closest('.page__switch');
        switchElement.querySelector('.page__switch_item.active').classList.remove('active');
        item.classList.add('active');
    };
}
