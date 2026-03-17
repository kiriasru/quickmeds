export type EstadoDosis = "tomado" | "omitido" | "pendiente";

export interface Dosis {
  id: number;
  id_medicamento: number;
  fecha_hora_programada: string;
  fecha_hora_tomada: string | null;
  estado: EstadoDosis;
}
