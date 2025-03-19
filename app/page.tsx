import type { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "TMDBFLIX",
  description: "Netflix clone using TMDB API",
};

export default function Home() {
  return <UI />;
}
