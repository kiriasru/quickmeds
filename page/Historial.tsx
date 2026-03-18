import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaDosis from "../components/ListaDosis";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Historial() {
  const { dosis, obtenerDosis, cambiarPantalla, error, mensaje } =
    useContextQuickMeds();

  useEffect(() => {
    obtenerDosis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de dosis</Text>

      {!!error && <Text style={styles.error}>{error}</Text>}
      {!!mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}

      <ListaDosis dosis={dosis} />

      <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  error: {
    color: "#d00000",
    marginBottom: 10,
  },
  mensaje: {
    color: "green",
    marginBottom: 10,
  },
});