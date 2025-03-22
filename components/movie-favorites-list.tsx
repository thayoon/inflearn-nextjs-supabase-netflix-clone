"use client";

import { useQuery } from "@tanstack/react-query";
import { getFavoritesMovie } from "actions/movieActions";
import MovieCard from "./movie-card";
import { Spinner } from "@material-tailwind/react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

export default function MovieFavoritesList() {
  const moveRef = useRef(null);

  const scrollToAllMovies = () => {
    moveRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getFavoritesMovieQuery = useQuery({
    queryKey: ["favoritesMovieList"],
    queryFn: () => getFavoritesMovie(),
  });

  return (
    <div className="w-full">
      <h1 className="px-2 text-2xl font-bold">Your Favorite Movies💘</h1>
      {getFavoritesMovieQuery.isLoading ||
      !getFavoritesMovieQuery?.data.length ? (
        <>
          <div className="flex justify-center items-center pt-16 pb-8">
            <div className="flex flex-col items-center space-y-4">
              {getFavoritesMovieQuery.isLoading ? (
                <Spinner />
              ) : (
                <>
                  <p className="text-xl">좋아하는 영화를 추가해보세요.</p>
                  <button
                    onClick={scrollToAllMovies}
                    className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition duration-300"
                  >
                    <i className="fa fa-angle-double-down" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="p-8" ref={moveRef}></div>
        </>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 1 },
            320: { slidesPerView: 2 },
            540: { slidesPerView: 3 },
            720: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          className="relative"
        >
          <button className="custom-swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 disabled:opacity-0 disabled:cursor-auto transition duration-300 z-10">
            ◀
          </button>
          <button className="custom-swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 disabled:opacity-0 disabled:cursor-auto transition duration-300 z-10">
            ▶
          </button>
          {getFavoritesMovieQuery.data.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard movie={item.movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
