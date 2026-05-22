import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { signupUser } from "../features/auth/authSlice";
import { selectAuthLoading } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

const MotionForm = motion.form;

export default function Signup() {
  usePageTitle("Signup");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(signupUser(form));
    if (signupUser.fulfilled.match(result)) {
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-panel p-6 shadow-soft sm:p-8">
      <MotionForm initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h1 className="text-3xl font-black text-white">Create account</h1>
          <p className="mt-2 text-sm text-zinc-400">Your account enables protected booking, payments, and history.</p>
        </div>
        <Input label="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={6} />
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
