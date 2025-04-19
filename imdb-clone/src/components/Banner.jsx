import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch movie data only once when component mounts
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/all/week?api_key=a3b9bdc877296a21b11fde551ef7989a'
        );
        const movieList = response.data.results.filter((item) => item.media_type === 'movie');
        setMovies(movieList.slice(0, 6));
      } catch (error) {
        console.error('Failed to load trending movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Carousel interval with proper dependency tracking
  useEffect(() => {
    // Only start the interval when we have movies loaded
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [movies.length]); // Only depends on movies.length, not the entire movies array

  // Manual navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  // Memoize the current movie to prevent unnecessary re-renders
  const currentMovie = useMemo(() => {
    return movies[currentIndex] || {};
  }, [movies, currentIndex]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[50vh] md:h-[91vh] bg-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading trending movies...</div>
      </div>
    );
  }

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="h-[50vh] md:h-[91vh] bg-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">No trending movies available</div>
      </div>
    );
  }

  return (
    <div className="relative h-[50vh] md:h-[91vh] overflow-hidden">
      {/* Background image with smooth transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`,
        }}
      >
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>

      {/* Movie information */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 text-white">
        <h1 className="text-2xl md:text-5xl font-bold mb-2">
          {currentMovie.title || currentMovie.name}
        </h1>
        
        {currentMovie.overview && (
          <p className="text-sm md:text-lg mb-4 max-w-2xl line-clamp-2 md:line-clamp-3">
            {currentMovie.overview}
          </p>
        )}
        
        {currentMovie.release_date && (
          <p className="text-gray-300 text-sm md:text-base">
            Release date: {new Date(currentMovie.release_date).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button 
          onClick={goToPrev}
          className="bg-black/30 hover:bg-black/50 text-white p-2 m-2 rounded-full transition-colors"
          aria-label="Previous movie"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button 
          onClick={goToNext}
          className="bg-black/30 hover:bg-black/50 text-white p-2 m-2 rounded-full transition-colors"
          aria-label="Next movie"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-0 w-full flex justify-center gap-2 p-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;