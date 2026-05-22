import { apiClient } from "../../api/axios";

export const createOrderRequest = async (bookingId) => {
  const { data } = await apiClient.post(`/payments/create-order/${bookingId}`);
  return data;
};

export const verifyPaymentRequest = async (payload) => {
  const body = new URLSearchParams(payload);
  const { data } = await apiClient.post("/payments/verify", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
};

export const markPaymentFailedRequest = async (payload) => {
  const body = new URLSearchParams(payload);
  const { data } = await apiClient.post("/payments/failed", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return data;
};
