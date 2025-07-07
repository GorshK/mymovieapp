import React, { useState, useEffect } from 'react';
import { fetchMoviesByCategory } from '../services/api';
import MovieCard from '../components/MovieCard';
import '../styles/Browse.css';

function Browse() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      setPopularMovies(await fetchMoviesByCategory('popular'));
      setTopRatedMovies(await fetchMoviesByCategory('top_rated'));
    };
    loadMovies();
  }, []);

  return (
    <div className="browse">
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <h2>Top Rated Movies</h2>
      <div className="movie-grid">
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Browse;