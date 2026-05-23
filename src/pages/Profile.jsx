import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../features/auth/authSelectors";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Profile() {
  usePageTitle("Profile");
  const user = useSelector(selectAuthUser);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-panel p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-xl bg-brand/20 text-brand">
          <UserCircle className="h-9 w-9" />
        </span>
        <div>
          <h1 className="text-2xl font-black text-white">{user?.username || "MovieVerse User"}</h1>
          {/* <p className="text-sm text-zinc-400">{user?.email || "Email not provided by auth response"}</p> */}
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-xl bg-white/[0.04] p-4 text-sm text-zinc-300">
        <p><strong className="text-white">User ID:</strong> {user?.id || "Unavailable"}</p>
        {/* <p><strong className="text-white">Auth:</strong> JWT persisted in localStorage and attached through Axios interceptors.</p> */}
      </div>
    </div>
  );
}
