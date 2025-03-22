"use client";

import MovieCard from "./movie-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { searchState } from "utils/recoil/atoms";
import { useRecoilValue } from "recoil";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search],
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, page_size: 12 }),
      getNextPageParam: (lastPage) =>
        lastPage.page ? lastPage.page + 1 : null,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div>
      <h1 className="px-2 text-2xl font-bold">🎬 Movies</h1>
      <div className="grid gap-1 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 w-full h-full">
        {
          <>
            {data?.pages
              ?.map((page) => page.data)
              ?.flat()
              ?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            <div ref={ref} className="w-full h-10"></div>
          </>
        }
        {(isFetching || isFetchingNextPage) && <Spinner />}
      </div>
    </div>
  );
}
