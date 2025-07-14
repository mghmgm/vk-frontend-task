import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialGenres = searchParams.get('genres')?.split(',') || [];
  const initialRating = {
    min: parseFloat(searchParams.get('minRating') || '0'),
    max: parseFloat(searchParams.get('maxRating') || '10')
  };
  const initialYear = {
    min: parseInt(searchParams.get('minYear') || '1990'),
    max: parseInt(searchParams.get('maxYear') || `${new Date().getFullYear()}`)
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);
  const [ratingRange, setRatingRange] = useState(initialRating);
  const [yearRange, setYearRange] = useState(initialYear);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
    if (ratingRange.min > 0) params.set('minRating', ratingRange.min.toString());
    if (ratingRange.max < 10) params.set('maxRating', ratingRange.max.toString());
    if (yearRange.min > 1990) params.set('minYear', yearRange.min.toString());
    if (yearRange.max < new Date().getFullYear()) params.set('maxYear', yearRange.max.toString());
    
    setSearchParams(params, { replace: true });
  }, [selectedGenres, ratingRange, yearRange]);

  return {
    selectedGenres,
    setSelectedGenres,
    ratingRange,
    setRatingRange,
    yearRange,
    setYearRange
  };
};