import React from "react";

function Moviecard({
  movieObj,
  poster_path,
  name,
  onClick,
  handleAddtoWatchList,
  handleRemovefromWatchList,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      onClick={onClick}
      className="h-[40vh] w-[160px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleRemovefromWatchList(movieObj);
          }}
          className="m-1 flex justify-center h-7 w-7 items-center rounded-lg bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddtoWatchList(movieObj);
          }}
          className="m-1 flex justify-center h-7 w-7 items-center rounded-lg bg-gray-900/60"
        >
          &#128147;
          </div>
      )}
      <div className="text-white text-sm w-full p-2 text-center bg-gray-900/30 rounded-b-xl">
        {name}
      </div>
    </div>
  );
}

export default Moviecard;
