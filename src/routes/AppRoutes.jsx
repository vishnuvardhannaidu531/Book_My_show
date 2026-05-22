import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const MovieDetails = lazy(() => import("../pages/MovieDetails.jsx"));
const SeatSelection = lazy(() => import("../pages/SeatSelection.jsx"));
const PaymentPage = lazy(() => import("../pages/PaymentPage.jsx"));
const BookingHistory = lazy(() => import("../pages/BookingHistory.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

function RouteFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/shows/:showId/seats" element={<SeatSelection />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/bookings" element={<BookingHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
