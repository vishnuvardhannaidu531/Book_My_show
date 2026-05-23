import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_8%,rgba(229,9,20,0.24),transparent_28rem),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.18),transparent_30rem),linear-gradient(135deg,#10172a_0%,#171225_48%,#090b16_100%)] text-ink">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
