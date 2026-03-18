export interface Recordatorio {
    id: number;
    id_medicamento: number;
    hora_recordatorio: string;
    activo: boolean;
}

export interface RecordatorioNuevo {
    id_medicamento: number;
    hora_recordatorio: string;
    activo: boolean;
}