import React, { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const {
    iniciarSesion,
    cambiarPantalla,
    error,
    mensaje,
    cargandoSesion,
    } = useContextQuickMeds();

    async function ingresar() {
    await iniciarSesion({ email: correo, password });
    }

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Iniciar sesión</Text>

        <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!!error && <Text style={styles.error}>{error}</Text>}
      {!!mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}

      <TouchableOpacity style={styles.boton} onPress={ingresar}>
        {cargandoSesion ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBoton}>Entrar</Text>
        )}
      </TouchableOpacity>

      <BotonVolverDashboard
        texto="Volver al inicio"
        onPress={() => cambiarPantalla("HomePublico")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
    },
    titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    },
    input: {
    borderWidth: 1,
    borderColor: "#adb5bd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    },
    boton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 8,
    },
    textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    },
    error: {
    color: "#d00000",
    marginTop: 10,
    marginBottom: 6,
    },
    mensaje: {
    color: "green",
    marginTop: 10,
    marginBottom: 6,
    },
});