import { type FC } from 'react';
import type { IMovie } from '../../src/shared/types/types';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card sx={{ width: 945 }}>
        <CardMedia
          component="img"
          height="140"
          image={movie.poster?.previewUrl}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography>{movie.name || movie.alternativeName} ({movie.year})</Typography>
          <Typography>Рейтинг: {movie.rating.imdb}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={}>В избранное</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default MovieCard;
