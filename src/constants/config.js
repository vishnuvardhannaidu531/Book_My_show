const REMOTE_API_BASE_URL = "https://movieverse-a5qk.onrender.com/api";
const REMOTE_AUTH_BASE_URL = "https://movieverse-a5qk.onrender.com/auth";
const LOCAL_PROXY_API_BASE_URL = "http://127.0.0.1:8081/api";
const LOCAL_PROXY_AUTH_BASE_URL = "http://127.0.0.1:8081/auth";
const VERCEL_PROXY_API_BASE_URL = "/api";
const VERCEL_PROXY_AUTH_BASE_URL = "/auth";

const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");
const ensureTrailingSlash = (value = "") => `${trimTrailingSlash(value)}/`;

const buildBaseUrl = (directUrl, proxyUrl) => {
  if (!proxyUrl) return directUrl;
  return `${ensureTrailingSlash(proxyUrl)}${directUrl}`;
};

const API_DIRECT_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? LOCAL_PROXY_API_BASE_URL : VERCEL_PROXY_API_BASE_URL);
const AUTH_DIRECT_URL = import.meta.env.VITE_AUTH_BASE_URL || (import.meta.env.DEV ? LOCAL_PROXY_AUTH_BASE_URL : VERCEL_PROXY_AUTH_BASE_URL);
const CORS_PROXY_URL = import.meta.env.VITE_CORS_PROXY_URL || "";

export const API_BASE_URL = buildBaseUrl(API_DIRECT_URL, CORS_PROXY_URL);
export const AUTH_BASE_URL = buildBaseUrl(AUTH_DIRECT_URL, CORS_PROXY_URL);
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RMkfBppoSrV47i";

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  movies: "/movies",
  movieDetails: "/movies/:movieId",
  seats: "/shows/:showId/seats",
  payment: "/payment",
  bookings: "/bookings",
  profile: "/profile",
};
