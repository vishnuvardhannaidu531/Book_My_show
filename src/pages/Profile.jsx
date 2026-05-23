import { motion } from "framer-motion";
import { UserCircle, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuthUser } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";
import Button from "../components/ui/Button";

const MotionDiv = motion.div;

export default function Profile() {
  usePageTitle("Profile");
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-card-hover backdrop-blur-xl"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand/30 to-brandSoft/30 border border-brand/50 flex items-center justify-center shadow-glow-lg">
              <UserCircle className="h-16 w-16 text-brand" />
            </div>
          </MotionDiv>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black text-white mb-2">
              {user?.username || "MovieVerse User"}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-zinc-400 mb-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>Verified Account</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 border border-white/10">
                <Clock className="h-4 w-4 text-brand" />
                <span>Active Member</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/bookings")} className="gap-2">
              My Bookings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </MotionDiv>

      {/* Account Details */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Account Info */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-panel to-panelSoft p-6 space-y-6">
          <h2 className="text-xl font-black text-white">Account Information</h2>

          <div className="space-y-4">
            {/* Username */}
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-zinc-400 font-semibold mb-1 uppercase">Username</p>
              <p className="text-lg font-bold text-white">{user?.username || "Not provided"}</p>
            </div>

            {/* User ID */}
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-zinc-400 font-semibold mb-1 uppercase">User ID</p>
              <p className="text-sm font-mono text-zinc-300 break-all">{user?.id || "Unavailable"}</p>
            </div>

            {/* Email */}
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-4 w-4 text-brand" />
                <p className="text-xs text-zinc-400 font-semibold uppercase">Email</p>
              </div>
              <p className="text-lg font-bold text-white">{user?.email || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-panel to-panelSoft p-6 space-y-6">
          <h2 className="text-xl font-black text-white">Account Stats</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Bookings */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="text-3xl font-black text-brand mb-1">0</p>
              <p className="text-xs text-zinc-400">Total Bookings</p>
            </MotionDiv>

            {/* Spent */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-4 text-center"
            >
              <p className="text-3xl font-black text-brand mb-1">$0</p>
              <p className="text-xs text-zinc-400">Total Spent</p>
            </MotionDiv>

            {/* Member Since */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-4 text-center col-span-2"
            >
              <p className="text-sm font-bold text-white mb-1">Premium Member</p>
              <p className="text-xs text-zinc-400">Enjoy exclusive benefits</p>
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>

      {/* Quick Actions */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-r from-brand/10 to-brandSoft/10 p-8 text-center"
      >
        <h2 className="text-2xl font-black text-white mb-4">Ready to Book?</h2>
        <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
          Explore our collection of movies and book your favorite shows now
        </p>
        <Button onClick={() => navigate("/movies")} className="gap-2 mx-auto">
          Browse Movies
          <ArrowRight className="h-4 w-4" />
        </Button>
      </MotionDiv>
    </div>
  );
}
