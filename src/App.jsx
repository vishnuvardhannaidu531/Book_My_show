import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { markUnauthorized } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnauthorized = () => dispatch(markUnauthorized());
    window.addEventListener("movieverse:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("movieverse:unauthorized", handleUnauthorized);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </BrowserRouter>
  );
}
