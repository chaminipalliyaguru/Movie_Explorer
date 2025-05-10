import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      setMovie(data);
      setCast(data.credits.cast.slice(0, 6));
      const trailer = data.videos.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerUrl(
        trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : ""
      );
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Movie Poster */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Right: Movie Info */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Release Date: {movie.release_date}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>

          {/* Genres */}
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap" }}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          {/* Trailer Button */}
          {trailerUrl && (
            <Button
              variant="contained"
              color="secondary"
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 3 }}
            >
              🎬 Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Cast Section */}
      <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
        Top Cast
      </Typography>
      <Grid container spacing={3}>
        {cast.map((actor) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={actor.id}>
            <Card sx={{ height: "100%", textAlign: "center", p: 1 }}>
              <CardMedia
                component="img"
                height="220"
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
                sx={{ borderRadius: 2 }}
              />
              <CardContent>
                <Typography variant="subtitle1">{actor.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieDetail;
