import { apiClient } from "../../api/axios";

export const createBookingRequest = async (payload) => {
  const { data } = await apiClient.post("/bookings", payload);
  return data;
};

export const getBookingByIdRequest = async (bookingId) => {
  const { data } = await apiClient.get(`/bookings/${bookingId}`);
  return data;
};

export const getUserBookingsRequest = async (userId) => {
  const { data } = await apiClient.get(`/bookings/user/${userId}`);
  return data;
};

export const cancelBookingRequest = async (bookingId) => {
  const { data } = await apiClient.put(`/bookings/${bookingId}/cancel`);
  return data;
};
