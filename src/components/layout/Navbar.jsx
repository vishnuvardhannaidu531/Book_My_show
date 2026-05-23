import { AnimatePresence, motion } from "framer-motion";
import { Film, LogOut, Menu, Search, Ticket, User, X } from "lucide-react";
import { createElement } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { selectAuthUser, selectIsAuthenticated } from "../../features/auth/authSelectors";
import Button from "../ui/Button";

const MotionNav = motion.nav;

const navItems = [
  { to: "/movies", label: "Movies", icon: Film },
];

const linkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition duration-300 ${
    isActive
      ? "bg-white text-black shadow-[0_0_30px_rgba(245,158,11,0.22)]"
      : "text-zinc-300 hover:bg-white/10 hover:text-white"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
      <MotionNav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <NavLink to="/" className="group flex items-center gap-3">
          {/* <motion.span
            whileHover={{ scale: 1.08, rotate: -4 }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-zinc-900 via-brand to-amber-500 text-white shadow-glow"
          >
            <Film className="h-5 w-5" />
          </motion.span> */}
          <span className="text-lg font-black tracking-wide text-white">
            Movie<span className="text-brand">Verse</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} className={linkClass} to={to}>
              {/* {createElement(Icon, { className: "h-4 w-4" })} */}
              {label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <NavLink className={linkClass} to="/bookings">
                {/* <Ticket className="h-4 w-4" /> */}
                My Bookings
              </NavLink>
              {/* <NavLink className={linkClass} to="/profile">
                <User className="h-4 w-4" />
                Profile
              </NavLink> */}
            </>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* <button
            type="button"
            onClick={() => navigate("/movies")}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:border-brand/50 hover:text-white"
            aria-label="Search movies"
          >
            <Search className="h-4 w-4" />
          </button> */}
          {isAuthenticated ? (
            <>
              <span className="max-w-36 truncate rounded-lg border border-white/10 bg-white/5 px-1 py-2 text-sm text-zinc-300">
              <NavLink
                className={`${linkClass} max-w-[140px] truncate rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 flex items-center justify-center`}
                to="/profile"
                title={user?.username || "User"}
              >
                {user?.username || "User"}
              </NavLink>
              {/* <NavLink className={linkClass} to="/profile">
                <User className="h-4 w-4" />
                {user?.username || "User"}
              </NavLink> */}
                {/* {user?.username || "User"} */}
              </span>
              <Button variant="ghost" onClick={handleLogout} className="border border-white/10">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")} className="border border-white/10">
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign up</Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </MotionNav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              <NavLink className={linkClass} to="/movies" onClick={() => setOpen(false)}>
                <Film className="h-4 w-4" />
                Movies
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink className={linkClass} to="/bookings" onClick={() => setOpen(false)}>
                    <Ticket className="h-4 w-4" />
                    My Bookings
                  </NavLink>
                  <NavLink className={linkClass} to="/profile" onClick={() => setOpen(false)}>
                    <User className="h-4 w-4" />
                    Profile
                  </NavLink>
                </>
              )}
              <div className="mt-2 border-t border-white/10 pt-3">
                {isAuthenticated ? (
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start border border-white/10">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="ghost" onClick={() => navigate("/login")} className="border border-white/10">
                      Login
                    </Button>
                    <Button onClick={() => navigate("/signup")}>Sign up</Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
