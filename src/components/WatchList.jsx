import React, { useEffect, useRef, useState } from "react";
import genreids from "../Utility/genre";

function WatchList({ wl, setWl, handleremWl }) {
  const [search, setSearch] = useState("");
  const [genrelist, setGl] = useState(["All Genres"]);
  const [curG, setCg] = useState("All Genres");
  const [showArrows, setShowArrows] = useState(false);
  const genreRef = useRef();

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (genre) => setCg(genre);

  const sortInc = () => {
    let sortedInc = wl.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWl([...sortedInc]);
  };

  const sortDec = () => {
    let sortedDec = wl.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWl([...sortedDec]);
  };

  const scrollLeft = () => {
    genreRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    genreRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    let temp = wl.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGl(["All Genres", ...temp]);
  }, [wl]);

  // Check if genres overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (genreRef.current) {
        setShowArrows(
          genreRef.current.scrollWidth > genreRef.current.clientWidth
        );
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [genrelist]);

  return (
    <div className="p-6">
      {/* Genre Filter with Arrows */}
      <div className="relative flex items-center mb-6">
        {showArrows && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}

        <div
          ref={genreRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-10 py-2 w-full"
        >
          {genrelist.map((genre) => (
            <button
              key={genre}
              onClick={() => handleFilter(genre)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                curG === genre
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-300 text-gray-700 hover:bg-blue-200"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {showArrows && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search movies"
          className="h-[3rem] w-[18rem] px-4 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Movies Table */}
      <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md m-8">
        <table className="w-full text-gray-700 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3 flex justify-center items-center space-x-2">
                <span
                  onClick={sortInc}
                  className="hover:cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </span>
                <span>Ratings</span>
                <span
                  onClick={sortDec}
                  className="hover:cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </span>
              </th>
              <th className="p-3">Popularity</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wl
              .filter((movieObj) => {
                if (curG === "All Genres") return true;
                return genreids[movieObj.genre_ids[0]] === curG;
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => (
                <tr
                  className="border-b hover:bg-gray-50 transition"
                  key={movieObj.id}
                >
                  <td className="flex items-center px-5 py-5">
                    <img
                      className="h-[6rem] w-[10rem] rounded-lg object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      alt={movieObj.title}
                    />
                    <div className="mx-5 font-semibold">{movieObj.title}</div>
                  </td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{genreids[movieObj.genre_ids[0]]}</td>
                  <td
                    onClick={() => handleremWl(movieObj)}
                    className="text-red-600 hover:text-red-800 font-bold hover:cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
