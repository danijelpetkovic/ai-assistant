
import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

export default function App() {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter a question"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    marginHorizontal: 20 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginVertical: 20,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 20
  },
});
