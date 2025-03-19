"use client";
export default function UI({ movie }) {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <img src={movie.image_url} alt={movie.title} className="w-1/3" />
      <div className="md:w-2/3 w-full flex items-center md:items-start flex-col p-6 gap-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="text-lg font-medium">{movie.overview}</p>
        <div className="text-lg font-bold">
          <i className="fas fa-star mr-1" />
          Vote Average: {movie.vote_average}
        </div>
        <div className="text-lg font-bold">Popularity: {movie.popularity}</div>
        <div className="text-lg font-bold">
          Release Date: {movie.release_date}
        </div>
      </div>
    </div>
  );
}
