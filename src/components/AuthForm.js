import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Link } from "react-router-dom";
const labelStyle = { mt: 1, mb: 1 };

//
function AuthForm({ onSubmit, isAdmin }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    onSubmit({ inputs, signup: isAdmin ? false : isSignUp });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignUp ? "SignUp" : "Login"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignUp && (
            <>
              <FormLabel sx={{ labelStyle }}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={{ labelStyle }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={{ labelStyle }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />
          <Button
            sx={{
              mt: 2,
              bgcolor: "#2b2d42",
              color: "#2b2d",
              borderRadius: 10,
            }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignUp ? "SignUp" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{
                mt: 2,

                borderRadius: 10,
              }}
              fullWidth
            >
              Switch to {isSignUp ? "Login" : "SignUp"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
}

export default AuthForm;
