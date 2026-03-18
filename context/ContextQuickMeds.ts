import { createContext } from "react";
import { CondicionCronica, CondicionCronicaNueva } from "../modelos/CondicionCronica";
import { ContactoEmergencia, ContactoEmergenciaNuevo } from "../modelos/ContactoEmergencia";
import { Dosis, EstadoDosis } from "../modelos/Dosis";
import { Medicamento, MedicamentoNuevo } from "../modelos/Medicamento";
import { PantallaApp } from "../modelos/Navegacion";
import { Recordatorio, RecordatorioNuevo } from "../modelos/Recordatorio";
import { SesionUsuario, Usuario, UsuarioLogin, UsuarioRegistro } from "../modelos/Usuario";

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
    pantallaActual: "HomePublico" as PantallaApp,

    cambiarPantalla: (pantalla: PantallaApp) => {},
    registrar: async (usuario: UsuarioRegistro) => false,
    iniciarSesion: async (credenciales: UsuarioLogin) => false,
    cerrarSesion: async () => {},

    obtenerMedicamentos: async () => {},
    agregarMedicamento: async (medicamento: MedicamentoNuevo) => false,
    actualizarMedicamento: async (id: number, medicamento: Omit<MedicamentoNuevo, "id_usuario">) => false,
    eliminarMedicamento: async (id: number) => false,
    cambiarEstadoMedicamento: async (id: number, activo: boolean) => false,

    obtenerRecordatorios: async () => {},
    agregarRecordatorio: async (recordatorio: RecordatorioNuevo) => false,
    eliminarRecordatorio: async (id: number) => false,

    obtenerDosis: async () => {},
    registrarDosis: async (idMedicamento: number, estado: EstadoDosis, fechaHoraProgramada: string) => false,
    actualizarEstadoDosis: async (idDosis: number, estado: EstadoDosis) => false,

    obtenerPerfil: async () => null as Usuario | null,
    obtenerContactos: async () => {},
    agregarContacto: async (contacto: ContactoEmergenciaNuevo) => false,
    eliminarContacto: async (id: number) => false,

    obtenerCondiciones: async () => {},
    agregarCondicion: async (condicion: CondicionCronicaNueva) => false,
    eliminarCondicion: async (id: number) => false,
});