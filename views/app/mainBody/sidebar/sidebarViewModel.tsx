import { action, observable } from 'mobx';
import React from 'react';
import Storage from '@utils/storage';

export const SidebarContext = React.createContext<Partial<SidebarViewModel>>(null);

export default class SidebarViewModel {
    readonly minWidth = 200;

    readonly maxWidth = 500;

    @observable
    public dragged = false;

    @observable
    public width: number | null = null;

    @observable
    public toggled = false;

    private onMouseMove: EventListener = (evt: MouseEvent): void => {
        if (evt.clientX < this.minWidth) {
            this.width = this.minWidth;
        } else if (evt.clientX > this.maxWidth) {
            this.width = this.maxWidth;
        } else {
            this.width = evt.clientX;
        }
    };

    public onSliderMouseDown = (): void => {
        if (this.toggled) return;
        const onMouseUp = (): void => {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.dragged = false;
            Storage.set(Storage.Keys.sidebarWidth, this.width);
        };
        this.dragged = true;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    constructor() {
        this.toggled = Storage.get<boolean>(Storage.Keys.sidebarToggled) || false;
        this.width = this.toggled ? null : Storage.get<number>(Storage.Keys.sidebarWidth);

        window.addEventListener('beforeunload', () => {
            Storage.set(Storage.Keys.sidebarWidth, this.width);
            Storage.set(Storage.Keys.sidebarToggled, this.toggled);
        });
    }

    @action
    public onToggleBtnClick = (): void => {
        this.toggled = !this.toggled;
        this.width = this.toggled ? null : Storage.get<number>(Storage.Keys.sidebarWidth);
    };
}
