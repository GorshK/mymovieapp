import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import '../styles/Home.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
      setFeaturedMovie(movies[0]); // Set the first movie as featured
    };
    loadTrending();
  }, []);

  return (
    <div className="home">
      {featuredMovie && (
        <div className="featured">
          <img
            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title}
          />
          <div className="featured-info">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
          </div>
        </div>
      )}
      <h2>Trending Movies</h2>
      <div className="movie-grid">
        {trendingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;