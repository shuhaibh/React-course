import React, { memo } from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  onClick,
  handleAddtoWatchList,
  handleRemovefromWatchList,
  watchlist,
}) {
  // Function to check if movie is in watchlist
  const isInWatchlist = React.useMemo(() => {
    return watchlist.some(movie => movie.id === movieObj.id);
  }, [watchlist, movieObj.id]);

  return (
    <div
      className="relative h-80 w-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group"
    >
      {/* Poster Image */}
      <div 
        onClick={onClick}
        className="absolute inset-0 bg-center bg-cover h-full w-full cursor-pointer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Movie Title - Shows at bottom by default */}
      <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-medium truncate">{name}</h3>
      </div>

      {/* Heart Button with Tooltip - Always visible at top right */}
      <div className="absolute top-2 right-2 z-20">
        <div className="relative group/tooltip">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isInWatchlist 
                ? handleRemovefromWatchList(movieObj) 
                : handleAddtoWatchList(movieObj);
            }}
            className={`h-9 w-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm ${
              isInWatchlist 
                ? "bg-red-500/80 hover:bg-red-600" 
                : "bg-gray-800/70 hover:bg-gray-900/90"
            }`}
            aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Tooltip that appears on hover */}
          <div className="absolute right-0 top-10 w-36 bg-gray-900 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none">
            {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Rating Badge */}
      {movieObj.vote_average && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-xs font-bold text-white px-2 py-1 rounded-full flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {movieObj.vote_average?.toFixed(1)}
        </div>
      )}

      {/* Hover overlay with "Click for details" message */}
      <div 
        onClick={onClick}
        className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 cursor-pointer"
      >
        <h3 className="text-white font-bold text-lg mb-1 text-center">{name}</h3>
        {movieObj.release_date && (
          <p className="text-gray-300 text-sm mb-4">{new Date(movieObj.release_date).getFullYear()}</p>
        )}
        
        {/* View Details Indicator */}
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p className="text-white text-sm font-medium">Click for details</p>
        </div>
      </div>
    </div>
  );
}

// Custom comparison function for memo
function areEqual(prevProps, nextProps) {
  // Check if watchlist status changed
  const prevInWatchlist = prevProps.watchlist.some(movie => movie.id === prevProps.movieObj.id);
  const nextInWatchlist = nextProps.watchlist.some(movie => movie.id === nextProps.movieObj.id);
  
  return (
    prevProps.movieObj.id === nextProps.movieObj.id &&
    prevProps.poster_path === nextProps.poster_path &&
    prevProps.name === nextProps.name &&
    prevInWatchlist === nextInWatchlist
  );
}

// Export memoized component
export default MovieCard;