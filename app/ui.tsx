"use client";

import MovieCardList from "components/movie-card-list";
import MovieFavoritesList from "components/movie-favorites-list";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";
export default function UI() {
  const search = useRecoilValue(searchState);
  return (
    <main className="mt-16">
      {search == "" && <MovieFavoritesList />}
      <MovieCardList />
    </main>
  );
}
