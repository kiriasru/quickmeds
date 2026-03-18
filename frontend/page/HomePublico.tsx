import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function HomePublico() {
  const { cambiarPantalla } = useContextQuickMeds();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a QuickMeds</Text>
      <Text style={styles.descripcion}>Controla tus medicamentos de forma sencilla.</Text>

      <TouchableOpacity style={styles.boton} onPress={() => cambiarPantalla("Login")}>
        <Text style={styles.textoBoton}>Ya tengo cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonSecundario} onPress={() => cambiarPantalla("Registro")}>
        <Text style={styles.textoBoton}>Quiero registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1d3557",
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 20,
    color: "#4f5d75",
  },
  boton: {
    backgroundColor: "#219ebc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  botonSecundario: {
    backgroundColor: "#023047",
    padding: 12,
    borderRadius: 8,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});
