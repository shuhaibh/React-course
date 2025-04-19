import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MoviePopup from "./MoviePopup";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({
  handleAddtoWatchList,
  handleRemovefromWatchList,
  watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("popular");

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      const trendingSection = document.getElementById('movies-section');
      if (trendingSection) {
        trendingSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }; // Added missing closing bracket here
  
  const handleNext = () => {
    setPageNo(pageNo + 1);
    const trendingSection = document.getElementById('movies-section');
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: "smooth" });
    }
  }; // Added missing closing bracket here

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=a3b9bdc877296a21b11fde551ef7989a&language=en-US&page=${pageNo}`
      );
      setMovies(response.data.results);
      setError(null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [pageNo, category]);

  const categoryLabels = {
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    now_playing: "Now Playing",
  };

  return (
    <div id='movies-section' className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-white">
            {categoryLabels[category]}
          </h1>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.keys(categoryLabels).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPageNo(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-center p-8 bg-red-900/20 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-red-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-lg font-medium text-red-500">{error}</p>
            <button
              onClick={fetchMovies}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Movie grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieObj={movie}
                  poster_path={movie.poster_path}
                  name={movie.original_title}
                  onClick={() => setSelectedMovie(movie)}
                  handleAddtoWatchList={handleAddtoWatchList}
                  handleRemovefromWatchList={handleRemovefromWatchList}
                  watchlist={watchlist}
                />
              ))}
            </div>

            {/* Empty state */}
            {movies.length === 0 && !loading && (
              <div className="text-center py-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 4v16M17 4v16M3 8h18M3 16h18"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-300">
                  No movies found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try changing the category or check back later
                </p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && !error && movies.length > 0 && (
          <div className="mt-10">
            <Pagination
              pageNo={pageNo}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        )}
      </div>

      {/* Movie popup */}
      {selectedMovie && (
        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Movies;
