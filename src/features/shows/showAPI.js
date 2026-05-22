import { apiClient } from "../../api/axios";

export const getShowsByMovieRequest = async (movieId) => {
  const { data } = await apiClient.get(`/shows/movie/${movieId}`);
  return data;
};

export const getShowsByMovieAndCityRequest = async ({ movieId, city }) => {
  const { data } = await apiClient.get(`/shows/movie/${movieId}/city/${city}`);
  return data;
};

export const getShowByIdRequest = async (showId) => {
  const { data } = await apiClient.get(`/shows/${showId}`);
  return data;
};
