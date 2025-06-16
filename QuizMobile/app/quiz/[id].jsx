import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function QuizPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [cuestionario, setCuestionario] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/Cuestionarios/${id}`)
      .then((res) => res.json())
      .then((data) => setCuestionario(data));

    fetch(`http://localhost:3000/PreguntasCuestionario?cuestionarioId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPreguntas(data);
        setLoading(false);
      });
  }, [id]);

  if (loading || !cuestionario) return <Text>Cargando...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{cuestionario.Nombre}</Text>
      <Text>{cuestionario.Descripcion}</Text>

      <Text style={styles.subtitle}>Preguntas</Text>
      {preguntas.map((pregunta) => (
        <TouchableOpacity key={pregunta.id} style={styles.button}>
          <Text style={styles.buttonText}>{pregunta.titulo}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 20, marginTop: 20 },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  backButton: { backgroundColor: "#888", marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center" },
});
