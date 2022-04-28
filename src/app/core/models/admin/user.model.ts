// export interface User {
//     nombre_usuario: string;
//     nsec_area: string;
//     nombre_area: string;
//     usuario: string;

//     nsec_rol: string;
//     rol: string;
//     imagen: string;
//     email: string;
//     genero: string;
//   }

export interface UsuarioLogin {
    token: string;
    usuario: User;
}

export interface User {
  usuario:        string;
  nombre_usuario: string;
  rol:            string;
  imagen:         string;
  genero:         string;
}
