export default interface IItem {
    title: string,
    icon: string,
    list?: Record<string, string>,
    href?: string,
    toBottom?: boolean,
}
