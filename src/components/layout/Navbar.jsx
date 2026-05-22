import { Film, LogOut, Menu, Ticket, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { selectAuthUser, selectIsAuthenticated } from "../../features/auth/authSelectors";
import Button from "../ui/Button";

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-brand text-white" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-black tracking-normal text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand shadow-glow">
            <Film className="h-5 w-5" />
          </span>
          MovieVerse
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink className={linkClass} to="/movies">
            Movies
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink className={linkClass} to="/bookings">
                My Bookings
              </NavLink>
              <NavLink className={linkClass} to="/profile">
                Profile
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2 text-sm text-zinc-300">
                <User className="h-4 w-4" />
                {user?.username || "User"}
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
            </>
          )}
        </div>

        <button className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-surface px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <NavLink className={linkClass} to="/movies" onClick={() => setOpen(false)}>
              Movies
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink className={linkClass} to="/bookings" onClick={() => setOpen(false)}>
                  <Ticket className="mr-2 inline h-4 w-4" />
                  My Bookings
                </NavLink>
                <NavLink className={linkClass} to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </NavLink>
                <Button className="mt-2 w-full" variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <Button className="mt-2 w-full" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
