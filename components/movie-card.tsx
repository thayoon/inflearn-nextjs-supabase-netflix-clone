"use client";

import Link from "next/link";
import { IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteFavorite, insertFavorite } from "actions/movieActions";
import { queryClient } from "config/ReactQueryClientProvider";

export default function MovieCard({ movie }) {
  const insertFavoriteMutaion = useMutation({
    mutationFn: () => insertFavorite(movie.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoritesMovieList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["movie"],
      });
    },
  });
  const deleteFavoriteMutaion = useMutation({
    mutationFn: () => deleteFavorite(movie.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoritesMovieList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["movie"],
      });
    },
  });

  async function handleClick(favorite: boolean) {
    if (favorite) {
      await insertFavoriteMutaion.mutate();
    } else {
      await deleteFavoriteMutaion.mutate();
    }
  }

  return (
    <div className="col-span-1 relative">
      {/* 이미지 내부 */}
      <img src={movie.image_url} alt={movie.title} className="w-full" />
      {/* 찜하기 버튼 */}
      <div
        className={`z-30 absolute top-2 right-2 rounded-full bg-gray-900/20 hover:bg-gray-900 transition duration-300`}
      >
        <IconButton
          variant="text"
          className="rounded-full"
          onClick={() => {
            handleClick(!movie.favorite);
          }}
        >
          {insertFavoriteMutaion.isPending ||
          deleteFavoriteMutaion.isPending ? (
            <Spinner />
          ) : (
            <i
              className={`fas fa-heart text-2xl ${
                movie.favorite ? "text-red-800" : "text-white"
              }`}
            />
          )}
        </IconButton>
      </div>
      {/* Title Dim */}
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
          <p className="text-xl font-bold text-white text-center">
            {movie.title}
          </p>
        </div>
      </Link>
    </div>
  );
}
