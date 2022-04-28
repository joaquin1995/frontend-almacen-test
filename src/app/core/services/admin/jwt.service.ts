import { Injectable } from '@angular/core';
import { KeyStorage, StorageUtils, User } from '../..';


@Injectable({ providedIn: 'root' })
export class JwtService {

  constructor(private storageUtils: StorageUtils) {

  }


  getToken(): string {
    return this.storageUtils.get(KeyStorage.JWT_TOKEN);
  }

  saveToken(token: string) {
    this.storageUtils.set(KeyStorage.JWT_TOKEN, token);
  }
  saveDatosUsuario(usuario: User) {
    this.storageUtils.set(KeyStorage.USUARIO, usuario.usuario);
    this.storageUtils.set(KeyStorage.NOMBRE_USUARIO, usuario.nombre_usuario);
    this.storageUtils.set(KeyStorage.ROL, usuario.rol);
    this.storageUtils.set(KeyStorage.GENERO, usuario.genero || 'M');
  }
  getDatosUsuario(): User {

    return {
      usuario: this.storageUtils.get(KeyStorage.USUARIO),
      nombre_usuario: this.storageUtils.get(KeyStorage.NOMBRE_USUARIO),
      rol: this.storageUtils.get(KeyStorage.ROL),
      genero: this.storageUtils.get(KeyStorage.GENERO),
    } as User;

  }

  destroyToken() {
    this.storageUtils.deleteAll()
  }

}
