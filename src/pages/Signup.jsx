import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import { signupUser } from "../features/auth/authSlice";
import { selectAuthLoading } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

const MotionForm = motion.form;
const MotionDiv = motion.div;

// ======================================
// ZOD SCHEMA
// ======================================

const signupSchema = z.object({
  username: z.string().trim().min(2, "Username must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Signup() {
  usePageTitle("Signup");

  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await dispatch(signupUser(data));

    if (signupUser.fulfilled.match(result)) {
      toast.success("Account created! Please login to continue.");
      navigate("/login");
    } else {
      toast.error(result.payload || "Signup failed");
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
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl font-black text-white">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                Sign up to continue your movie journey
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
                    placeholder="Choose a username"
                    {...register("username")}
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:bg-white/15 focus:outline-none ${
                      errors.username
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-brand"
                    }`}
                  />
                </div>

                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
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
                    {...register("email")}
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:bg-white/15 focus:outline-none ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-brand"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
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
                    placeholder="Create a strong password"
                    {...register("password")}
                    className={`w-full rounded-lg border bg-white/10 py-3 pl-10 pr-4 text-white placeholder-zinc-500 transition-colors focus:bg-white/15 focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/20 focus:border-brand"
                    }`}
                  />
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
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
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MotionDiv>

            {/* Login Link */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-white/10 pt-5 text-center"
            >
              <p className="text-sm text-zinc-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-brand transition-colors hover:text-brandSoft"
                >
                  Login here
                </Link>
              </p>
            </MotionDiv>
          </MotionForm>
        </div>
      </MotionDiv>
    </div>
  );
}