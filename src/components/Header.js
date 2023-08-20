import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const dummyArray = ["Brahmastra", "Bombay", "Killers"];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isAdminLoggedIn);
  console.log(isUserLoggedIn);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e, val) => {
    const movie = movies.find((movie) => movie.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
    console.log(movie);
  };
  return (
    <AppBar sx={{ bgcolor: "#2b2d42" }} position="sticky">
      <Toolbar>
        <Box width={"3%"} component={Link} to="/">
          <IconButton width={"1%"} LinkComponent={Link} to="/">
            <LocalMoviesIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            id="free-solo-demo"
            freeSolo
            options={dummyArray.map((option) => option)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" }, ml: 10 }}
                varaiant="standard"
                {...params}
                placeholder="Search movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab component={Link} to="/movies" label="Movies"></Tab>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab component={Link} to="/admin" label="Admin"></Tab>
                <Tab component={Link} to="/auth" label="Auth"></Tab>
              </>
            )}

            {isUserLoggedIn && (
              <>
                <Tab component={Link} to="/userprof" label="Profile"></Tab>
                <Tab
                  onClick={() => logout(false)}
                  component={Link}
                  to="/"
                  label="Logout"
                ></Tab>
              </>
            )}

            {isAdminLoggedIn && (
              <>
                <Tab component={Link} to="/add" label="Add Movie"></Tab>
                <Tab component={Link} to="/adminprof" label="Profile"></Tab>
                <Tab
                  onClick={() => logout(true)}
                  component={Link}
                  to="/"
                  label="Logout"
                ></Tab>
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
