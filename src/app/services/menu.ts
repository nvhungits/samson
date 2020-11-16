import { Post } from './post';

export class Menu {
    constructor(name: string, active: number, parent: number, id?: number, url?: string) {}

    id: number;
    name: string;
    title?: string;
    parent: number;
    parentName: string;
    menus: Menu[];
    url: string;
    href?: string;
    image?: string;
    description?: string;
    text: string;
    active: number;
    bottom?: boolean;
    posts?: Post[];
}