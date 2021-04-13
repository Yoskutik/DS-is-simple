import { action, observable } from 'mobx';
import React from 'react';
import Storage from '../../../../src/utils/LocalStorage';

export const SidebarContext = React.createContext<Partial<SidebarViewModel>>(null);

export default class SidebarViewModel {
    readonly minWidth = 200;

    readonly maxWidth = Math.min(500, window.innerWidth / 3);

    private isMobile: boolean = null;

    public dragged = false;

    public width: number = null;

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
        if (this.toggled || this.isMobile) return;
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

        if (window.innerWidth < 550) {
            this.isMobile = true;
            this.width = this.toggled ? null : window.innerWidth;
        } else {
            this.width = this.toggled ? null : Storage.get<number>(Storage.Keys.sidebarWidth);
            this.width = this.width > this.maxWidth ? this.maxWidth : this.width;
        }

        window.addEventListener('beforeunload', () => {
            Storage.set(Storage.Keys.sidebarWidth, this.width);
            Storage.set(Storage.Keys.sidebarToggled, this.toggled);
        });
    }

    @action
    public onToggleBtnClick = (): void => {
        this.toggled = !this.toggled;
        if (this.isMobile) {
            this.width = this.toggled ? null : window.innerWidth;
        } else {
            this.width = this.toggled ? null : Storage.get<number>(Storage.Keys.sidebarWidth);
        }
    };

    @action
    public onLinkClick = (): void => {
        if (this.isMobile && !this.toggled) {
            this.onToggleBtnClick();
        }
    };
}
