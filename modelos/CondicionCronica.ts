export type CondicionCronica = {
    id?: number;
    id_usuario: number;
    nombre: string;
    descripcion?: string;
};

export type CondicionCronicaNueva = {
    id_usuario: number;
    nombre: string;
    descripcion?: string;
};