// import { Persona } from "../banco-sangre/persona.model";

export interface Usuario {
    num_sec: number;
    nombre: string;
    cuenta: string;
    contrasena: string;
    tipo: number;
    genero: string;
    image: File;
    path_image: string;
    contenType: string;
    nsec_rol: number;
    nit: number;
}

export interface UsuarioDto {
//    persona: Persona;
   usuario: Usuario;
}

export interface UsuarioListado {
    num_sec: number;
    nombre: string;
    cuenta: string;
    contrasena: string;
    tipo: number;
    genero: string;
    nsec_rol: number;
    nombre_rol: string;
    total: number;
}
