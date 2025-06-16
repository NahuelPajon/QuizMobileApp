import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


export default function questionPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = "http://localhost:3000/Preguntas";
        const response = await fetch(url);
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
  navigation.navigate("QuestionPage", { id: 5 });
  //   const route = useRoute();
  //   const paramId = route.params?.id; // Obtiene el id de la pregunta desde los parámetros de la ruta

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const question = questions.find((question) => question.id === paramId);
  if (!question) return <p>Pregunta no encontrada</p>;

  return (
    <div>
      <h1>Pregunta</h1>
      <h2>{question.titulo}</h2>
      <h3>{question.pregunta}</h3>
      {!question.opciones || question.opciones.length === 0 ? (
        <>
          <p>Esta pregunta de tipo 'Texto Libre'</p>
          <input type="text" placeholder="Escribe tu respuesta aquí" />
          <button>Enviar Respuesta</button>
        </>
      ) : (
        <>
          <p>Esta pregunta de tipo 'Multiple Opción'</p>
          <h3>Opciones: </h3>
          <ul>
            {question.opciones.map((opcion) => (
              <li key={opcion.id}>
                <input type="radio" name="respuesta" value={opcion.id} />
                {opcion.texto}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
