"use client";

import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { searchState } from "utils/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const searchMoviesQuery = useQuery({
    queryKey: ["movie", search],
    queryFn: () => searchMovies(search),
  });
  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {searchMoviesQuery.isLoading && <Spinner />}
      {searchMoviesQuery.data &&
        searchMoviesQuery.data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}
