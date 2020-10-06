export class Menu {
    constructor(name: string, active: number, parent: number, id?: number, url?: string) {}

    id: number;
    name: string;
    parent: number;
    parentName: string;
    menus: Menu[];
    url: string;
    text: string;
    active: number;
}