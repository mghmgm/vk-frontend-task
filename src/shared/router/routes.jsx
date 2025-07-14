import MoviesPage from '../../pages/MoviesPage';
import MovieDetail from '../../pages/MovieDetail';
import FavoritesPage from '../../pages/FavoritesPage';

export const routes = [
  { path: '/movies', element: <MoviesPage /> },
  { path: '/movies/:id', element: <MovieDetail /> },
  {path: "/favorites", element: <FavoritesPage />},
  { path: '*', element: <MoviesPage /> },
];
