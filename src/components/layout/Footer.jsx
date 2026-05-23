import { motion } from "framer-motion";
import { Film, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { createElement } from "react";
import { Link } from "react-router-dom";

const MotionDiv = motion.div;

export default function Footer() {
  const year = new Date().getFullYear();
  const social = [
      {
        icon: Instagram,
        label: "Instagram",
        link: "#",
      },
      {
        icon: Twitter,
        label: "Twitter",
        link: "#",
      },
      {
        icon: Linkedin,
        label: "LinkedIn",
        link: "https://www.linkedin.com/in/gunde-vishnuvardhan-naidu-3b08a8374/",
      },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber-400/10 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <MotionDiv initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-amber-500 shadow-glow">
              <Film className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-black text-white">MovieVerse</span>
          </div> */}
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Premium movie discovery, fast bookings, secure payments, and theatre-ready ticketing in one cinematic flow.
          </p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Explore</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <Link to="/movies" className="transition hover:text-brand">Movies</Link>
            <Link to="/bookings" className="transition hover:text-brand">My Bookings</Link>
            <Link to="/profile" className="transition hover:text-brand">Profile</Link>
          </div>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Concierge</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> support@movieverse.com</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> India</span>
          </div>
        </MotionDiv>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-4 py-6 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>Copyright {year} MovieVerse. All rights reserved.</p>
        <div className="flex gap-3">
          {social.map(({ icon: Icon, label,link }) => (
            <a
              key={label}
              href={link}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:border-brand/50 hover:text-white"
              aria-label={label}
            >
              {createElement(Icon, { className: "h-4 w-4" })}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
