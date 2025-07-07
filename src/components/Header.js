import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { WatchlistContext } from '../App';
import '../styles/Header.css';

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { watchlist } = useContext(WatchlistContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      navigate('/search');
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <nav className="header">
      <div className="logo">My MovieApp</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse</Link></li>
        <li>
          <button onClick={toggleSearch} aria-label="Toggle search">Search</button>
          {isSearchOpen && (
            <div className="search-container" ref={searchRef}>
              <div className="search-bar">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for movies..."
                  aria-label="Search movies"
                />
                <button onClick={handleSearch} aria-label="Search movies">Search</button>
              </div>
              {searchResults.length === 0 && searchQuery.trim() ? (
                <div className="search-results">
                  <p>No results found for "{searchQuery}".</p>
                </div>
              ) : (
                searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </li>
        <li><Link to="/watchlist">Watchlist ({watchlist.length})</Link></li>
      </ul>
    </nav>
  );
}

export default Header;