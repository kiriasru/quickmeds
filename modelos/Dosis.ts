export type EstadoDosis = "tomado" | "omitido" | "pendiente";

export type Dosis = {
    id?: number;
    id_medicamento: number;
    nombre_medicamento?: string;
    dosis: string;
    fecha: string;
    hora: string;
    fecha_hora_programada?: string;
    fecha_hora_tomada?: string | null;
    estado: EstadoDosis;
};