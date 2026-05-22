import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginUser } from "../features/auth/authSlice";
import { selectAuthLoading } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

const MotionForm = motion.form;

export default function Login() {
  usePageTitle("Login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful");
      navigate(location.state?.from?.pathname || "/movies", { replace: true });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-soft lg:grid-cols-[1fr_420px]">
      <div className="hidden bg-[url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center lg:block" />
      <MotionForm initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
        <div>
          <h1 className="text-3xl font-black text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">Login to book seats, manage bookings, and continue payment.</p>
        </div>
        <Input label="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
        <Input label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <Input label="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <Button className="w-full" type="submit" loading={loading}>
          Login
        </Button>
        <p className="text-center text-sm text-zinc-400">
          New here? <Link className="font-semibold text-brand" to="/signup">Create an account</Link>
        </p>
      </MotionForm>
    </div>
  );
}
