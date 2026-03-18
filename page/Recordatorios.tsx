import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import ListaRecordatorios from "../components/ListaRecordatorios";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Recordatorios() {
    const [idMedicamento, setIdMedicamento] = useState("");
    const [hora, setHora] = useState("");

    const { agregarRecordatorio, obtenerRecordatorios, cambiarPantalla, error } = useContextQuickMeds();

    useEffect(() => {
        obtenerRecordatorios();
    }, []);

    async function agregar() {
        const ok = await agregarRecordatorio({
            id_medicamento: Number(idMedicamento),
            hora_recordatorio: hora,
            activo: true,
        });

        if (ok) {
            Alert.alert("Exito", "Recordatorio creado y programado.");
            setIdMedicamento("");
            setHora("");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recordatorios</Text>

            <TextInput
                placeholder="ID del medicamento"
                value={idMedicamento}
                onChangeText={setIdMedicamento}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Hora recordatorio (HH:mm:ss)"
                value={hora}
                onChangeText={setHora}
                style={styles.input}
            />

            <TouchableOpacity style={styles.boton} onPress={agregar}>
                <Text style={styles.textoBoton}>Agregar recordatorio</Text>
            </TouchableOpacity>

            {!!error && <Text style={styles.error}>{error}</Text>}

            <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />

            <View style={styles.lista}>
                <ListaRecordatorios />
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
    input: {
        borderWidth: 1,
        borderColor: "#adb5bd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: "#8338ec",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    textoBoton: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
    },
    lista: {
        marginTop: 12,
        flex: 1,
    },
    error: {
        color: "#d00000",
    },
});