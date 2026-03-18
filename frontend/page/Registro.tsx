import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");

  const { registrar, cambiarPantalla, mensaje, error } = useContextQuickMeds();

  async function handleRegistro() {
    const resultado = await registrar({
      nombre,
      email,
      password,
      edad: edad ? Number(edad) : null,
    });

    if (resultado) {
      Alert.alert("Exito", "Usuario registrado correctamente.");
      cambiarPantalla("Login");
      return;
    }

    Alert.alert("Error", error || "No se pudo registrar.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
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
      <TextInput
        placeholder="Edad (opcional)"
        value={edad}
        onChangeText={setEdad}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
        <Text style={styles.textoBoton}>Crear cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonSecundario} onPress={() => cambiarPantalla("HomePublico")}>
        <Text style={styles.textoBoton}>Volver</Text>
      </TouchableOpacity>

      {!!mensaje && <Text style={styles.exito}>{mensaje}</Text>}
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
    backgroundColor: "#2a9d8f",
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
  exito: {
    color: "#2a9d8f",
    marginTop: 10,
  },
  error: {
    color: "#d90429",
    marginTop: 6,
  },
});
