import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
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
      <Grid container spacing={2}>
        {/* Left: Movie Poster */}
        <Grid item xs={12} size={{ sm: 12, sm: 6 }}>
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
              mx: "auto",
              display: "block",
            }}
          />
        </Grid>

        {/* Right: Movie Info */}
        <Grid item xs={12} size={{ sm: 12, sm: 6 }}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
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

          <Typography variant="subtitle1" gutterBottom>
            Release Date: {movie.release_date}
          </Typography>

          {/* Trailer */}
          {trailerUrl && (
            <Box
              sx={{
                mt: 3,
                width: "100%",
                position: "relative",
                paddingTop: "56.25%", // 16:9 aspect ratio
              }}
            >
              <iframe
                src={trailerUrl.replace("watch?v=", "embed/")}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Cast Section */}
      <Typography variant="h4" sx={{ mt: 6, mb: 2 }}>
        Top Cast
      </Typography>
      <Grid container spacing={2}>
        {cast.map((actor) => (
          <Grid item xs={12} sm={6} md={2} key={actor.id} sx={{ mb: 2 }}>
            <Card
              sx={{
                width: 180, 
                mx: "auto",
                height: "100%",
                textAlign: "center",
                p: 1,
              }}
            >
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
                <Typography variant="subtitle1" noWrap>
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
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
