import { createContext } from "react";
import {
    CondicionCronica,
    CondicionCronicaNueva,
} from "../modelos/CondicionCronica";
import {
    ContactoEmergencia,
    ContactoEmergenciaNuevo,
} from "../modelos/ContactoEmergencia";
import { Dosis, EstadoDosis } from "../modelos/Dosis";
import { Medicamento, MedicamentoNuevo } from "../modelos/Medicamento";
import { PantallaApp } from "../modelos/Navegacion";
import { Recordatorio, RecordatorioNuevo } from "../modelos/Recordatorio";
import {
    SesionUsuario,
    Usuario,
    UsuarioLogin,
    UsuarioRegistro,
} from "../modelos/Usuario";

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

    cambiarPantalla: (_pantalla: PantallaApp) => {},
    registrar: async (_usuario: UsuarioRegistro) => false,
    iniciarSesion: async (_credenciales: UsuarioLogin) => false,
    cerrarSesion: async () => {},

    obtenerMedicamentos: async () => {},
    agregarMedicamento: async (_medicamento: MedicamentoNuevo) => false,
    actualizarMedicamento: async (
        _id: number,
        _medicamento: Omit<MedicamentoNuevo, "id_usuario">,
    ) => false,
    eliminarMedicamento: async (_id: number) => false,
    cambiarEstadoMedicamento: async (_id: number, _activo: boolean) => false,

    obtenerRecordatorios: async () => {},
    agregarRecordatorio: async (_recordatorio: RecordatorioNuevo) => false,
    eliminarRecordatorio: async (_id: number) => false,

    obtenerDosis: async () => {},
    registrarDosis: async (
        _idMedicamento: number,
        _estado: EstadoDosis,
        _fechaHoraProgramada: string,
    ) => false,
    actualizarEstadoDosis: async (_idDosis: number, _estado: EstadoDosis) =>
        false,

    obtenerPerfil: async () => null as Usuario | null,
    obtenerContactos: async () => {},
    agregarContacto: async (_contacto: ContactoEmergenciaNuevo) => false,
    eliminarContacto: async (_id: number) => false,

    obtenerCondiciones: async () => {},
    agregarCondicion: async (_condicion: CondicionCronicaNueva) => false,
    eliminarCondicion: async (_id: number) => false,
});