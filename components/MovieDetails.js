import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { queryFromFirebase } from "../helpers/firebaseHelpers";

const MovieDetails = ({ route }) => {
  const [data, setData] = useState(null);
  const { name } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  getMovie = async () => {
    const docs = await queryFromFirebase("FavoritosNative", {
      dataQuery: {
        field: "titulo",
        operator: "==",
        value: name,
      },
    });
    setData(docs);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Iniciando Obtencion");
    console.log("Nombre recibido: " + name);
    getMovie();
    console.log("Obtencion Finalizada");
  }, [isLoading]);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  } else {
    if (data === null) {
      return (
        <View style={styles.container}>
          <Text>No Existe</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Detalles de la película:</Text>
          <View style={styles.movieCont}>
            <Text style={styles.movieTitle}>{data[0].data.titulo}</Text>
            <Text style={styles.movieData}>
              Director: {data[0].data.director}
            </Text>
            <Text style={styles.movieData}>Año: {data[0].data.year}</Text>
            <Text style={styles.movieData}>
              Productora: {data[0].data.productora}
            </Text>
            <Text style={styles.movieData}>Género: {data[0].data.genero}</Text>
            <Text style={styles.movieData}>
              Presupuesto: {data[0].data.presupuesto}
            </Text>
          </View>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  movieCont: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieData: {
    fontSize: 16,
    marginBottom: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MovieDetails;
