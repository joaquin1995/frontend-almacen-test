import { ParametrosBusqueda } from "../models";

export const TOP_BUSQUEDA = [10, 20, 30, 40, 50];
export const Busqueda: ParametrosBusqueda = {
    mostrar: 5,
    valor: '',
    parametro: 'nombre'
};
export type TipoAlerta = 'question' | 'success' | 'info' | 'error' | 'warning';