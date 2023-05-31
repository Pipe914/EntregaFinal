import React, { createContext, useState } from 'react';

// Crea un contexto
const MovieContext = createContext();

// Crea un componente proveedor para el contexto
const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  // Función para agregar una nueva película al contexto
  const getMovies = (movie) => {
    setMovies([...movies, movie]);
  };

  // Retorna el contexto y el componente proveedor
  return (
    <MovieContext.Provider value={{ movies, getMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
