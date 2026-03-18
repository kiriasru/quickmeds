import { createContext } from "react";
import { CondicionCronica } from "../modelos/CondicionCronica";
import { CondicionCronicaNueva } from "../modelos/CondicionCronicaNueva";
import { ContactoEmergencia } from "../modelos/ContactoEmergencia";
import { ContactoEmergenciaNuevo } from "../modelos/ContactoEmergenciaNuevo";
import { Dosis } from "../modelos/Dosis";
import { Medicamento } from "../modelos/Medicamento";
import { MedicamentoActualizar } from "../modelos/MedicamentoActualizar";
import { MedicamentoNuevo } from "../modelos/MedicamentoNuevo";
import { Recordatorio } from "../modelos/Recordatorio";
import { RecordatorioNuevo } from "../modelos/RecordatorioNuevo";
import { SesionUsuario } from "../modelos/SesionUsuario";
import { Usuario } from "../modelos/Usuario";
import { UsuarioLogin } from "../modelos/UsuarioLogin";
import { UsuarioRegistro } from "../modelos/UsuarioRegistro";

export const contextQuickMeds = createContext({
  cargandoSesion: false,
  cargando: false,
  mensaje: "",
  error: "",
  sesion: null as SesionUsuario | null,
  medicamentos: [] as Medicamento[],
  recordatorios: [] as Recordatorio[],
  dosis: [] as Dosis[],
  contactos: [] as ContactoEmergencia[],
  condiciones: [] as CondicionCronica[],
  pantallaActual: "HomePublico",

  cambiarPantalla: (pantalla: string) => {},
  registrar: async (usuario: UsuarioRegistro) => false,
  iniciarSesion: async (credenciales: UsuarioLogin) => false,
  cerrarSesion: async () => {},

  obtenerMedicamentos: async () => {},
  agregarMedicamento: async (medicamento: MedicamentoNuevo) => false,
  actualizarMedicamento: async (id: number, medicamento: MedicamentoActualizar) => false,
  eliminarMedicamento: async (id: number) => false,
  cambiarEstadoMedicamento: async (id: number, activo: boolean) => false,

  obtenerRecordatorios: async () => {},
  agregarRecordatorio: async (recordatorio: RecordatorioNuevo) => false,
  eliminarRecordatorio: async (id: number) => false,

  obtenerDosis: async () => {},
  registrarDosis: async (idMedicamento: number, estado: string, fechaHoraProgramada: string) => false,

  obtenerPerfil: async () => null as Usuario | null,
  obtenerContactos: async () => {},
  agregarContacto: async (contacto: ContactoEmergenciaNuevo) => false,
  eliminarContacto: async (id: number) => false,

  obtenerCondiciones: async () => {},
  agregarCondicion: async (condicion: CondicionCronicaNueva) => false,
  eliminarCondicion: async (id: number) => false,
});