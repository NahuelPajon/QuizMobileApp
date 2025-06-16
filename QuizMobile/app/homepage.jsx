import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform } from "react-native";

export default function HomePage() {
  const [cuestionarios, setCuestionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const API_URL =
    Platform.OS === "web"
      ? "http://localhost:3000/Cuestionarios" //para verlo desde la web
      : "http://10.13.12.139:3000/Cuestionarios"; //para verlo desde el celular

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setCuestionarios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar los cuestionarios:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando cuestionarios...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.quizCard}>
      <Text style={styles.title}>{item.Nombre}</Text>
      <Text style={styles.description}>{item.Descripcion}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QuizPage', { id: item.id })}
      >
        <Text style={styles.buttonText}>Ver preguntas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cuestionarios</Text>
      <FlatList
        data={cuestionarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quizCard: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
