export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    edad: number | null;
    creado_en?: string;
}

export interface UsuarioRegistro {
    nombre: string;
    email: string;
    password: string;
    edad: number | null;
}

export interface UsuarioLogin {
    email: string;
    password: string;
}

export interface SesionUsuario {
    token: string;
    usuario: Usuario;
}