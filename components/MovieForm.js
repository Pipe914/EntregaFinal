import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addToFirebase } from '../helpers/firebaseHelpers.js';

const AddMovieForm = () => {
  const [titulo, setTitulo] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [productora, setProductora] = useState('');
  const [genero, setGenero] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const addFavorite = async () => {
    addToFirebase(
      {
        objectToSave: {
          titulo: titulo,
          director: director,
          year: year,
          productora: productora,
          genero: genero,
          presupuesto: presupuesto,
        },
      },
      "FavoritosNative"
    );
    alert("Agregado a favoritos");
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    addFavorite();

    // Limpiar los campos del formulario después de agregar la película
    setTitulo('');
    setDirector('');
    setYear('');
    setProductora('');
    setGenero('');
    setPresupuesto('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar película</Text>
      <TextInput style={styles.input}
        placeholder="Título de la película"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput style={styles.input}
        placeholder="Director de la película"
        value={director}
        onChangeText={setDirector}
      />
      <TextInput style={styles.input}
        placeholder="Año de la película"
        value={year}
        onChangeText={setYear}
        inputMode="numeric"
      />
      <TextInput style={styles.input}
        placeholder="Productora de la película"
        value={productora}
        onChangeText={setProductora}
      />
      <TextInput style={styles.input}
        placeholder="Genero de la película"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput style={styles.input}
        placeholder="Presupuesto de la película"
        value={presupuesto}
        onChangeText={setPresupuesto}
        inputMode="numeric"
      />
      <Button title="Agregar película" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
  },
});

export default AddMovieForm;
