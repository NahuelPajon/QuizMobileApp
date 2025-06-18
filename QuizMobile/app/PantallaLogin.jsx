import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PantallaLogin() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    //const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const URL = "http://localhost:3000/Respuestas";
            const response = await fetch(`${URL}?username=${nombreUsuario}`);
            if (!response.ok) {
                throw new Error("Error de red.");
            }
            const data = await response.json();
            if (data.length > 0) {
                Alert.alert('Login exitoso', `Bienvenido ${nombreUsuario}`);
            }
            else {
                const nuevoUsuario = {
                    username: nombreUsuario,
                    respuestas: []
                };
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(nuevoUsuario),
                });
                Alert.alert('Nuevo usuario registrado con éxito', `Bienvenido ${nombreUsuario}`);
            }
        } catch (err) {
            setError(err.message);
        }
        router.push('/homepage');
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