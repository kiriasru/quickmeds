import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { iniciarSesion, cambiarPantalla, error, cargandoSesion } = useContextQuickMeds();

  async function handleLogin() {
    const resultado = await iniciarSesion({ email, password });

    if (!resultado) {
      Alert.alert("Error", error || "No se pudo iniciar sesion.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar sesion</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contrasena"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>{cargandoSesion ? "Ingresando..." : "Ingresar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonSecundario} onPress={() => cambiarPantalla("HomePublico")}>
        <Text style={styles.textoBoton}>Volver</Text>
      </TouchableOpacity>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1d3557",
  },
  input: {
    borderWidth: 1,
    borderColor: "#adb5bd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#3a86ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  botonSecundario: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  error: {
    color: "#d90429",
    marginTop: 10,
  },
});
