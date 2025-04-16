import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import MoviePopup from "./MoviePopup";
import axios from "axios";
import Pagination from "./Pagination";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePrev = () => {
    if (pageNo === 1) {
      return;
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a3b9bdc877296a21b11fde551ef7989a&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
        console.log(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Trending Movies
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {movies.map((movie) => (
          <Moviecard
            key={movie.id}
            poster_path={movie.poster_path}
            name={movie.original_title}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />

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
