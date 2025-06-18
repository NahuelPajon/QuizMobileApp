import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function questionPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  // const paramId = route.params?.id; // Obtiene el id de la pregunta desde los parámetros de la ruta
  const { preguntaId } = useLocalSearchParams(); // ID viene de la ruta dinámica
  // const router = useRouter();

  const API_URL =
    Platform.OS === "web"
      ? `http://localhost:3000/Cuestionarios/Preguntas/${preguntaId}` //para verlo desde la web
      : `http://192.168.1.98:3000/Cuestionarios/Preguntas/${preguntaId}`; //para verlo desde el celular

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestions(data); // actualiza el estado de questions con los datos obtenidos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Navegar a la pregunta con id = 5
  // navigation.navigate("QuestionPage", { id: 5 });

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const question = questions.find(
    (question) => String(question.id) === String(preguntaId)
  );
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
          {question.opciones.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 4,
              }}
            >
              <Text style={{ marginLeft: 8 }}>{opcion.texto}</Text>
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
