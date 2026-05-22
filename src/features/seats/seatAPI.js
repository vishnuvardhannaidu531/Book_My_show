import { apiClient } from "../../api/axios";

export const getSeatMapRequest = async (showId) => {
  const { data } = await apiClient.get(`/shows/${showId}`);
  return data;
};

export const lockSeatsRequest = async ({ showId, seatIds }) => {
  const { data } = await apiClient.post("/seats/lock", { showId, seatIds });
  return data;
};
