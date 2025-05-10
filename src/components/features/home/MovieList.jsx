import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies.length) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
}

export default MovieList;
