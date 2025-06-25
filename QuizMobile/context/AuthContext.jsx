import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Acá uno intenta restaurar la sesión desde el AsyncStorage
    useEffect(() => {
        AsyncStorage.getItem('usuario')
        .then(data => {
            if (data) setUsuario(JSON.parse(data));
        })
        .finally(() => setLoading(false));
    }, []);

    const iniciarSesion = async (username) => {
        const u = username;
        await AsyncStorage.setItem('usuario', JSON.stringify(u));
        setUsuario(u);
        return u;
    };

    const cerrarSesion = async () => {
        await AsyncStorage.removeItem('usuario');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, loading, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}
