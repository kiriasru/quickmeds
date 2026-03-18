import React, { useContext, useEffect, useState } from "react";
import { contextQuickMeds } from "../context/ContextQuickMeds";
import { CondicionCronica } from "../modelos/CondicionCronica";
import { CondicionCronicaNueva } from "../modelos/CondicionCronicaNueva";
import { ContactoEmergencia } from "../modelos/ContactoEmergencia";
import { ContactoEmergenciaNuevo } from "../modelos/ContactoEmergenciaNuevo";
import { Dosis } from "../modelos/Dosis";
import { Medicamento } from "../modelos/Medicamento";
import { MedicamentoActualizar } from "../modelos/MedicamentoActualizar";
import { MedicamentoNuevo } from "../modelos/MedicamentoNuevo";
import { Plantilla } from "../modelos/Plantilla";
import { Recordatorio } from "../modelos/Recordatorio";
import { RecordatorioNuevo } from "../modelos/RecordatorioNuevo";
import { SesionUsuario } from "../modelos/SesionUsuario";
import { Usuario } from "../modelos/Usuario";
import { UsuarioLogin } from "../modelos/UsuarioLogin";
import { UsuarioRegistro } from "../modelos/UsuarioRegistro";
import {
  borrarCondicion,
  borrarContacto,
  borrarMedicamento,
  borrarRecordatorio,
  cambiarActivoMedicamento,
  editarMedicamento,
  guardarCondicion,
  guardarContacto,
  guardarDosis,
  guardarMedicamento,
  guardarRecordatorio,
  iniciarSesionUsuario,
  registrarUsuario,
  traerCondiciones,
  traerContactos,
  traerDosis,
  traerMedicamentos,
  traerPerfil,
  traerRecordatorios,
} from "../services/quickMedsAcciones";
import { pedirPermisosNotificaciones, programarRecordatorioLocal } from "../services/notifications";

