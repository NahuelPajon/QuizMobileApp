import React from "react";
import { View } from "react-native";
import QuestionPage from "./questionPage";
import HomePage from "./homepage";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomePage />
    </View>
  );
}
