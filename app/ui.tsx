"use client";

import MovieCardList from "components/movie-card-list";
import MovieFavoritesList from "components/movie-favorites-list";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";
import { useState, useEffect } from "react";

export default function UI() {
  const search = useRecoilValue(searchState);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mt-16">
      {search == "" && <MovieFavoritesList />}
      <MovieCardList />
      {showButton && (
        <button
          onClick={scrollToTop}
          className="z-50 fixed mb-3 bottom-10 right-10 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-900 transition-opacity duration-300 animate-slideUp"
        >
          <i className="fa fa-chevron-up" />
        </button>
      )}
    </main>
  );
}
