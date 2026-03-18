import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaDosis from "../components/ListaDosis";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Dosis() {
  const { cambiarPantalla } = useContextQuickMeds();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dosis del dia</Text>
      <Text style={styles.subtitulo}>Marca cada dosis como tomado u omitido.</Text>

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
    marginBottom: 6,
  },
  subtitulo: {
    color: "#495057",
    marginBottom: 10,
  },
  lista: {
    marginTop: 12,
    flex: 1,
  },
});
