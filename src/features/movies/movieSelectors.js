export const selectMovies = (state) => state.movies.items;
export const selectSelectedMovie = (state) => state.movies.selectedMovie;
export const selectMoviesLoading = (state) => state.movies.loading;
export const selectMovieDetailsLoading = (state) => state.movies.detailsLoading;
export const selectMoviesError = (state) => state.movies.error;
export const selectMovieSearchTerm = (state) => state.movies.searchTerm;
export const selectMovieFilters = (state) => state.movies.filters;

export const selectGenres = (state) => [
  "All",
  ...new Set(state.movies.items.map((movie) => movie.genre).filter(Boolean)),
];

export const selectLanguages = (state) => [
  "All",
  ...new Set(state.movies.items.map((movie) => movie.language).filter(Boolean)),
];

export const selectFilteredMovies = (state) => {
  const { searchTerm, filters, items } = state.movies;
  return items.filter((movie) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      movie.title?.toLowerCase().includes(query) ||
      movie.genre?.toLowerCase().includes(query) ||
      movie.language?.toLowerCase().includes(query);
    const matchesGenre = filters.genre === "All" || movie.genre === filters.genre;
    const matchesLanguage = filters.language === "All" || movie.language === filters.language;
    return matchesSearch && matchesGenre && matchesLanguage;
  });
};

export const selectTrendingMovies = (state) =>
  [...state.movies.items]
    .sort((a, b) => Number(b.rating || b.score || 0) - Number(a.rating || a.score || 0))
    .slice(0, 6);
