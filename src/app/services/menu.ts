export class Menu {
    constructor(name: string, active: number, parent: number, id?: number) {}

    id: number;
    name: string;
    parent: number;
    parentName: string;
    menus: Menu[];
    active: number;
}