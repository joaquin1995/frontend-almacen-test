import { MenuListado } from '@core';
import { MenuItem } from './menu.model';

export const MENU: MenuListado[] = [
  {
    "id": 7,
    "title": "CATEGORIAS",
    "routerlink": "/categoria/nuevo",
    "href": null,
    "icon": "book-content",
    "target": null,
    "hassubmenu": false,
    "is_title": false,
    "parentid": 6,
    "parent": null,
    "orden": 1,
    "total": 0
  },
  {
    "id": 4,
    "title": "Area Trabajo",
    "routerlink": null,
    "href": null,
    "icon": null,
    "target": null,
    "hassubmenu": true,
    "is_title": true,
    "parentid": 0,
    "parent": null,
    "orden": 1,
    "total": 0
  },
  {
    "id": 6,
    "title": "Formulacion Poa",
    "routerlink": null,
    "href": null,
    "icon": null,
    "target": null,
    "hassubmenu": true,
    "is_title": true,
    "parentid": 0,
    "parent": null,
    "orden": 2,
    "total": 0
  },
  {
    "id": 5,
    "title": "Seleccionar Área",
    "routerlink": "/area-trabajo/seleccionar",
    "href": null,
    "icon": "sitemap",
    "target": null,
    "hassubmenu": false,
    "is_title": false,
    "parentid": 4,
    "parent": null,
    "orden": 2,
    "total": 0
  },
  {
    "id": 8,
    "title": "F2 - ACPE",
    "routerlink": "/formulario-acpe/buscar",
    "href": null,
    "icon": "book-open",
    "target": null,
    "hassubmenu": false,
    "is_title": false,
    "parentid": 6,
    "parent": null,
    "orden": 3,
    "total": 0
  },
  {
    "id": 9,
    "title": "F3 - OPERACIONES",
    "routerlink": "/formulario-operaciones/buscar",
    "href": null,
    "icon": "book-content",
    "target": null,
    "hassubmenu": false,
    "is_title": false,
    "parentid": 6,
    "parent": null,
    "orden": 3,
    "total": 0
  },
  {
    "id": 10,
    "title": "F4 - FUNCIONAMIENTO",
    "routerlink": "/formulario-funcionamiento/buscar",
    "href": null,
    "icon": "book-open",
    "target": null,
    "hassubmenu": false,
    "is_title": false,
    "parentid": 6,
    "parent": null,
    "orden": 4,
    "total": 0
  }
];

