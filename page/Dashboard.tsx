import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Dashboard() {
    const {
    sesion,
    medicamentos,
    recordatorios,
    obtenerMedicamentos,
    obtenerRecordatorios,
    cambiarPantalla,
    } = useContextQuickMeds();

    useEffect(() => {
    obtenerMedicamentos();
    obtenerRecordatorios();
    }, []);

    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Dashboard</Text>
        <Text style={styles.bienvenida}>
        Hola, {sesion?.usuario?.nombre || "usuario"}
        </Text>

        <View style={styles.card}>
        <Text style={styles.cardTitulo}>Medicamentos registrados</Text>
        <Text style={styles.cardValor}>{medicamentos.length}</Text>
        </View>

        <View style={styles.card}>
        <Text style={styles.cardTitulo}>Recordatorios</Text>
        <Text style={styles.cardValor}>{recordatorios.length}</Text>
        </View>

        <TouchableOpacity
        style={styles.boton}
        onPress={() => cambiarPantalla("Medicamentos")}
        >
        <Text style={styles.textoBoton}>Ir a medicamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.boton}
        onPress={() => cambiarPantalla("Historial")}
        >
        <Text style={styles.textoBoton}>Ver historial</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.boton}
        onPress={() => cambiarPantalla("Perfil")}
        >
        <Text style={styles.textoBoton}>Ver perfil</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    },
    bienvenida: {
    fontSize: 16,
    marginBottom: 20,
    color: "#495057",
    },
    card: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    },
    cardTitulo: {
    fontSize: 16,
    fontWeight: "600",
    },
    cardValor: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0077b6",
    marginTop: 6,
    },
    boton: {
    backgroundColor: "#0077b6",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    },
    textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    },
});