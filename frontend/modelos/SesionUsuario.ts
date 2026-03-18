import { Usuario } from "./Usuario";

export interface SesionUsuario {
  token: string;
  usuario: Usuario;
}
