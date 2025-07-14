import { Checkbox, FormControlLabel, Slider, Typography, Box } from '@mui/material';

const GENRES = ['комедия', 'драма', 'фантастика', 'боевик', 'триллер'];

const MovieFilters = ({
  selectedGenres,
  setSelectedGenres,
  ratingRange,
  setRatingRange,
  yearRange,
  setYearRange,
}) => {
  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  return (
    <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Жанры:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {GENRES.map((genre) => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
              }
              label={genre}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>
          Рейтинг IMDb: {ratingRange.min.toFixed(1)} - {ratingRange.max.toFixed(1)}
        </Typography>
        <Slider
          value={[ratingRange.min, ratingRange.max]}
          onChange={(_, newValue) =>
            setRatingRange({
              min: newValue[0],
              max: newValue[1],
            })
          }
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography gutterBottom>
          Год выпуска: {yearRange.min} - {yearRange.max}
        </Typography>
        <Slider
          value={[yearRange.min, yearRange.max]}
          onChange={(_, newValue) =>
            setYearRange({
              min: newValue[0],
              max: newValue[1],
            })
          }
          min={1990}
          max={new Date().getFullYear()}
          marks={[
            { value: 1990, label: '1990' },
            { value: new Date().getFullYear(), label: `${new Date().getFullYear()}` },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MovieFilters;