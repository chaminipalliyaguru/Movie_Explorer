import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Rating,
    Container,
  } from "@mui/material";

function TrendingMovies() {
  const [trending, setTrending] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setTrending(res.data.results);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const renderMovieCard = (movie) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 260,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          sx={{
            width: "100%",
            height: { xs: 300, sm: 350, md: 400 },
            objectFit: "cover",
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Year: {movie.release_date?.slice(0, 4) || "N/A"}
          </Typography>
          <Rating
            value={parseFloat((movie.vote_average / 2).toFixed(1))}
            precision={0.1}
            readOnly
          />
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div>
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Trending Movies
        </Typography>
        <Grid container spacing={3}>
          {trending.map(renderMovieCard)}
        </Grid>
      </Box>
    </div>
  );
}

export default TrendingMovies;
