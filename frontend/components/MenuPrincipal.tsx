import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function MenuPrincipal() {
    const { cambiarPantalla } = useContextQuickMeds();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => cambiarPantalla("Medicamentos")}>
                <Text style={styles.texto}>Gestion de medicamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => cambiarPantalla("Recordatorios")}>
                <Text style={styles.texto}>Recordatorios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => cambiarPantalla("Dosis")}>
                <Text style={styles.texto}>Dosis (Tomado/Omitido)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => cambiarPantalla("Historial")}>
                <Text style={styles.texto}>Historial y estadisticas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => cambiarPantalla("Perfil")}>
                <Text style={styles.texto}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        gap: 12,
    },
    item: {
        backgroundColor: "#d9ed92",
        padding: 14,
        borderRadius: 8,
    },
    texto: {
        fontWeight: "700",
        color: "#1d3557",
    },
});