import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "../MovieItem";

function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} sx={{ marginTop: 2 }}>
      <Typography
        margin={"auto"}
        variant="h4"
        display="flex"
        bgcolor="#900c3f"
        color="white"
        padding={2}
        width={"40%"}
        textAlign={"center"}
      >
        All movies
      </Typography>
      <Box
        width={"100%"}
        display={"flex"}
        margin="auto"
        marginTop={6}
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Movies;
