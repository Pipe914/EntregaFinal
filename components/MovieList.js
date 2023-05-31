import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MovieContext } from "../contexts/MovieContexts.js";
import {
  queryFromFirebase,
  getFromFirebase,
} from "../helpers/firebaseHelpers.js";

const MovieList = ({ navigation }) => {
  const [favorites, setFavorites] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getFavoritos = async () => {
    const docs = await getFromFirebase("FavoritosNative");
    setFavorites(docs);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Iniciando Obtencion");
    getFavoritos();
    console.log("Obtencion Finalizada");
  }, [isLoading]);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  } else {
    if (favorites === null) {
      return (
        <View style={styles.container}>
          <Text>No tienes favoritos</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Mis Películas:</Text>
          {favorites.map((favorite) => (
            <Pressable
              style={styles.movieCont}
              key={favorite.id}
              onPress={() => {
                console.log("Nombre Enviado: " + favorite.titulo);
                navigation.navigate("MovieDetails", { name: favorite.titulo });
              }}
            >
              <Text style={styles.movieTitle}>{favorite.titulo}</Text>
              <Text style={styles.movieData}>{favorite.year}</Text>
            </Pressable>
          ))}
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  movieCont: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  movieData: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default MovieList;
