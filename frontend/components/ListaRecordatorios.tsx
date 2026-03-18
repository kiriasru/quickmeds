import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function ListaRecordatorios() {
  const { recordatorios, eliminarRecordatorio } = useContextQuickMeds();

  return (
    <FlatList
      data={recordatorios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>Medicamento ID: {item.id_medicamento}</Text>
          <Text>Hora: {item.hora_recordatorio}</Text>
          <Text>Estado: {item.activo ? "Activo" : "Inactivo"}</Text>

          <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarRecordatorio(item.id)}>
            <Text style={styles.textoBoton}>Eliminar recordatorio</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text>No hay recordatorios.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#cdb4db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f3e8ff",
  },
  title: {
    fontWeight: "700",
  },
  botonEliminar: {
    marginTop: 8,
    backgroundColor: "#d62828",
    padding: 8,
    borderRadius: 6,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
  },
});
