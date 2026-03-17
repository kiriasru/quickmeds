import React, { useContext, useEffect, useState } from "react";
import { contextQuickMeds } from "../context/ContextQuickMeds";
import { CondicionCronica, CondicionCronicaNueva } from "../modelos/CondicionCronica";
import { ContactoEmergencia, ContactoEmergenciaNuevo } from "../modelos/ContactoEmergencia";
import { Dosis, EstadoDosis } from "../modelos/Dosis";
import { Medicamento, MedicamentoNuevo } from "../modelos/Medicamento";
import { PantallaApp } from "../modelos/Navegacion";
import { Plantilla } from "../modelos/Plantilla";
import { Recordatorio, RecordatorioNuevo } from "../modelos/Recordatorio";
import { SesionUsuario, Usuario, UsuarioLogin, UsuarioRegistro } from "../modelos/Usuario";
import { pedirPermisosNotificaciones, programarRecordatorioLocal } from "../services/notifications";

const BASE_URL = "http://192.168.0.9:5050";

interface RespuestaApi<T> {
    status: number;
    message: string;
    data?: T;
    token?: string;
    user?: T;
    error?: string;
}

async function getApi<T>(endpoint: string, token?: string): Promise<RespuestaApi<T>> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    return response.json();
}

async function postApi<T>(endpoint: string, body: object, token?: string): Promise<RespuestaApi<T>> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });

    return response.json();
}

async function putApi<T>(endpoint: string, body: object, token?: string): Promise<RespuestaApi<T>> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });

    return response.json();
}

