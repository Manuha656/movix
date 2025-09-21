import React, { useState, useEffect } from "react";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

const images = [
  {
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", // Avengers: Endgame
    title: "Avengers: Endgame",
  },
  {
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
    title: "The Dark Knight",
  },
  {
    poster_path: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // The Godfather
    title: "The Godfather",
  },
  {
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", // The Shawshank Redemption
    title: "The Shawshank Redemption",
  },
  {
    poster_path: "/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg", // Pulp Fiction
    title: "Pulp Fiction",
  },
];

function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative h-[75vh] overflow-hidden bg-black">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${baseImageUrl}${img.poster_path})`,
            }}
          >
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

          {/* Title */}
          {i === index && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center text-white drop-shadow-lg">
              <h1 className="text-2xl font-bold">{img.title}</h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Banner;
