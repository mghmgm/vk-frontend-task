import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { MovieAPI } from '../shared/api/MovieAPI';
import MoviesList from '../components/MoviesList/MoviesList';
import Layout from './Layout';

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { data: movies, loading } = useFetch(
    () => Promise.all(
      favoriteIds.map(id => MovieAPI.getMovieById(id).then(res => res.data))
    ),
    [favoriteIds]
  );

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavoriteIds(JSON.parse(saved));
    }
  }, []);

  return (
    <Layout>
      <h1>Избранные фильмы</h1>
      {loading ? 'Загрузка...' : <MoviesList movies={movies || []} />}
    </Layout>
  );
};

export default FavoritesPage;