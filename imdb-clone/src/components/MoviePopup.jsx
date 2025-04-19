import React, { memo, useEffect, useMemo, useCallback } from "react";

// Move these outside the component to prevent recreation on each render
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const languageMap = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  ru: "Russian",
  zh: "Chinese",
  ta: "Tamil",
  te: "Telugu",
  da: "Danish",
};

// Separate memo'd components for better rendering performance
const MoviePoster = memo(({ poster_path, title, vote_average }) => {
  return (
    <div className="w-full h-48 sm:h-64 md:h-auto md:w-2/5 relative">
      {/* Right-end gradient overlay */}
      <div className="absolute inset-0 hidden md:block">
        <div className="w-1/3 h-full ml-auto bg-gradient-to-r from-transparent to-gray-900"></div>
      </div>

      <img
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt={title}
        className="h-full w-full object-cover object-center"
        loading="eager"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
        }}
      />

      {/* Rating badge (displayed on mobile view) */}
      {vote_average && (
        <div className="absolute top-4 left-4 md:hidden flex items-center bg-yellow-500 text-black font-bold rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {vote_average?.toFixed(1)}
        </div>
      )}
    </div>
  );
});


const MovieGenres = memo(({ genres }) => {
  if (!genres.length) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {genres.map(genre => (
        <span key={genre} className="bg-gray-800 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
          {genre}
        </span>
      ))}
    </div>
  );
});

const DesktopRating = memo(({ vote_average, vote_count }) => {
  if (!vote_average) return null;
  
  return (
    <div className="hidden md:flex items-center bg-transparent text-yellow-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {vote_average?.toFixed(1)}
      {vote_count && (
        <span className="text-xs text-gray-400 ml-1">({vote_count.toLocaleString()} votes)</span>
      )}
    </div>
  );
});

const MovieHeader = memo(({ title, year, rating, vote_average, vote_count, genres }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
      
      {/* Movie metadata */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold">{year}</span>
        <span className="bg-red-600 px-2 py-0.5 rounded text-white font-medium">{rating}</span>                
        <DesktopRating vote_average={vote_average} vote_count={vote_count} />
      </div>
      
      <MovieGenres genres={genres} />
    </div>
  );
});

// Main component optimized with memo
const MoviePopup = memo(function MoviePopup({ movie, onClose }) {
  if (!movie) return null;

  const {
    poster_path,
    title,
    release_date,
    overview,
    original_language,
    genre_ids,
    adult,
    vote_average,
    vote_count,
  } = movie;

  // Memoize calculated values
  const movieDetails = useMemo(() => {
    const year = release_date ? release_date.slice(0, 4) : "N/A";
    const rating = adult ? "R" : "PG";
    const language = languageMap[original_language] || original_language?.toUpperCase() || "N/A";
    const genres = Array.isArray(genre_ids) && genre_ids.length > 0
      ? genre_ids
          .map((id) => genreMap[id] || "Unknown")
          .filter((g) => g !== "Unknown")
      : [];
      
    return { year, rating, language, genres };
  }, [release_date, adult, original_language, genre_ids]);
  
  const { year, rating, language, genres } = movieDetails;

  // Memoize event handlers
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    // Lock body scroll
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      {/* Movie details card */}
      <div className="bg-gray-900 text-white rounded-xl overflow-hidden w-full max-w-4xl shadow-2xl transition-transform duration-300 transform animate-fadeIn relative">
        {/* Close button - Fixed position for better mobile access */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-colors shadow-lg"
          aria-label="Close movie details"
          style={{ touchAction: 'manipulation' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-hidden">
          {/* Left: Poster with gradient overlay */}
          <MoviePoster 
            poster_path={poster_path} 
            title={title} 
            vote_average={vote_average} 
          />

          {/* Right: Details area with scroll */}
          <div className="p-4 md:p-8 w-full md:w-3/5 flex flex-col overflow-y-auto custom-scrollbar">
            {/* Title and basic info */}
            <MovieHeader 
              title={title}
              year={year}
              rating={rating}
              vote_average={vote_average}
              vote_count={vote_count}
              genres={genres}
            />
            
            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                {overview || "No overview available."}
              </p>
            </div>
            
            {/* Additional info can be added here */}
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-400">Release Date:</span>
                <span className="text-white">{release_date || "Unknown"}</span>
                
                <span className="text-gray-400">Original Language:</span>
                <span className="text-white">{language}</span>
                
                <span className="text-gray-400">Content Rating:</span>
                <span className="text-white">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

export default MoviePopup;