import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Chip, Grid, Button } from '@mui/material';

const API_KEY = 'YOUR_TMDB_API_KEY';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      setMovie(data);
      setCast(data.credits.cast.slice(0, 5));
      const trailer = data.videos.results.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{movie.title}</Typography>
      <Typography variant="subtitle1" gutterBottom>{movie.release_date}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>{movie.overview}</Typography>

      {/* Genres */}
      <Box sx={{ my: 2 }}>
        {movie.genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      {/* Cast */}
      <Typography variant="h6" sx={{ mt: 4 }}>Top Cast</Typography>
      <Box>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item key={actor.id}>
              <Typography>{actor.name}</Typography>
              <Typography variant="body2" color="text.secondary">as {actor.character}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Trailer */}
      {trailerUrl && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Trailer
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MovieDetail;
