import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="grid min-h-[55vh] place-items-center text-center">
      <div>
        <h1 className="text-6xl font-black text-brand">404</h1>
        <p className="mt-3 text-xl font-bold text-white">Page not found</p>
        <p className="mt-2 text-zinc-400">The route does not exist in this booking app.</p>
        <Link to="/movies">
          <Button className="mt-6">Back to movies</Button>
        </Link>
      </div>
    </div>
  );
}
