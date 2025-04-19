import React, { useEffect, useState, useMemo } from "react";
import genreids from "../utility/genre";

// Extracted SVG components for better reusability
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EmptyListIcon = () => (
  <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
  </svg>
);

function WatchList({ watchlist, setWatchList, handleRemovefromWatchList }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const [sortOrder, setSortOrder] = useState(null);

  // Generate genre list once when watchlist changes
  useEffect(() => {
    const genres = new Set(watchlist.map(movie => genreids[movie.genre_ids?.[0]] || "Unknown"));
    setGenreList(["All Genres", ...Array.from(genres)]);
  }, [watchlist]);

  // Handle sort operations with stable sorting
  const handleSort = (direction) => {
    const sortedList = [...watchlist].sort((a, b) => {
      const ratingA = a.vote_average || a.vote_average || 0;
      const ratingB = b.vote_average || b.vote_average || 0;
      return direction === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
    
    setWatchList(sortedList);
    setSortOrder(direction);
  };

  // Memoize filtered movies to prevent recalculation on every render
  const filteredMovies = useMemo(() => {
    return watchlist
      .filter(movie => {
        // Genre filter
        if (currGenre === 'All Genres') return true;
        return genreids[movie.genre_ids?.[0]] === currGenre;
      })
      .filter(movie => {
        // Search filter
        if (!search) return true;
        return movie.title?.toLowerCase().includes(search.toLowerCase());
      });
  }, [watchlist, currGenre, search]);

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">My Watchlist</h1>
      
      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {genreList.map((genre) => (
          <button
            key={genre}
            onClick={() => setCurrGenre(genre)}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
              currGenre === genre
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900"
                : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search movies..."
            className="w-full h-12 px-5 pr-10 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md text-white placeholder-gray-400"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
        {watchlist.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-400 font-semibold">Movie</th>
                  <th className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleSort('desc')} 
                        className={`p-1 hover:bg-gray-700 rounded ${sortOrder === 'desc' ? 'bg-gray-700' : ''}`}
                        aria-label="Sort by highest rating"
                      >
                        <ArrowUpIcon />
                      </button>
                      <span className="font-semibold text-gray-400">Rating</span>
                      <button 
                        onClick={() => handleSort('asc')} 
                        className={`p-1 hover:bg-gray-700 rounded ${sortOrder === 'asc' ? 'bg-gray-700' : ''}`}
                        aria-label="Sort by lowest rating"
                      >
                        <ArrowDownIcon />
                      </button>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-gray-400 font-semibold">Popularity</th>
                  <th className="py-4 px-6 text-gray-400 font-semibold">Genre</th>
                  <th className="py-4 px-6 text-gray-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="h-24 w-16 flex-shrink-0 rounded-md overflow-hidden shadow-md">
                          <img
                            className="h-full w-full object-cover"
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : "https://via.placeholder.com/160x240?text=No+Image"}
                            alt={movie.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-white">{movie.title}</div>
                          <div className="text-sm text-gray-400">{movie.release_date?.substring(0, 4) || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900 text-green-400">
                        <StarIcon />
                        {movie.vote_average?.toFixed(1) || 'N/A'}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="text-sm">{movie.popularity?.toFixed(1) || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                        {genreids[movie.genre_ids?.[0]] || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleRemovefromWatchList(movie)}
                        className="text-red-400 hover:text-red-600 focus:outline-none font-medium text-sm inline-flex items-center transition-colors"
                        aria-label={`Remove ${movie.title} from watchlist`}
                      >
                        <TrashIcon />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <EmptyListIcon />
            <h3 className="mt-2 text-lg font-medium text-gray-300">No movies</h3>
            <p className="mt-1 text-sm text-gray-400">Your watchlist is empty. Start adding some movies!</p>
          </div>
        )}

        {/* No results state */}
        {watchlist.length > 0 && filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <EmptyListIcon />
            <h3 className="mt-2 text-lg font-medium text-gray-300">No matching movies</h3>
            <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;