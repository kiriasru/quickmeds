import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function HomePublico() {
    const { cambiarPantalla } = useContextQuickMeds();

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>QuickMeds</Text>
        <Text style={styles.subtitulo}>
        Lleva el control de tus medicamentos de forma simple y rápida.
        </Text>

        <TouchableOpacity
        style={styles.boton}
        onPress={() => cambiarPantalla("Login")}
        >
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.boton, styles.botonSecundario]}
        onPress={() => cambiarPantalla("Registro")}
        >
        <Text style={styles.textoBoton}>Registrarse</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
    },
    titulo: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    color: "#0077b6",
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 16,
    color: "#495057",
    marginBottom: 24,
  },
  boton: {
    backgroundColor: "#0077b6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    },
    botonSecundario: {
    backgroundColor: "#0096c7",
    },
    textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    },
});