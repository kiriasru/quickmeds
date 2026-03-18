export type ContactoEmergencia = {
    id?: number;
    id_usuario: number;
    nombre: string;
    telefono: string;
    parentesco?: string;
};

export type ContactoEmergenciaNuevo = {
    id_usuario: number;
    nombre: string;
    telefono: string;
    parentesco?: string;
};