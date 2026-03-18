import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaMedicamentos from "../components/ListaMedicamentos";
import { Medicamento } from "../modelos/Medicamento";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Medicamentos() {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [hora, setHora] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [activoEditando, setActivoEditando] = useState(true);

  const { sesion, agregarMedicamento, actualizarMedicamento, obtenerMedicamentos, cambiarPantalla, error } = useContextQuickMeds();

  useEffect(() => {
    obtenerMedicamentos();
  }, []);

  async function agregar() {
    if (!sesion?.usuario.id) {
      return;
    }

    const resultado = await agregarMedicamento({
      id_usuario: sesion.usuario.id,
      nombre,
      dosis,
      frecuencia,
      hora_especifica: hora,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      activo: true,
    });

    if (resultado) {
      Alert.alert("Exito", "Medicamento guardado.");
      setNombre("");
      setDosis("");
      setFrecuencia("");
      setHora("");
      setFechaInicio("");
      setFechaFin("");
    }
  }

  async function guardarCambios() {
    if (!idEditando) {
      return;
    }

    const resultado = await actualizarMedicamento(idEditando, {
      nombre,
      dosis,
      frecuencia,
      hora_especifica: hora,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      activo: activoEditando,
    });

    if (resultado) {
      Alert.alert("Exito", "Medicamento actualizado.");
      limpiarFormulario();
    }
  }

  function editar(medicamento: Medicamento) {
    setIdEditando(medicamento.id);
    setNombre(medicamento.nombre);
    setDosis(medicamento.dosis);
    setFrecuencia(medicamento.frecuencia);
    setHora(medicamento.hora_especifica || "");
    setFechaInicio(medicamento.fecha_inicio);
    setFechaFin(medicamento.fecha_fin || "");
    setActivoEditando(medicamento.activo);
  }

  function limpiarFormulario() {
    setIdEditando(null);
    setNombre("");
    setDosis("");
    setFrecuencia("");
    setHora("");
    setFechaInicio("");
    setFechaFin("");
    setActivoEditando(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Medicamentos</Text>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Dosis" value={dosis} onChangeText={setDosis} style={styles.input} />
      <TextInput placeholder="Frecuencia (ej: cada 8h)" value={frecuencia} onChangeText={setFrecuencia} style={styles.input} />
      <TextInput placeholder="Hora (HH:mm:ss)" value={hora} onChangeText={setHora} style={styles.input} />
      <TextInput placeholder="Fecha inicio (YYYY-MM-DD)" value={fechaInicio} onChangeText={setFechaInicio} style={styles.input} />
      <TextInput placeholder="Fecha fin (YYYY-MM-DD opcional)" value={fechaFin} onChangeText={setFechaFin} style={styles.input} />

      <TouchableOpacity style={styles.boton} onPress={idEditando ? guardarCambios : agregar}>
        <Text style={styles.textoBoton}>{idEditando ? "Guardar cambios" : "Agregar medicamento"}</Text>
      </TouchableOpacity>

      {idEditando && (
        <TouchableOpacity style={styles.botonCancelar} onPress={limpiarFormulario}>
          <Text style={styles.textoBoton}>Cancelar edicion</Text>
        </TouchableOpacity>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />

      <View style={styles.lista}>
        <ListaMedicamentos onEditar={editar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#adb5bd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  botonCancelar: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  lista: {
    marginTop: 12,
    flex: 1,
  },
  error: {
    color: "#d00000",
  },
});
