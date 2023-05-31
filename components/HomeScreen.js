import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a tu app de películas</Text>
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.button1}
            onPress={() => this.props.navigation.navigate("MovieList")}
          >
            <Text style={styles.textButton}>Ver Peliculas</Text>
          </Pressable>

          <Pressable
            style={styles.button1}
            onPress={() => this.props.navigation.navigate("AddMovie")}
          >
            <Text style={styles.textButton}>Añadir película</Text>
          </Pressable>

          <Pressable
            style={styles.button2}
            onPress={() => this.props.navigation.navigate("WebView")}
          >
            <Text style={styles.textButton}>Go to WebView</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  optionContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: '50%',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 200,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#80E9FE",
    margin: 5,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 200,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#5ECE00",
    margin: 5,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#000000",
  },
});

export default HomeScreen;
