import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
