import { useEffect, useState } from 'react';
import Layout from './Layout';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieAPI } from '../shared/api/MovieAPI';
import type { IMovie } from '../shared/types/types';

const MoviesPage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 50;

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await MovieAPI.getMovies(limit, page);
      setMovies(response.docs);
      console.log(movies);
    } catch (err) {
      setError('Не удалось загрузить фильмы');
      console.error('Ошибка при загрузке фильмов:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchMovies();
  }, [page]);

  return (
    <Layout>
      {isLoading && <div>Загрузка...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {movies && <MoviesList movies={movies} />}
    </Layout>
  );
};

export default MoviesPage;
