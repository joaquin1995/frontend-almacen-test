export interface Funcion {
    num_sec: string;
    nsec_grupo_funcion: number;
    nombre: string;
    descripcion: string;
    tipofuncion: string;
    estado: string;
}

export interface FuncionListado {
    num_sec: number;
    nsec_grupo_funcion: number;
    nombre: string;
    descripcion: string;
    tipofuncion: string;
    grupo_funcion: string;
    total: number;
}