import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api.js';

function App() {

  const [movies, setMovies] = useState([]);

  async function handleAddRepository() {

    const response = await api.post('movies', {

      title: "Como montar um painel",
      description: "Neste vídeo você irá aprender como montar um painel.",
      tags : ["automacao", "painel", "montar"],
      time : 1800,
      default_image : "amazon.com.br/tananan",
      file : "amazon.com.br/tananan"
    });

    const movie = response.data;
    setMovies([...movies, movie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`movies/${id}`);

    setMovies(movies.filter(movie => movie.id !== id));      
    
  }

  useEffect(() => {
    api.get('movies').then(response => {
    setMovies(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        
        {movies.map(movie => 
        <li key={movie.id}>{movie.title}
          <button onClick={() => handleRemoveRepository(movie.id)}>
            Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
