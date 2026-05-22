import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMovieFilter, setSearchTerm } from "../../features/movies/movieSlice";
import { selectGenres, selectLanguages, selectMovieFilters, selectMovieSearchTerm } from "../../features/movies/movieSelectors";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function MovieFilters() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectMovieSearchTerm);
  const filters = useSelector(selectMovieFilters);
  const genres = useSelector(selectGenres);
  const languages = useSelector(selectLanguages);

  return (
    <div className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_180px_180px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          className="pl-11"
          placeholder="Search movies, genres, languages"
          value={searchTerm}
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        />
      </div>
      <Select value={filters.genre} options={genres} onChange={(event) => dispatch(setMovieFilter({ genre: event.target.value }))} />
      <Select value={filters.language} options={languages} onChange={(event) => dispatch(setMovieFilter({ language: event.target.value }))} />
    </div>
  );
}
