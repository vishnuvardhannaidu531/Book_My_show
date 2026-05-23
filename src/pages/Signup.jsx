import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { signupUser } from "../features/auth/authSlice";
import { selectAuthLoading } from "../features/auth/authSelectors";

import { usePageTitle } from "../hooks/usePageTitle";

const MotionForm = motion.form;

// ======================================
// ZOD SCHEMA
// ======================================

const signupSchema = z.object({
  username: z.string().trim().min(2, "Miniumum Size of user name is 2"),
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
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-panel p-6 shadow-soft sm:p-8">
      <MotionForm
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <h1 className="text-3xl font-black text-white">Create account</h1>
          <p className="mt-2 text-sm text-zinc-400">Your account enables protected booking, payments, and history.</p>
        </div>

        <div>
          <Input
            label="Username"
            placeholder="Enter your username"
            {...register("username")}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button className="w-full" type="submit" loading={loading}>
          Sign up
        </Button>

        <p className="text-center text-sm text-zinc-400">
          Already have an account? <Link className="font-semibold text-brand" to="/login">Login</Link>
        </p>
      </MotionForm>
    </div>
  );
}
