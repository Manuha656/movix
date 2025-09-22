import React from "react";

function MovieCard({ poster_path, name, handleaddWl, movieObj, handleremWl, wl }) {
  function doesContain(movieObj) {
    return wl.some((m) => m.id === movieObj.id);
  }

  return (
    <div
      className="
        relative 
        w-[200px] h-[300px] 
        sm:w-[180px] sm:h-[270px] 
        xs:w-[150px] xs:h-[230px] 
        rounded-2xl overflow-hidden 
        shadow-lg group cursor-pointer 
        mx-auto
      "
    >
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={name}
        className="w-full h-full object-cover transition duration-500 group-hover:blur-sm"
      />

      {/* Overlay with Title + Heart */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500">
        {/* Movie Name */}
        <h2 className="text-white text-sm sm:text-base font-bold text-center drop-shadow-lg mb-3 px-2">
          {name}
        </h2>

        {/* Heart Button */}
        {doesContain(movieObj) ? (
          <button
            onClick={() => handleremWl(movieObj)}
            className="text-2xl sm:text-3xl text-red-500 hover:scale-110 transition duration-300"
            title="Remove from Watchlist"
          >
            ❤️
          </button>
        ) : (
          <button
            onClick={() => handleaddWl(movieObj)}
            className="text-2xl sm:text-3xl text-gray-400 hover:text-pink-500 hover:scale-110 transition duration-300"
            title="Add to Watchlist"
          >
            ♡
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
