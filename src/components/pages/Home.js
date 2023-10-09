import { Box, Button, Typography } from "@mui/material";
import MovieItem from "../MovieItem";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";

function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  // console.log(movies);
  return (
    <Box width={"100%"} height={"100%"} margin="auto" marginTop={2}>
      <Box margin="auto" width={"80%"} height={"60vh"} padding={2}>
        <img
          src="https://www.tallengestore.com/cdn/shop/products/Joker_-_Put_On_A_Happy_Face_-_Joaquin_Phoenix_-_Hollywood_English_Movie_Poster_5_f12e37c6-a09e-45d1-bb40-1928888432d1.jpg?v=1579505078"
          alt=""
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box margin="auto" padding={5}>
        <Typography variant="h4" textAlign={"center"}>
          Latest releases
        </Typography>
      </Box>
      <Box
        display="flex"
        width="80%"
        justifyContent={"center"}
        textAlign="center"
        flexWrap="wrap"
        margin="auto"
      >
        {movies &&
          movies
            .slice(0, 5)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                posterUrl={movie.posterUrl}
                title={movie.title}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42 " }}
        >
          View all movies
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
