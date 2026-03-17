import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaMedicamentos from "../components/ListaMedicamentos";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Medicamentos() {
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [hora, setHora] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const { sesion, agregarMedicamento, obtenerMedicamentos, cambiarPantalla, error } = useContextQuickMeds();

  useEffect(() => {
    obtenerMedicamentos();
  }, []);

  async function agregar() {
    if (!sesion?.usuario.id) {
      return;
    }

    const ok = await agregarMedicamento({
      id_usuario: sesion.usuario.id,
      nombre,
      dosis,
      frecuencia,
      hora_especifica: hora,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      activo: true,
    });

    if (ok) {
      Alert.alert("Exito", "Medicamento guardado.");
      setNombre("");
      setDosis("");
      setFrecuencia("");
      setHora("");
      setFechaInicio("");
      setFechaFin("");
    }
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

      <TouchableOpacity style={styles.boton} onPress={agregar}>
        <Text style={styles.textoBoton}>Agregar medicamento</Text>
      </TouchableOpacity>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />

      <View style={styles.lista}>
        <ListaMedicamentos />
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
