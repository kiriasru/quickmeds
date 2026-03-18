import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Medicamento } from "../modelos/Medicamento";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

interface Props {
  onEditar: (medicamento: Medicamento) => void;
}

export default function ListaMedicamentos({ onEditar }: Props) {
  const { medicamentos, eliminarMedicamento, cambiarEstadoMedicamento } = useContextQuickMeds();

  return (
    <FlatList
      data={medicamentos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text>Dosis: {item.dosis}</Text>
          <Text>Frecuencia: {item.frecuencia}</Text>
          <Text>Hora: {item.hora_especifica || "No definida"}</Text>
          <Text>Estado: {item.activo ? "Activo" : "Inactivo"}</Text>

          <TouchableOpacity
            style={styles.botonEstado}
            onPress={() => cambiarEstadoMedicamento(item.id, !item.activo)}
          >
            <Text style={styles.textoBoton}>Activar / Desactivar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarMedicamento(item.id)}>
            <Text style={styles.textoBoton}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonEditar} onPress={() => onEditar(item)}>
            <Text style={styles.textoBoton}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text>No hay medicamentos cargados.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccd5ae",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fefae0",
  },
  title: {
    fontWeight: "700",
    marginBottom: 6,
  },
  botonEstado: {
    backgroundColor: "#457b9d",
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
  },
  botonEliminar: {
    backgroundColor: "#e63946",
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
  },
  botonEditar: {
    backgroundColor: "#2a9d8f",
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
  },
});
