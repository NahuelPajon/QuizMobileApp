import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>INICIAR SESIÓN</Text>
      <Link href="/quiz/1" asChild>
        <TouchableOpacity style={{ marginTop: 20, backgroundColor: "#007AFF", padding: 10 }}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Ingresar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
