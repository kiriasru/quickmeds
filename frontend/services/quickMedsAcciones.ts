import { CondicionCronicaNueva } from "../modelos/CondicionCronicaNueva";
import { ContactoEmergenciaNuevo } from "../modelos/ContactoEmergenciaNuevo";
import { MedicamentoActualizar } from "../modelos/MedicamentoActualizar";
import { MedicamentoNuevo } from "../modelos/MedicamentoNuevo";
import { RecordatorioNuevo } from "../modelos/RecordatorioNuevo";
import { UsuarioLogin } from "../modelos/UsuarioLogin";
import { UsuarioRegistro } from "../modelos/UsuarioRegistro";
import { deleteApi, getApi, postApi, putApi } from "./apiQuickMeds";

export async function registrarUsuario(usuario: UsuarioRegistro) {
  return postApi("/registro", usuario);
}

export async function iniciarSesionUsuario(credenciales: UsuarioLogin) {
  return postApi("/login", credenciales);
}

export async function traerMedicamentos(token: string) {
  return getApi("/medicamentos", token);
}

export async function guardarMedicamento(token: string, medicamento: MedicamentoNuevo) {
  return postApi("/medicamentos", medicamento, token);
}

export async function editarMedicamento(token: string, id: number, medicamento: MedicamentoActualizar) {
  return putApi(`/medicamentos/${id}`, medicamento, token);
}

export async function borrarMedicamento(token: string, id: number) {
  return deleteApi(`/medicamentos/${id}`, token);
}

export async function cambiarActivoMedicamento(token: string, id: number, activo: boolean) {
  return putApi(`/medicamentos/${id}/activo`, { activo }, token);
}

export async function traerRecordatorios(token: string) {
  return getApi("/recordatorios", token);
}

export async function guardarRecordatorio(token: string, recordatorio: RecordatorioNuevo) {
  return postApi("/recordatorios", recordatorio, token);
}

export async function borrarRecordatorio(token: string, id: number) {
  return deleteApi(`/recordatorios/${id}`, token);
}

export async function traerDosis(token: string) {
  return getApi("/dosis", token);
}

export async function guardarDosis(
  token: string,
  idMedicamento: number,
  estado: string,
  fechaHoraProgramada: string
) {
  const datos = {
    id_medicamento: idMedicamento,
    fecha_hora_programada: fechaHoraProgramada,
    fecha_hora_tomada: estado === "tomado" ? new Date().toISOString() : null,
    estado,
  };

  return postApi("/dosis", datos, token);
}

export async function editarEstadoDosis(token: string, idDosis: number, estado: string) {
  const datos = {
    estado,
    fecha_hora_tomada: estado === "tomado" ? new Date().toISOString() : null,
  };

  return putApi(`/dosis/${idDosis}/estado`, datos, token);
}

export async function traerPerfil(token: string, idUsuario: number) {
  return getApi(`/usuarios/${idUsuario}`, token);
}

export async function traerContactos(token: string) {
  return getApi("/contactos-emergencia", token);
}

export async function guardarContacto(token: string, contacto: ContactoEmergenciaNuevo) {
  return postApi("/contactos-emergencia", contacto, token);
}

export async function borrarContacto(token: string, id: number) {
  return deleteApi(`/contactos-emergencia/${id}`, token);
}

export async function traerCondiciones(token: string) {
  return getApi("/condiciones-cronicas", token);
}

export async function guardarCondicion(token: string, condicion: CondicionCronicaNueva) {
  return postApi("/condiciones-cronicas", condicion, token);
}

export async function borrarCondicion(token: string, id: number) {
  return deleteApi(`/condiciones-cronicas/${id}`, token);
}
