import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';
import { MenuListado } from '@core';

@Injectable({
  providedIn: 'root'
})
export class MenuAppService {
  parametros: string;
  urlPath = '/api/menu';
  constructor(private apiService: ApiService) { }


  traerMenu() {
    return this.apiService.get(`${this.urlPath}/traer_menu_por_usuario`)
      .pipe(map(data => data));
  }

  obtenerMenuApp(arrayMenu: Array<MenuListado>): Array<MenuItem> {
    console.log('obtenerMenuApp', arrayMenu);
    let menuItemsAux: Array<MenuItem> = [];
    const menuFormat = this.formatArray(arrayMenu);
    const menuNested = this.getNestedChildren(menuFormat, 0);
    const menuTitle = menuNested.filter(item => item.isTitle);
    console.log('menuTitle', menuTitle);
    menuTitle?.map(item => {
      const menuTitle = {
        id: item.id,
        label: item.label,
        isTitle: true
      }
      const subMenu = item.subItems;
      menuItemsAux = [...menuItemsAux, menuTitle];
      menuItemsAux = [...menuItemsAux, ...subMenu];


    });
    return menuItemsAux;
  }

  formatArray(arrayMenu: Array<MenuListado>): Array<MenuItem> {
    const menu: Array<MenuItem> = [];
    arrayMenu?.map((datos) => {
      const auxMenu: MenuItem = {
        id: datos.id
        , label: datos.title
        , icon: datos.icon
        , parentId: datos.parentid
        , link: datos.routerlink
        , isTitle: datos.is_title
      };
      menu.push(auxMenu);
    });
    return menu;
  }

  getNestedChildren(arr, parentId): MenuItem[] {
    const out = [];
    for (const i in arr) {
      if (arr[i].parentId === parentId) {
        const children = this.getNestedChildren(arr, arr[i].id);
        if (children.length) {
          arr[i].subItems = children;
        } else {
          arr[i].subItems = [];
        }
        out.push(arr[i]);
      }
    }
    return out;
  }

}
