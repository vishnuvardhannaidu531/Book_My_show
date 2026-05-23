import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { loginUser } from "../features/auth/authSlice";
import { selectAuthLoading } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

const MotionDiv = motion.div;
const MotionForm = motion.form;

export default function Login() {
  usePageTitle("Login");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful! Welcome back.");

      navigate(location.state?.from?.pathname || "/movies", {
        replace: true,
      });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Blur Effects */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-amber-400/12 blur-3xl" />

      <div className="pointer-events-none absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-white/7 blur-3xl" />

      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-card-hover backdrop-blur-2xl">
          <MotionForm
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-black text-white">Login</h1>

              <p className="mt-2 text-sm text-zinc-400">
                Access your account and manage bookings
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Username
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" />

                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:border-brand focus:bg-white/15 focus:outline-none"
                  />
                </div>
              </MotionDiv>

              {/* Email */}
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Email
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:border-brand focus:bg-white/15 focus:outline-none"
                  />
                </div>
              </MotionDiv>

              {/* Password */}
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="mb-2 block text-sm font-semibold text-zinc-300">
                  Password
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:border-brand focus:bg-white/15 focus:outline-none"
                  />
                </div>
              </MotionDiv>
            </div>

            {/* Submit Button */}
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Button
                type="submit"
                loading={loading}
                className="w-full gap-2 py-3 text-base font-semibold"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MotionDiv>

            {/* Signup Link */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-white/10 pt-5 text-center"
            >
              <p className="text-sm text-zinc-400">
                New to MovieVerse?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-brand transition-colors hover:text-brandSoft"
                >
                  Create account
                </Link>
              </p>
            </MotionDiv>
          </MotionForm>
        </div>
      </MotionDiv>
    </div>
  );
}