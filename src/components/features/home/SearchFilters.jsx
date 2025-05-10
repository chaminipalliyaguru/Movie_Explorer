import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
} from "@mui/material";

const genreOptions = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
];

function SearchFilters({ search, setSearch, genre, setGenre, year, setYear, rating, setRating }) {
  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Search for movies..."
        variant="outlined"
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          localStorage.setItem("lastSearch", value);
        }}
      />

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={genre}
          label="Genre"
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {genreOptions.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Year"
        type="number"
        inputProps={{ min: 1900, max: new Date().getFullYear() }}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <Box sx={{ width: 200 }}>
        <Typography gutterBottom>Min Rating</Typography>
        <Slider
          value={rating}
          onChange={(e, newVal) => setRating(newVal)}
          min={0}
          max={10}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}

export default SearchFilters;
