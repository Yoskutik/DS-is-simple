export default class Storage {
    public static readonly Keys = {
        sidebarWidth: 'sidebar-width',
        sidebarToggled: 'sidebar-toggled',
        lastVisitedPage: 'last-visited-page',
    };

    public static set = (key: string, value: number | string | Record<string, unknown> | boolean): void => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    public static get = <T>(key: string): T => JSON.parse(localStorage.getItem(key));
}
