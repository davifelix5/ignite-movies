import { MovieCard } from "./MovieCard";
import { Header } from "./Header";

import { useEffect, useState } from "react";
import { api } from "../services/api";

interface ContentProps {
  selectedGenreId: Number
}

interface GenreResponse {
  title: string;
}

interface MovieResponse {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({
  selectedGenreId
}: ContentProps) {

  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [genreTitle, setGenreTitle] = useState('')

  useEffect(() => {
    api.get<MovieResponse[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
    api.get<GenreResponse>(`genres/${selectedGenreId}`).then(response => {
      setGenreTitle(response.data.title)
    });
  }, [selectedGenreId])

  return (
    <div className="container">
      <Header>
        <span className="category">Categoria:<span> {genreTitle}</span></span>
      </Header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
  </div>
  )
}