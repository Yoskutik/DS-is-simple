import { observable } from 'mobx';
import React from 'react';

export default class SwitchViewModel {
    @observable
    public toggled: boolean = null;

    public onItemClick = (evt: React.MouseEvent): void => {
        const item = (evt.target as HTMLWebViewElement).closest<HTMLDivElement>('.page__switch_item');
        const switchElement = item.closest('.page__switch');

        if (window.innerWidth < 550) {
            this.toggled = !this.toggled;
            const items = Array.from(switchElement.children);
            if (!this.toggled) {
                const index = items.indexOf(item);
                items.forEach((it: HTMLDivElement) => {
                    const { style } = it;
                    style.top = `calc(-${index}rem - ${index * 9}px)`;
                });

                const lastActive = switchElement.querySelector('.page__switch_item.active');
                lastActive && lastActive.classList.remove('active');
                item.classList.add('active');
            } else {
                items.forEach((it: HTMLDivElement) => {
                    const { style } = it;
                    style.top = null;
                });
            }
            return;
        }

        if (!item || item.classList.contains('active')) return;

        switchElement.querySelector('.page__switch_item.active').classList.remove('active');
        item.classList.add('active');
    };
}
