"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search = "", page, page_size }) {
  const supabase = await createServerSupabaseClient();

  // const { data, count, error } = await supabase
  //   .from("movie")
  //   .select("*")
  //   .like("title", `%${search}%`)
  //   .range((page - 1) * pageSize, page * pageSize - 1);

  const { data, error } = await supabase.rpc("get_movies_with_favorites", {
    search,
    page,
    page_size,
  });

  if (error) {
    handleError(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return {
    data,
    page,
    page_size,
  };
}

export async function getMovie(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}

export async function getFavoritesMovie() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("favorites")
    .select(`*, movie!favorites_movie_id_fkey(*)`)
    .order("created_at", { ascending: false });

  if (error) {
    handleError(error);
  }

  return data.map((item) => ({
    ...item,
    movie: {
      ...item.movie,
      favorite: true,
    },
  }));
}

export async function insertFavorite(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("favorites").insert({
    created_at: new Date().toISOString(),
    movie_id: id,
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function deleteFavorite(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("movie_id", id);

  if (error) {
    handleError(error);
  }

  return data;
}
