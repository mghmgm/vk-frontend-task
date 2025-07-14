import MoviesPage from '../../pages/MoviesPage'

export const routes = [
  {path: "/movies", element: <MoviesPage />},
  {/* {path: "/movies/:id", element: <MovieDetail>},
  {path: "/favorites", element: <FavoritesPage>}, */},
  {path: "*", element: <MoviesPage />},
];