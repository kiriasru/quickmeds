import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Dosis } from "../modelos/Dosis";

type Props = {
    dosis?: Dosis[];
};

export default function ListaDosis({ dosis = [] }: Props) {
    if (!dosis.length) {
        return <Text style={styles.vacio}>No hay historial de dosis.</Text>;
    }
    return (
        <FlatList
            data={dosis}
            keyExtractor={(item) => item.id !== undefined ? item.id.toString() : Math.random().toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.nombre}>
                        {item.nombre_medicamento || "Medicamento"}
                    </Text>
                    <Text>Dosis: {item.dosis}</Text>
                    <Text>Fecha: {item.fecha}</Text>
                    <Text>Hora: {item.hora}</Text>
                    <Text
                        style={[
                            styles.estado,
                            item.estado === "tomado"
                                ? styles.tomado
                                : item.estado === "omitido"
                                    ? styles.omitido
                                    : {}
                        ]}
                    >
                        {item.estado}
                    </Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    vacio: {
    textAlign: "center",
    marginTop: 16,
    color: "#6c757d",
    },
    card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dee2e6",
    },
    nombre: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    },
    estado: {
    marginTop: 6,
    fontWeight: "700",
    },
    tomado: {
    color: "green",
    },
    omitido: {
    color: "red",
    },
    pendiente: {
    color: "#e09f3e",
    },
});