import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuestionPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const { preguntaId } = useLocalSearchParams();
  const router = useRouter();
  const respuestaId = "usuario2" + "_" + preguntaId; // {usuario} (se obtiene del contexto del login)

  const API_URL =
    Platform.OS === "web"
      ? `http://localhost:3000/Preguntas/${preguntaId}`
      : `http://192.168.1.125:3000/Preguntas/${preguntaId}`;

  const API_URL_RESPUESTA =
    Platform.OS === "web"
      ? `http://localhost:3000/Respuestas`
      : `http://192.168.1.125:3000/Respuestas`;

  useEffect(() => {
    const fetchQuestion = async () => {
      // 1. Buscar si ya existe la respuesta para ese usuario
      const getUrl = `${API_URL_RESPUESTA}/${respuestaId}`;
      const getResp = await fetch(getUrl);
      if (getResp.ok) {
        const data = await getResp.json();
        setRespuesta(data.respuesta);
        setOpcionSeleccionada(data.respuesta);
        setTimestamp(data.timestamp);
      }
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestion(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [preguntaId]);

  const saveQuestion = async () => {
    const nuevaRespuesta = {
      id: respuestaId,
      usuario: "usuario2", // {usuario}
      preguntaId,
      respuesta:
        !question.opciones || question.opciones.length === 0
          ? respuesta
          : opcionSeleccionada,
      timestamp: new Date().toISOString(),
    };
    // 1. Buscar si ya existe la respuesta para ese usuario
    const getUrl = `${API_URL_RESPUESTA}/${respuestaId}`;
    const getResp = await fetch(getUrl);

    if (getResp.ok) {
      // 2. Si existe, actualizar (PUT) y mostrar datos guardados hasta ahora
      const putResp = await fetch(getUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaRespuesta),
      });
      if (!putResp.ok) throw new Error("No se pudo actualizar la respuesta");
      alert("Respuesta actualizada correctamente");
    } else {
      // 3. Si no existe, crear (POST)
      const postResp = await fetch(API_URL_RESPUESTA, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaRespuesta),
      });
      if (!postResp.ok) throw new Error("No se pudo guardar la respuesta");
      alert("Respuesta guardada correctamente");
    }
  };

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!question) return <Text>Pregunta no encontrada</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pregunta</Text>
      <Text style={styles.questionTitle}>{question.titulo}</Text>
      <Text style={styles.questionText}>{question.pregunta}</Text>
      {!question.opciones || question.opciones.length === 0 ? (
        <View>
          <Text>Esta pregunta de tipo 'Texto Libre'</Text>
          <TextInput
            placeholder={respuesta ? respuesta : "Escribe tu respuesta aquí..."}
            value={respuesta}
            onChangeText={setRespuesta}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={saveQuestion}>
            <Text style={styles.buttonText}>Enviar Respuesta</Text>
          </TouchableOpacity>
          <Text style={styles.timestampStyle}>
            {timestamp
              ? `Última actualización: ${new Date(timestamp).toLocaleString()}`
              : ""}
          </Text>
        </View>
      ) : (
        <View>
          <Text>Esta pregunta de tipo 'Multiple Opción'</Text>
          <Text style={styles.optionsLabel}>Opciones:</Text>
          {question.opciones.map((opcion, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.optionButton,
                opcionSeleccionada === opcion && styles.optionButtonSelected,
              ]}
              onPress={() => setOpcionSeleccionada(opcion)}
            >
              <Text style={styles.optionText}>{opcion}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.button, { marginTop: 12 }]}
            onPress={saveQuestion}
          >
            <Text style={styles.buttonText}>Enviar Respuesta</Text>
          </TouchableOpacity>
          <Text style={styles.timestampStyle}>
            {timestamp
              ? `Última actualización: ${new Date(timestamp).toLocaleString()}`
              : ""}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  questionTitle: {
    fontSize: 20,
  },
  questionText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionsLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 6,
  },
  optionButtonSelected: {
    backgroundColor: "#007bff",
  },
  optionText: {
    marginLeft: 8,
    color: "#000",
  },
  timestampStyle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});
