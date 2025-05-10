import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";

function TrendingMovies() {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchTrendingMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key: API_KEY,
          page: pageNumber,
        },
      });

      if (pageNumber === 1) {
        setTrending(res.data.results);
      } else {
        setTrending((prev) => [...prev, ...res.data.results]);
      }

      setHasMore(pageNumber < res.data.total_pages);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTrendingMovies(nextPage);
  };

  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={3}>
        {trending.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
      {hasMore && (
        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default TrendingMovies;
