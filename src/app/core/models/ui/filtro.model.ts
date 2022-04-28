import {  ParametrosFiltro } from "./paremetros-busqueda.model";

export interface Filtro {
    parametros: ParametrosFiltro[],
    top? : number[],
}
