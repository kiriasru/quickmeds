import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MenuPrincipal from "../components/MenuPrincipal";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Dashboard() {
  const { sesion, cerrarSesion } = useContextQuickMeds();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dashboard QuickMeds</Text>
      <Text style={styles.subtitulo}>Hola, {sesion?.usuario.nombre}</Text>
      <Text style={styles.descripcion}>Selecciona una funcionalidad:</Text>

      <MenuPrincipal />

      <TouchableOpacity style={styles.botonSalir} onPress={cerrarSesion}>
        <Text style={styles.textoSalir}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1faee",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1d3557",
  },
  subtitulo: {
    marginTop: 6,
    fontSize: 16,
    color: "#264653",
  },
  descripcion: {
    marginTop: 14,
    marginBottom: 8,
  },
  botonSalir: {
    marginTop: 20,
    backgroundColor: "#c1121f",
    padding: 12,
    borderRadius: 8,
  },
  textoSalir: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});
