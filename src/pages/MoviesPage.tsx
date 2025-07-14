import { useEffect } from 'react';
import Layout from './Layout';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieAPI } from '../shared/api/MovieAPI';
import { useFetch } from '../hooks/useFetch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useMovieFilters } from '../hooks/useMovieFilters';
import MovieFilters from '../components/MovieFilters/MovieListers';

const MoviesPage = () => {
  const limit = 50;
  const {
    selectedGenres,
    setSelectedGenres,
    ratingRange,
    setRatingRange,
    yearRange,
    setYearRange
  } = useMovieFilters();

  const { 
    page,
    allItems: allMovies,
    observerRef,
    appendItems,
    isLoading: isInfiniteLoading,
    hasMore,
    setIsLoading,
    reset: resetPagination
  } = useInfiniteScroll(1);

  const { 
    data: movies, 
    loading: isFetchLoading, 
    error 
  } = useFetch(
    () => MovieAPI.getMovies(limit, page, {
      genres: selectedGenres,
      minRating: ratingRange.min,
      maxRating: ratingRange.max,
      minYear: yearRange.min,
      maxYear: yearRange.max
    }).then(res => res.data.docs),
    [page, selectedGenres, ratingRange, yearRange]
  );

  useEffect(() => {
    setIsLoading(isFetchLoading);
  }, [isFetchLoading, setIsLoading]);

  useEffect(() => {
    if (movies) {
      appendItems(movies, limit);
    }
  }, [movies, appendItems]);

  useEffect(() => {
    resetPagination();
  }, [selectedGenres, ratingRange, yearRange]);

  return (
    <Layout>
      <MovieFilters
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        yearRange={yearRange}
        setYearRange={setYearRange}
      />
      
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