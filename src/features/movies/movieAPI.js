import { apiClient } from "../../api/axios";

export const getMoviesRequest = async () => {
  const { data } = await apiClient.get("/movies");
  return data;
};

export const getMovieByIdRequest = async (movieId) => {
  const { data } = await apiClient.get(`/movies/${movieId}`);
  return data;
};
