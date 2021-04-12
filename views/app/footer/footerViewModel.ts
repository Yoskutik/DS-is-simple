import { action, observable } from 'mobx';

export default class FooterViewModel {
    public showLicenceTooltip = false;

    @action
    public onLicenceMouseEnter = (): boolean => this.showLicenceTooltip = true;

    @action
    public onLicenceMouseLeave = (): boolean => this.showLicenceTooltip = false;
}
