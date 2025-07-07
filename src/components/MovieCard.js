import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../App';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <button onClick={handleWatchlistToggle}>
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
}

export default MovieCard;