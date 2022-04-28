export interface ParametrosFiltro {
    nombre: string,
    value: string;
    select : boolean;
}
export interface ParametrosBusqueda {
    mostrar: number,
    valor: string;
    parametro: string;
}
export interface ParametrosCustomSelectTemnplate {
    propiedad: string
    , titulo: string
    , bandera_mostrar: boolean
    , bandera_buscar: boolean
}
