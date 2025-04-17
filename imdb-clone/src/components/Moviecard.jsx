import React from "react";

function Moviecard({ poster_path, name, onClick }) {
  return (
    <div
      onClick={onClick}
      className="h-[40vh] w-[160px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      <div>
        
      </div>
      <div className="text-white text-sm w-full p-2 text-center bg-gray-900/60 rounded-b-xl">
        {name}
      </div>
    </div>
  );
}

export default Moviecard;
