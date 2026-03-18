import React from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Medicamento } from "../modelos/Medicamento";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

type Props = {
    onEditar: (medicamento: Medicamento) => void;
};

export default function ListaMedicamentos({ onEditar }: Props) {
    const {
    medicamentos,
    cambiarEstadoMedicamento,
    eliminarMedicamento,
    } = useContextQuickMeds();

    async function cambiarEstado(item: Medicamento, nuevoEstado: boolean) {
    await cambiarEstadoMedicamento(item.id, nuevoEstado);
    }

    async function eliminar(id: number) {
    Alert.alert(
        "Eliminar medicamento",
        "¿Seguro que deseas eliminar este medicamento?",
        [
        { text: "Cancelar", style: "cancel" },
        {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
            await eliminarMedicamento(id);
            },
        },
        ]
    );
    }

    if (!medicamentos.length) {
    return <Text style={styles.vacio}>No hay medicamentos registrados.</Text>;
    }

    return (
    <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Switch
                value={item.activo}
                onValueChange={(value) => cambiarEstado(item, value)}
            />
            </View>

            <Text>Dosis: {item.dosis}</Text>
            <Text>Frecuencia: {item.frecuencia}</Text>
            <Text>Hora: {item.hora_especifica}</Text>
            <Text>Inicio: {item.fecha_inicio}</Text>
            <Text>Fin: {item.fecha_fin || "Sin fecha fin"}</Text>
            <Text style={styles.estado}>
            Estado: {item.activo ? "Activo" : "Inactivo"}
            </Text>

            <View style={styles.botones}>
            <TouchableOpacity
                style={styles.botonEditar}
                onPress={() => onEditar(item)}
            >
                <Text style={styles.textoBoton}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => eliminar(item.id)}
            >
                <Text style={styles.textoBoton}>Eliminar</Text>
            </TouchableOpacity>
            </View>
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
    header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    },
    nombre: {
    fontSize: 16,
    fontWeight: "700",
    },
    estado: {
    marginTop: 8,
    fontWeight: "700",
    color: "#0077b6",
    },
    botones: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    },
    botonEditar: {
    flex: 1,
    backgroundColor: "#0077b6",
    padding: 10,
    borderRadius: 8,
    },
    botonEliminar: {
    flex: 1,
    backgroundColor: "#d00000",
    padding: 10,
    borderRadius: 8,
    },
    textoBoton: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    },
});