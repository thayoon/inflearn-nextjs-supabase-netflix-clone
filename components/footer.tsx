"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="z-50 fixed text-center text-white font-bold bottom-0 left-0 right-0 p-2 bg-gray-900">
      <p>
        Movie Database from{" "}
        <Link className="text-blue-600" href={"https://www.themoviedb.org/"}>
          TMDB
        </Link>
      </p>
    </footer>
  );
}
