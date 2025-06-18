import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function QuizPage() {
  const { id } = useLocalSearchParams(); // ID viene de la ruta dinámica
  const router = useRouter();

  const [cuestionario, setCuestionario] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_CUEST =
    Platform.OS === "web"
      ? `http://localhost:3000/Cuestionarios/${id}`
      : `http://192.168.1.98:3000/Cuestionarios/${id}`;

  const API_PREG =
    Platform.OS === "web"
      ? `http://localhost:3000/PreguntasCuestionario?cuestionarioId=${id}`
      : `http://192.168.1.98:3000/PreguntasCuestionario?cuestionarioId=${id}`;

  useEffect(() => {
    fetch(API_CUEST)
      .then((res) => res.json())
      .then((data) => setCuestionario(data));

    fetch(API_PREG)
      .then((res) => res.json())
      .then((data) => {
        setPreguntas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar preguntas:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando cuestionario...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cuestionario?.Nombre}</Text>
      <Text style={styles.description}>{cuestionario?.Descripcion}</Text>

      <Text style={styles.subtitle}>Preguntas</Text>
      {preguntas.length > 0 ? (
        preguntas.map((pregunta) => (
          <TouchableOpacity
            key={pregunta.id}
            style={styles.button}
            onPress={() => router.push(`/${id}/${pregunta.id}`)}
          >
            <Text style={styles.buttonText}>{pregunta.titulo}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No hay preguntas disponibles.</Text>
      )}

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
