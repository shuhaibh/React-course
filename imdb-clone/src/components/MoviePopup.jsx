import React from "react";

// Optional: Map genre IDs to names
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

// Optional: map language codes to capitalized names
const languageMap = {
  en: "ENGLISH",
  hi: "HINDI",
  es: "SPANISH",
  fr: "FRENCH",
  de: "GERMAN",
  it: "ITALIAN",
  ja: "JAPANESE",
  ko: "KOREAN",
  ru: "RUSSIAN",
  zh: "CHINESE",
  ta: "TAMIL",
  te: "TELUNGU",
  da: "DANISH"
  // add more as desired
};

function MoviePopup({ movie, onClose }) {
  if (!movie) return null;

  // Extract fields
  const {
    poster_path,
    title,
    release_date,
    overview,
    original_language,
    genre_ids,
    adult,
  } = movie;

  // Format details
  const year = release_date ? release_date.slice(0, 4) : "N/A";
  const rating = adult ? "R" : "PG";
  const language = languageMap[original_language] || original_language?.toUpperCase() || "N/A";
  const genres =
    Array.isArray(genre_ids) && genre_ids.length > 0
      ? genre_ids
          .map((id) => genreMap[id] || "Unknown")
          .filter((g) => g !== "Unknown")
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      {/* Outer container for the card */}
      <div className="bg-black text-white rounded-xl overflow-hidden w-[90%] max-w-[900px] flex flex-col md:flex-row relative shadow-2xl">
        {/* Left: Poster (fixed width or a narrower percentage) */}
        <div className="w-full md:w-[40%] bg-white">
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: Details area */}
        <div className="p-6 w-full md:w-[60%] flex flex-col justify-between bg-black">
          {/* Top section */}
          <div>
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            {/* Row with Year, Rating, Language */}
            <div className="flex items-center space-x-4 text-sm md:text-base mb-2">
              <span className="font-semibold">{year}</span>
              <span className="bg-gray-700 px-2 py-1 rounded-md text-sm uppercase">{rating}</span>
              <span className="font-semibold">{language}</span>
            </div>
            {/* Genres in smaller, colored text */}
            {genres.length > 0 && (
              <p className="text-blue-400 text-sm md:text-base mb-4">
                {genres.join(", ")}
              </p>
            )}
            {/* Overview heading */}
            <h3 className="text-lg md:text-xl font-semibold underline mb-1">
              Overview
            </h3>
            <p className="text-gray-300 text-sm md:text-base">{overview}</p>
          </div>

          {/* Bottom-centered Close button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition text-sm md:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePopup;