async function deleteApi<T>(endpoint: string, token?: string): Promise<RespuestaApi<T>> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    return response.json();
}

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
    const [pantallaActual, setPantallaActual] = useState<PantallaApp>("HomePublico");

    useEffect(() => {
        pedirPermisosNotificaciones();
    }, []);

    function cambiarPantalla(pantalla: PantallaApp) {
        setPantallaActual(pantalla);
        setError("");
        setMensaje("");
    }

    function obtenerToken() {
        return sesion?.token || "";
    }

    async function registrar(usuario: UsuarioRegistro) {
        try {
            setCargando(true);
            setError("");
            const response = await postApi<Usuario>("/registro", usuario);

            if (response.status === 201) {
                setMensaje(response.message || "Usuario registrado.");
                return true;
            }

            setError(response.message || "No se pudo registrar.");
            return false;
        } catch (_e) {
            setError("No se pudo conectar con el backend para registrar.");
            return false;
        } finally {
            setCargando(false);
        }
    }

    async function iniciarSesion(credenciales: UsuarioLogin) {
        try {
            setCargandoSesion(true);
            setError("");
            const response = await postApi<Usuario>("/login", credenciales);

            if (response.status !== 200 || !response.token || !response.user) {
                setError(response.message || "Credenciales invalidas.");
                return false;
            }

            const nuevaSesion: SesionUsuario = {
                token: response.token,
                usuario: response.user,
            };

            setSesion(nuevaSesion);
            setMensaje("Sesion iniciada.");
            setPantallaActual("Dashboard");
            return true;
        } catch (_e) {
            setError("No se pudo conectar con el backend para iniciar sesion.");
            return false;
        } finally {
            setCargandoSesion(false);
        }
    }

    async function cerrarSesion() {
        setSesion(null);
        setMedicamentos([]);
        setRecordatorios([]);
        setDosis([]);
        setContactos([]);
        setCondiciones([]);
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
            const response = await getApi<Medicamento[]>("/medicamentos", token);
            setMedicamentos(response.data || []);
        } catch (_e) {
            setError("No se pudieron cargar los medicamentos.");
        } finally {
            setCargando(false);
        }
    }

    async function agregarMedicamento(medicamento: MedicamentoNuevo) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const response = await postApi<Medicamento>("/medicamentos", medicamento, token);
            if (response.status === 201) {
                setMensaje("Medicamento agregado.");
                await obtenerMedicamentos();
                return true;
            }

            setError(response.message || "No se pudo agregar.");
            return false;
        } catch (_e) {
            setError("No se pudo agregar medicamento.");
            return false;
        }
    }

    async function actualizarMedicamento(
        id: number,
        medicamento: Omit<MedicamentoNuevo, "id_usuario">
    ) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const response = await putApi<Medicamento>(`/medicamentos/${id}`, medicamento, token);
            if (response.status === 200) {
                setMensaje("Medicamento actualizado.");
                await obtenerMedicamentos();
                return true;
            }

            setError(response.message || "No se pudo actualizar medicamento.");
            return false;
        } catch (_e) {
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

            const response = await deleteApi<null>(`/medicamentos/${id}`, token);
            if (response.status === 200) {
                setMensaje("Medicamento eliminado.");
                await obtenerMedicamentos();
                return true;
            }

            setError(response.message || "No se pudo eliminar.");
            return false;
        } catch (_e) {
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

            const response = await putApi<Medicamento>(`/medicamentos/${id}/activo`, { activo }, token);
            if (response.status === 200) {
                setMensaje("Estado del tratamiento actualizado.");
                await obtenerMedicamentos();
                return true;
            }

            setError(response.message || "No se pudo cambiar estado.");
            return false;
        } catch (_e) {
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

            const response = await getApi<Recordatorio[]>("/recordatorios", token);
            setRecordatorios(response.data || []);
        } catch (_e) {
            setError("No se pudieron cargar recordatorios.");
        }
    }

    async function agregarRecordatorio(recordatorio: RecordatorioNuevo) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const response = await postApi<Recordatorio>("/recordatorios", recordatorio, token);
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
        } catch (_e) {
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

            const response = await deleteApi<null>(`/recordatorios/${id}`, token);
            if (response.status === 200) {
                setMensaje("Recordatorio eliminado.");
                await obtenerRecordatorios();
                return true;
            }

            setError(response.message || "No se pudo eliminar recordatorio.");
            return false;
        } catch (_e) {
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

            const response = await getApi<Dosis[]>("/dosis", token);
            setDosis(response.data || []);
        } catch (_e) {
            setError("No se pudieron cargar dosis.");
        }
    }

    async function registrarDosis(
        idMedicamento: number,
        estado: EstadoDosis,
        fechaHoraProgramada: string
    ) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const payload = {
                id_medicamento: idMedicamento,
                fecha_hora_programada: fechaHoraProgramada,
                fecha_hora_tomada: estado === "tomado" ? new Date().toISOString() : null,
                estado,
            };

            const response = await postApi<Dosis>("/dosis", payload, token);
            if (response.status === 201) {
                await obtenerDosis();
                return true;
            }

            setError(response.message || "No se pudo registrar dosis.");
            return false;
        } catch (_e) {
            setError("No se pudo registrar dosis.");
            return false;
        }
    }

    async function actualizarEstadoDosis(idDosis: number, estado: EstadoDosis) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const payload = {
                estado,
                fecha_hora_tomada: estado === "tomado" ? new Date().toISOString() : null,
            };

            const response = await putApi<Dosis>(`/dosis/${idDosis}/estado`, payload, token);
            if (response.status === 200) {
                setMensaje("Estado de dosis actualizado.");
                await obtenerDosis();
                return true;
            }

            setError(response.message || "No se pudo actualizar dosis.");
            return false;
        } catch (_e) {
            setError("No se pudo actualizar estado de dosis.");
            return false;
        }
    }

    async function obtenerPerfil() {
        try {
            const token = obtenerToken();
            if (!token || !sesion?.usuario?.id) {
                return null;
            }

            const response = await getApi<Usuario>(`/usuarios/${sesion.usuario.id}`, token);
            return response.data || null;
        } catch (_e) {
            setError("No se pudo cargar perfil.");
            return null;
        }
    }

    async function obtenerContactos() {
        try {
            const token = obtenerToken();
            if (!token || !sesion?.usuario?.id) {
                return;
            }

            const response = await getApi<ContactoEmergencia[]>("/contactos-emergencia", token);
            const lista = response.data || [];
            setContactos(lista.filter((item) => item.id_usuario === sesion.usuario.id));
        } catch (_e) {
            setError("No se pudieron cargar contactos.");
        }
    }

    async function agregarContacto(contacto: ContactoEmergenciaNuevo) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const response = await postApi<ContactoEmergencia>("/contactos-emergencia", contacto, token);
            if (response.status === 201) {
                setMensaje("Contacto agregado.");
                await obtenerContactos();
                return true;
            }

            setError(response.message || "No se pudo agregar contacto.");
            return false;
        } catch (_e) {
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

            const response = await deleteApi<null>(`/contactos-emergencia/${id}`, token);
            if (response.status === 200) {
                setMensaje("Contacto eliminado.");
                await obtenerContactos();
                return true;
            }

            setError(response.message || "No se pudo eliminar contacto.");
            return false;
        } catch (_e) {
            setError("No se pudo eliminar contacto.");
            return false;
        }
    }

    async function obtenerCondiciones() {
        try {
            const token = obtenerToken();
            if (!token || !sesion?.usuario?.id) {
                return;
            }

            const response = await getApi<CondicionCronica[]>("/condiciones-cronicas", token);
            const lista = response.data || [];
            setCondiciones(lista.filter((item) => item.id_usuario === sesion.usuario.id));
        } catch (_e) {
            setError("No se pudieron cargar condiciones.");
        }
    }

    async function agregarCondicion(condicion: CondicionCronicaNueva) {
        try {
            const token = obtenerToken();
            if (!token) {
                return false;
            }

            const response = await postApi<CondicionCronica>("/condiciones-cronicas", condicion, token);
            if (response.status === 201) {
                setMensaje("Condicion cronica agregada.");
                await obtenerCondiciones();
                return true;
            }

            setError(response.message || "No se pudo agregar condicion.");
            return false;
        } catch (_e) {
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

            const response = await deleteApi<null>(`/condiciones-cronicas/${id}`, token);
            if (response.status === 200) {
                setMensaje("Condicion cronica eliminada.");
                await obtenerCondiciones();
                return true;
            }

            setError(response.message || "No se pudo eliminar condicion.");
            return false;
        } catch (_e) {
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
                actualizarEstadoDosis,
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