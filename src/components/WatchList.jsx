import React, { useEffect, useRef, useState } from "react";
import genreids from "../Utility/genre";

function WatchList({ wl, setWl, handleremWl }) {
  const [search, setSearch] = useState("");
  const [genrelist, setGl] = useState(["All Genres"]);
  const [curG, setCg] = useState("All Genres");
  const genreRef = useRef();

  useEffect(() => {
    let temp = wl.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    temp = new Set(temp);
    setGl(["All Genres", ...temp]);
  }, [wl]);

  const handleFilter = (genre) => setCg(genre);

  const sortInc = () => {
    let sorted = [...wl].sort((a, b) => a.vote_average - b.vote_average);
    setWl(sorted);
  };

  const sortDec = () => {
    let sorted = [...wl].sort((a, b) => b.vote_average - a.vote_average);
    setWl(sorted);
  };

  let filteredMovies = wl.filter((movieObj) => {
    return (
      (curG === "All Genres" ||
        genreids[movieObj.genre_ids[0]] === curG) &&
      movieObj.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      {/* Search & Genre Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your watchlist..."
          className="px-4 py-2 rounded-xl border w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <select
          ref={genreRef}
          value={curG}
          onChange={(e) => handleFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {genrelist.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Empty Watchlist */}
      {wl.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
          <span className="text-6xl mb-4">🎬</span>
          <h2 className="text-xl font-semibold mb-2">
            Your Watchlist is Empty
          </h2>
          <p className="mb-4 text-gray-400">
            Start adding movies to keep track of what you want to watch!
          </p>
          <a
            href="/"
            className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-xl shadow-md hover:scale-105 transition"
          >
            Explore Movies
          </a>
        </div>
      ) : filteredMovies.length === 0 ? (
        // Search not found
        <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-500">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="text-lg font-semibold mb-2">No Movies Found</h2>
          <p className="mb-4 text-gray-400">
            Try changing your search or filter.
          </p>
          <button
            onClick={() => setSearch("")}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-md hover:scale-105 transition"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <>
          {/* Table for desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Poster</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Genre</th>
                  <th className="p-3 text-left flex items-center gap-2">
                    Rating
                    <button
                      onClick={sortInc}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-arrow-up"></i>
                    </button>
                    <button
                      onClick={sortDec}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <i className="fa-solid fa-arrow-down"></i>
                    </button>
                  </th>
                  <th className="p-3 text-left">Popularity</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3 font-medium">{movie.title}</td>
                    <td className="p-3">{genreids[movie.genre_ids[0]]}</td>
                    <td className="p-3">{movie.vote_average}</td>
                    <td className="p-3">{movie.popularity.toFixed(0)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleremWl(movie)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stacked cards for mobile */}
          <div className="sm:hidden flex flex-col gap-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {genreids[movie.genre_ids[0]]}
                  </p>
                  <p className="text-sm mb-1">
                    ⭐ Rating: {movie.vote_average}
                  </p>
                  <p className="text-sm mb-3">
                    🔥 Popularity: {movie.popularity.toFixed(0)}
                  </p>
                  <button
                    onClick={() => handleremWl(movie)}
                    className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WatchList;