export default function ProviderQuickMeds({ children }: Plantilla) {
  const [cargandoSesion, setCargandoSesion] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [sesion, setSesion] = useState<SesionUsuario | null>(null);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [dosis, setDosis] = useState<Dosis[]>([]);
  const [contactos, setContactos] = useState<ContactoEmergencia[]>([]);
  const [condiciones, setCondiciones] = useState<CondicionCronica[]>([]);
  const [pantallaActual, setPantallaActual] = useState("HomePublico");

  useEffect(() => {
    pedirPermisosNotificaciones();
  }, []);

  function cambiarPantalla(pantalla: string) {
    setPantallaActual(pantalla);
    setError("");
    setMensaje("");
  }

  function obtenerToken() {
    if (sesion) {
      return sesion.token;
    }

    return "";
  }

  function obtenerIdUsuario() {
    if (sesion && sesion.usuario) {
      return sesion.usuario.id;
    }

    return 0;
  }

  function limpiarDatos() {
    setMedicamentos([]);
    setRecordatorios([]);
    setDosis([]);
    setContactos([]);
    setCondiciones([]);
  }

  async function registrar(usuario: UsuarioRegistro) {
    setCargando(true);
    setError("");

    try {
      const response = await registrarUsuario(usuario);

      if (response.status === 201) {
        setMensaje(response.message || "Usuario registrado.");
        setCargando(false);
        return true;
      }

      setError(response.message || "No se pudo registrar.");
      setCargando(false);
      return false;
    } catch (error) {
      setError("No se pudo conectar con el backend para registrar.");
      setCargando(false);
      return false;
    }
  }

  async function iniciarSesion(credenciales: UsuarioLogin) {
    setCargandoSesion(true);
    setError("");

    try {
      const response = await iniciarSesionUsuario(credenciales);

      if (response.status === 200 && response.token && response.user) {
        const sesionNueva: SesionUsuario = {
          token: response.token,
          usuario: response.user as Usuario,
        };

        setSesion(sesionNueva);
        setMensaje("Sesion iniciada.");
        setPantallaActual("Dashboard");
        setCargandoSesion(false);
        return true;
      }

      setError(response.message || "Credenciales invalidas.");
      setCargandoSesion(false);
      return false;
    } catch (error) {
      setError("No se pudo conectar con el backend para iniciar sesion.");
      setCargandoSesion(false);
      return false;
    }
  }

  async function cerrarSesion() {
    setSesion(null);
    limpiarDatos();
    setPantallaActual("HomePublico");
    setMensaje("Sesion cerrada.");
  }

  async function obtenerMedicamentos() {
    try {
      const token = obtenerToken();
      if (!token) {
        return;
      }

      setCargando(true);
      const response = await traerMedicamentos(token);
      setMedicamentos((response.data as Medicamento[]) || []);
    } catch (error) {
      setError("No se pudieron cargar los medicamentos.");
    }

    setCargando(false);
  }

  async function agregarMedicamento(medicamento: MedicamentoNuevo) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await guardarMedicamento(token, medicamento);
      if (response.status === 201) {
        setMensaje("Medicamento agregado.");
        await obtenerMedicamentos();
        return true;
      }

      setError(response.message || "No se pudo agregar.");
      return false;
    } catch (error) {
      setError("No se pudo agregar medicamento.");
      return false;
    }
  }

  async function actualizarMedicamento(id: number, medicamento: MedicamentoActualizar) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await editarMedicamento(token, id, medicamento);
      if (response.status === 200) {
        setMensaje("Medicamento actualizado.");
        await obtenerMedicamentos();
        return true;
      }

      setError(response.message || "No se pudo actualizar medicamento.");
      return false;
    } catch (error) {
      setError("No se pudo actualizar medicamento.");
      return false;
    }
  }

  async function eliminarMedicamento(id: number) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await borrarMedicamento(token, id);
      if (response.status === 200) {
        setMensaje("Medicamento eliminado.");
        await obtenerMedicamentos();
        return true;
      }

      setError(response.message || "No se pudo eliminar.");
      return false;
    } catch (error) {
      setError("No se pudo eliminar medicamento.");
      return false;
    }
  }

  async function cambiarEstadoMedicamento(id: number, activo: boolean) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await cambiarActivoMedicamento(token, id, activo);
      if (response.status === 200) {
        setMensaje("Estado del tratamiento actualizado.");
        await obtenerMedicamentos();
        return true;
      }

      setError(response.message || "No se pudo cambiar estado.");
      return false;
    } catch (error) {
      setError("No se pudo cambiar estado del medicamento.");
      return false;
    }
  }

  async function obtenerRecordatorios() {
    try {
      const token = obtenerToken();
      if (!token) {
        return;
      }

      const response = await traerRecordatorios(token);
      setRecordatorios((response.data as Recordatorio[]) || []);
    } catch (error) {
      setError("No se pudieron cargar recordatorios.");
    }
  }

  async function agregarRecordatorio(recordatorio: RecordatorioNuevo) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await guardarRecordatorio(token, recordatorio);
      if (response.status === 201) {
        setMensaje("Recordatorio agregado.");
        await programarRecordatorioLocal(
          recordatorio.hora_recordatorio,
          "Hora de tomar tu medicamento."
        );
        await obtenerRecordatorios();
        return true;
      }

      setError(response.message || "No se pudo agregar recordatorio.");
      return false;
    } catch (error) {
      setError("No se pudo agregar recordatorio.");
      return false;
    }
  }

  async function eliminarRecordatorio(id: number) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await borrarRecordatorio(token, id);
      if (response.status === 200) {
        setMensaje("Recordatorio eliminado.");
        await obtenerRecordatorios();
        return true;
      }

      setError(response.message || "No se pudo eliminar recordatorio.");
      return false;
    } catch (error) {
      setError("No se pudo eliminar recordatorio.");
      return false;
    }
  }

  async function obtenerDosis() {
    try {
      const token = obtenerToken();
      if (!token) {
        return;
      }

      const response = await traerDosis(token);
      setDosis((response.data as Dosis[]) || []);
    } catch (error) {
      setError("No se pudieron cargar dosis.");
    }
  }

  async function registrarDosis(idMedicamento: number, estado: string, fechaHoraProgramada: string) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await guardarDosis(token, idMedicamento, estado, fechaHoraProgramada);
      if (response.status === 201) {
        await obtenerDosis();
        return true;
      }

      setError(response.message || "No se pudo registrar dosis.");
      return false;
    } catch (error) {
      setError("No se pudo registrar dosis.");
      return false;
    }
  }

  async function obtenerPerfil() {
    try {
      const token = obtenerToken();
      const idUsuario = obtenerIdUsuario();
      if (!token || !idUsuario) {
        return null;
      }

      const response = await traerPerfil(token, idUsuario);
      return (response.data as Usuario) || null;
    } catch (error) {
      setError("No se pudo cargar perfil.");
      return null;
    }
  }

  async function obtenerContactos() {
    try {
      const token = obtenerToken();
      const idUsuario = obtenerIdUsuario();
      if (!token || !idUsuario) {
        return;
      }

      const response = await traerContactos(token);
      const lista = (response.data as ContactoEmergencia[]) || [];
      setContactos(lista.filter((item) => item.id_usuario === idUsuario));
    } catch (error) {
      setError("No se pudieron cargar contactos.");
    }
  }

  async function agregarContacto(contacto: ContactoEmergenciaNuevo) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await guardarContacto(token, contacto);
      if (response.status === 201) {
        setMensaje("Contacto agregado.");
        await obtenerContactos();
        return true;
      }

      setError(response.message || "No se pudo agregar contacto.");
      return false;
    } catch (error) {
      setError("No se pudo agregar contacto.");
      return false;
    }
  }

  async function eliminarContacto(id: number) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await borrarContacto(token, id);
      if (response.status === 200) {
        setMensaje("Contacto eliminado.");
        await obtenerContactos();
        return true;
      }

      setError(response.message || "No se pudo eliminar contacto.");
      return false;
    } catch (error) {
      setError("No se pudo eliminar contacto.");
      return false;
    }
  }

  async function obtenerCondiciones() {
    try {
      const token = obtenerToken();
      const idUsuario = obtenerIdUsuario();
      if (!token || !idUsuario) {
        return;
      }

      const response = await traerCondiciones(token);
      const lista = (response.data as CondicionCronica[]) || [];
      setCondiciones(lista.filter((item) => item.id_usuario === idUsuario));
    } catch (error) {
      setError("No se pudieron cargar condiciones.");
    }
  }

  async function agregarCondicion(condicion: CondicionCronicaNueva) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await guardarCondicion(token, condicion);
      if (response.status === 201) {
        setMensaje("Condicion cronica agregada.");
        await obtenerCondiciones();
        return true;
      }

      setError(response.message || "No se pudo agregar condicion.");
      return false;
    } catch (error) {
      setError("No se pudo agregar condicion.");
      return false;
    }
  }

  async function eliminarCondicion(id: number) {
    try {
      const token = obtenerToken();
      if (!token) {
        return false;
      }

      const response = await borrarCondicion(token, id);
      if (response.status === 200) {
        setMensaje("Condicion cronica eliminada.");
        await obtenerCondiciones();
        return true;
      }

      setError(response.message || "No se pudo eliminar condicion.");
      return false;
    } catch (error) {
      setError("No se pudo eliminar condicion.");
      return false;
    }
  }

  return (
    <contextQuickMeds.Provider
      value={{
        cargandoSesion,
        cargando,
        mensaje,
        error,
        sesion,
        medicamentos,
        recordatorios,
        dosis,
        contactos,
        condiciones,
        pantallaActual,
        cambiarPantalla,
        registrar,
        iniciarSesion,
        cerrarSesion,
        obtenerMedicamentos,
        agregarMedicamento,
        actualizarMedicamento,
        eliminarMedicamento,
        cambiarEstadoMedicamento,
        obtenerRecordatorios,
        agregarRecordatorio,
        eliminarRecordatorio,
        obtenerDosis,
        registrarDosis,
        obtenerPerfil,
        obtenerContactos,
        agregarContacto,
        eliminarContacto,
        obtenerCondiciones,
        agregarCondicion,
        eliminarCondicion,
      }}
    >
      {children}
    </contextQuickMeds.Provider>
  );
}

export const useContextQuickMeds = () => {
  return useContext(contextQuickMeds);
};