import React from "react";
import List from "./List";

const movies = {
  upcoming: {
    apiCall: "upcoming",
    header: "Em Breve"
  },
  romance: {
    apiCall: 53,
    header: "Filmes de Ação"
  },
  topRated: {
    apiCall: "top_rated",
    header: "Mais indicados"
  },
  action: {
    apiCall: 28,
    header: "Ação"
  },
  adventure: {
    apiCall: 12,
    header: "Aventura"
  },
  animation: {
    apiCall: 16,
    header: "Animação"
  },
  comedy: {
    apiCall: 35,
    header: "Comédia"
  },
  crime: {
    apiCall: 80,
    header: "Criminal"
  },
  mystery: {
    apiCall: 878,
    header: "Ficção Científica"
  },
  horror: {
    apiCall: 27,
    header: "Terror"
  },
  documentary: {
    apiCall: 99,
    header: "Documentario"
  }
};

export default function ListsOfMovies () {
  return (
    <div>
      {Object.keys(movies).map((item, i) => (
        <div key={i}>
          <List heading={movies[item].header} apiCall={movies[item].apiCall} />
        </div>
      ))}
    </div>
  );
};
