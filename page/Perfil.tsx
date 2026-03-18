import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BotonVolverDashboard from "../components/BotonVolverDashboard";
import { Usuario } from "../modelos/Usuario";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";

export default function Perfil() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [nombreContacto, setNombreContacto] = useState("");
    const [telefonoContacto, setTelefonoContacto] = useState("");
    const [relacionContacto, setRelacionContacto] = useState("");
    const [nombreCondicion, setNombreCondicion] = useState("");
    const [notasCondicion, setNotasCondicion] = useState("");

    const {
        sesion,
        contactos,
        condiciones,
        obtenerPerfil,
        obtenerContactos,
        agregarContacto,
        eliminarContacto,
        obtenerCondiciones,
        agregarCondicion,
        eliminarCondicion,
        cambiarPantalla,
    } = useContextQuickMeds();

    useEffect(() => {
        async function cargar() {
            const data = await obtenerPerfil();
            setUsuario(data);
            await obtenerContactos();
            await obtenerCondiciones();
        }

        cargar();
    }, []);

    async function crearContacto() {
        if (!sesion?.usuario.id) {
            return;
        }

        const ok = await agregarContacto({
            id_usuario: sesion.usuario.id,
            nombre: nombreContacto,
            telefono: telefonoContacto,
            relacion: relacionContacto,
        });

        if (ok) {
            setNombreContacto("");
            setTelefonoContacto("");
            setRelacionContacto("");
        }
    }

    async function crearCondicion() {
        if (!sesion?.usuario.id) {
            return;
        }

        const ok = await agregarCondicion({
            id_usuario: sesion.usuario.id,
            nombre_condicion: nombreCondicion,
            notas: notasCondicion,
        });

        if (ok) {
            setNombreCondicion("");
            setNotasCondicion("");
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.titulo}>Perfil</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Nombre: {usuario?.nombre || "-"}</Text>
                <Text style={styles.label}>Email: {usuario?.email || "-"}</Text>
                <Text style={styles.label}>Edad: {usuario?.edad ?? "-"}</Text>
            </View>

            <Text style={styles.subtitulo}>Contacto de emergencia</Text>
            <TextInput placeholder="Nombre" value={nombreContacto} onChangeText={setNombreContacto} style={styles.input} />
            <TextInput placeholder="Telefono" value={telefonoContacto} onChangeText={setTelefonoContacto} style={styles.input} />
            <TextInput placeholder="Relacion" value={relacionContacto} onChangeText={setRelacionContacto} style={styles.input} />
            <TouchableOpacity style={styles.boton} onPress={crearContacto}>
                <Text style={styles.textoBoton}>Agregar contacto</Text>
            </TouchableOpacity>

            {contactos.map((item) => (
                <View key={item.id} style={styles.itemLista}>
                    <Text>{item.nombre} - {item.telefono} ({item.relacion || "Sin relacion"})</Text>
                    <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarContacto(item.id)}>
                        <Text style={styles.textoBoton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <Text style={styles.subtitulo}>Condiciones cronicas</Text>
            <TextInput
                placeholder="Nombre condicion"
                value={nombreCondicion}
                onChangeText={setNombreCondicion}
                style={styles.input}
            />
            <TextInput placeholder="Notas" value={notasCondicion} onChangeText={setNotasCondicion} style={styles.input} />
            <TouchableOpacity style={styles.boton} onPress={crearCondicion}>
                <Text style={styles.textoBoton}>Agregar condicion</Text>
            </TouchableOpacity>

            {condiciones.map((item) => (
                <View key={item.id} style={styles.itemLista}>
                    <Text>{item.nombre_condicion} - {item.notas || "Sin notas"}</Text>
                    <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarCondicion(item.id)}>
                        <Text style={styles.textoBoton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <BotonVolverDashboard onPress={() => cambiarPantalla("Dashboard")} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },
    subtitulo: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },
    card: {
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f8f9fa",
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#adb5bd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
    },
    boton: {
        backgroundColor: "#4361ee",
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    textoBoton: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
    },
    itemLista: {
        borderWidth: 1,
        borderColor: "#dee2e6",
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        backgroundColor: "#ffffff",
    },
    botonEliminar: {
        marginTop: 8,
        backgroundColor: "#d62828",
        padding: 8,
        borderRadius: 6,
    },
});