import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaDosis from "../components/ListaDosis";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Historial() {
  const { dosis, obtenerDosis, cambiarPantalla } = useContextQuickMeds();

  useEffect(() => {
    obtenerDosis();
  }, []);

  const porcentajeCumplimiento = useMemo(() => {
    if (!dosis.length) {
      return 0;
    }

    const tomadas = dosis.filter((item) => item.estado === "tomado").length;
    return Math.round((tomadas * 100) / dosis.length);
  }, [dosis]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial y estadisticas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Cumplimiento:</Text>
        <Text style={styles.valor}>{porcentajeCumplimiento}%</Text>
      </View>

      <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />

      <View style={styles.lista}>
        <ListaDosis />
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
  card: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#e9ecef",
  },
  label: {
    fontSize: 16,
    color: "#495057",
  },
  valor: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0b7285",
  },
  lista: {
    marginTop: 12,
    flex: 1,
  },
});
