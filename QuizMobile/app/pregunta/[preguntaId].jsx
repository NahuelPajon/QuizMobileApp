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
  const { preguntaId } = useLocalSearchParams();
  const router = useRouter();

  const API_URL =
    Platform.OS === "web"
      ? `http://localhost:3000/Preguntas/${preguntaId}`
      : `http://192.168.1.98:3000/Preguntas/${preguntaId}`;

  const API_URL_RESPUESTA =
    Platform.OS === "web"
      ? `http://localhost:3000/Respuestas/usuario1` // agregar la respuesta específica del usuario. Pendiente logica de LOGIN
      : `http://192.168.1.98:3000/Respuestas`; // agregar la respuesta específica del usuario. Pendiente logica de LOGIN

  useEffect(() => {
    const fetchQuestion = async () => {
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
    try {
      const response = await fetch(API_URL_RESPUESTA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preguntaId,
          respuesta:
            !question.opciones || question.opciones.length === 0
              ? respuesta
              : opcionSeleccionada,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Respuesta guardada correctamente");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!question) return <Text>Pregunta no encontrada</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Pregunta</Text>
      <Text style={{ fontSize: 20 }}>{question.titulo}</Text>
      <Text style={{ fontSize: 18 }}>{question.pregunta}</Text>
      {!question.opciones || question.opciones.length === 0 ? (
        <View>
          <Text>Esta pregunta de tipo 'Texto Libre'</Text>
          <TextInput
            placeholder="Escribe tu respuesta aquí"
            value={respuesta}
            onChangeText={setRespuesta}
            style={{
              borderWidth: 1,
              marginVertical: 8,
              padding: 8,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 6,
              alignItems: "center",
            }}
            onPress={saveQuestion}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Enviar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>Esta pregunta de tipo 'Multiple Opción'</Text>
          <Text style={{ fontSize: 16, marginTop: 8 }}>Opciones:</Text>
          {question.opciones.map((opcion, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
              }}
              onPress={() => setOpcionSeleccionada(opcion)}
            >
              <Text style={{ marginLeft: 8 }}>{opcion}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 10,
              borderRadius: 6,
              alignItems: "center",
              marginTop: 12,
            }}
            onPress={saveQuestion}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Enviar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
