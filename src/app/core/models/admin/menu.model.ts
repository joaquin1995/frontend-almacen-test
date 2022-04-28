
export interface Menu {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
}
export class MenuListado {
  constructor(public id: number,
    public title: string,
    public routerlink: string,
    public href: string,
    public icon: string,
    public target: string,
    public hassubmenu: boolean,
    public is_title: boolean,
    public parentid: number,
    public parent: string,
    public orden: number,
    public total: number) { }
}

export class PostMenu {
  objMenu: Menu;
  roles: number[];
  nsec_grupo_funcion: string;
  funcion: string;
  nsec_funcion: number;


}
