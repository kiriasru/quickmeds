import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

export default function BotonVolverDashboard({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>Volver al dashboard</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#2a6f97",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  texto: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});
