import React, { useEffect, useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function ListaDosis() {
  const { medicamentos, dosis, obtenerMedicamentos, obtenerDosis, registrarDosis } = useContextQuickMeds();

  useEffect(() => {
    obtenerMedicamentos();
    obtenerDosis();
  }, []);

  const hoy = new Date();
  const fechaHoy = hoy.toDateString();

  const resumenPorMedicamento = useMemo(() => {
    return medicamentos.map((medicamento) => {
      const objetivo = Number.parseInt(medicamento.dosis, 10);
      const objetivoDiario = Number.isFinite(objetivo) && objetivo > 0 ? objetivo : 1;

      const tomadasHoy = dosis.filter((item) => {
        if (item.id_medicamento !== medicamento.id) {
          return false;
        }

        if (item.estado?.toLowerCase() !== "tomado" || !item.fecha_hora_tomada) {
          return false;
        }

        return new Date(item.fecha_hora_tomada).toDateString() === fechaHoy;
      }).length;

      return {
        medicamento,
        objetivoDiario,
        tomadasHoy,
      };
    });
  }, [medicamentos, dosis, fechaHoy]);

  async function marcarDosis(idMedicamento: number, estado: "tomado" | "omitido") {
    await registrarDosis(idMedicamento, estado, new Date().toISOString());
  }

  return (
    <FlatList
      data={resumenPorMedicamento}
      keyExtractor={(item) => item.medicamento.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.medicamento.nombre}</Text>
          <Text>Objetivo de hoy: {item.tomadasHoy}/{item.objetivoDiario}</Text>
          <Text>Frecuencia: {item.medicamento.frecuencia}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.botonTomado, item.tomadasHoy >= item.objetivoDiario && styles.botonDeshabilitado]}
              disabled={item.tomadasHoy >= item.objetivoDiario}
              onPress={() => marcarDosis(item.medicamento.id, "tomado")}
            >
              <Text style={styles.textoBoton}>Tomado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonOmitido} onPress={() => marcarDosis(item.medicamento.id, "omitido")}>
              <Text style={styles.textoBoton}>Omitido</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListEmptyComponent={<Text>No hay medicamentos para registrar dosis.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#adb5bd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  botonTomado: {
    flex: 1,
    backgroundColor: "#2a9d8f",
    padding: 8,
    borderRadius: 6,
  },
  botonOmitido: {
    flex: 1,
    backgroundColor: "#e76f51",
    padding: 8,
    borderRadius: 6,
  },
  botonDeshabilitado: {
    backgroundColor: "#6c757d",
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
  },
});
