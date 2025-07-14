import { useEffect } from 'react';
import Layout from './Layout';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieAPI } from '../shared/api/MovieAPI';
import { useFetch } from '../hooks/useFetch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const MoviesPage = () => {
  const limit = 50;
  const { 
    page,
    allItems: allMovies,
    observerRef,
    appendItems,
    isLoading: isInfiniteLoading,
    hasMore,
    setIsLoading
  } = useInfiniteScroll(1);

  const { 
    data: movies, 
    loading: isFetchLoading, 
    error 
  } = useFetch(
    () => MovieAPI.getMovies(limit, page).then(res => res.docs),
    [page]
  );

  useEffect(() => {
    setIsLoading(isFetchLoading);
  }, [isFetchLoading, setIsLoading]);

  useEffect(() => {
    if (movies) {
      appendItems(movies, limit);
    }
  }, [movies, appendItems]);

  return (
    <Layout>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <MoviesList movies={allMovies} />
      
      {hasMore && (
        <div ref={observerRef} style={{ height: '20px', margin: '10px' }}>
          {isInfiniteLoading && 'Загрузка...'}
        </div>
      )}
    </Layout>
  );
};

export default MoviesPage;