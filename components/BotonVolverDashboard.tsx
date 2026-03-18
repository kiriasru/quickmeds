import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    onPress: () => void;
    texto?: string;
};

export default function BotonVolverDashboard({
    onPress,
    texto = "Volver al Dashboard",
}: Props) {
    return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
        <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    },
    texto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    },
});