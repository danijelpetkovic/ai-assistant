
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";

let jwt = require('jwt-simple');

let secret = 'milanoberlinbanjaluka';
let contextAPI = 'http://a9a3e7fa5eae749bfa0759c2bcd4661e-0bef64a44b59dbe1.elb.us-east-1.amazonaws.com/context-server/find_context?question='

export default function App() {
  const [text, onChangeText] = React.useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  const getContext = async (text) => {

    let payload = { question: 'text' };
    let token = jwt.encode(payload, secret);

    try {
      const response = await fetch(contextAPI + JSON.stringify(text),
        {  
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': 'http://localhost:19006/'
          }
        }
      )
      const json = await response.json();
      setData(json);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter a question"
      />
      <Pressable style={styles.button} onPress={() => getContext(text)}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
      
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    marginVertical: 20
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
