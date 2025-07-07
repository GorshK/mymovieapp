import React, { useContext } from 'react';
import { WatchlistContext } from '../App';
import MovieCard from '../components/MovieCard';
import '../styles/Watchlist.css';

function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;