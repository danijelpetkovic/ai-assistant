
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, ActivityIndicator, FlatList } from "react-native";

export default function App() {
  const [text, onChangeText] = React.useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getContext = async () => {
    try {
     const response = await fetch('https://reactnative.dev/movies.json');
     const json = await response.json();
     setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContext();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter a question"
      />
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
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
