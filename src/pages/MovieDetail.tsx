import type { FC } from 'react';
import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { MovieAPI } from '../shared/api/MovieAPI';
import Layout from './Layout';

const MovieDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => MovieAPI.getMovieById(id!).then((res) => res.data), [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>Фильм не найден</Typography>;

  const genres = movie.genres.map(genre=>genre.name).join(',')

  return (
    <Layout>
      <section className='details'>
        <Card sx={{ width: 945 }}>
          <CardMedia
            component="img"
            height="240"
            image={movie.poster?.url}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography>
              {movie.name || movie.alternativeName} ({movie.year})
            </Typography>
            <Typography>{movie.description}</Typography>
            <Typography>Рейтинг: {movie.rating.imdb}</Typography>
            <Typography>Жанры: {genres}</Typography>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default MovieDetail;
