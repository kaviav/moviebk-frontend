import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function MovieItem({ title, id, releaseDate, posterUrl }) {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={`${posterUrl}`}
        title="green iguana"
      />
      <CardContent>
        <Typography>{title} </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#2b2d42",
            borderRadius: 9,
            width: "80%",
            margin: "auto",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieItem;
