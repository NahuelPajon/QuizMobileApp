import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PantallaLogin() {
    const [nombreUsuario, setNombreUsuario] = useState('');

    const handleLogin = () => {
        alert("Bienvenido,", nombreUsuario)
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxLogin}>
                <Text style={styles.titulo}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input} 
                    placeholder="Ingrese su nombre de usuario"
                    value={nombreUsuario}
                    onChangeText={setNombreUsuario}
                />
                <TouchableOpacity style={styles.boton} onPress={handleLogin}>
                    <Text style={styles.botonTexto}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#ffffff",
    },
    boxLogin: {
        width: '80%',
        maxWidth: 300,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 18,
    },
    boton: {
        width: '100%',
        height: 48,
        backgroundColor: 'rgb(61, 89, 118)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonTexto: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});