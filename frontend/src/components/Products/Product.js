import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { MyContext } from "../../Context/Context";
import { ADD_PRODUCT } from "../../Context/reducers";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    width: "100%",

    maxWidth: 400,
    margin: "5px",
  },
  media: {
    height: 300,
  },
  addToCart: {
    margin: "0 auto",
    borderRadius: "25px",
    fontSize: "13px",
    padding: "5px 15px",
    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#ffac33",
    },
  },
  price: {
    marginTop: "15px",
  },
});

export default function Product({ product }) {
  const classes = useStyles();
  const { dispatch } = useContext(MyContext);

  return (
    <Paper elevation={1} className={classes.root}>
      <Card>
        <CardActionArea>
          <Link to={`/products/${product.id}`}>
            <CardMedia
              className={classes.media}
              image={product.image}
              title="Contemplative Reptile"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>

              <Rating
                name="simple-controlled"
                value={product.rating}
                onChange={console.log("change")}
                readOnly
              />

              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.price}
              >
                {product.price}€
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>

        <CardActions>
          <Button
            startIcon={<AddShoppingCartIcon />}
            className={classes.addToCart}
            onClick={() => dispatch({ type: ADD_PRODUCT, product: product })}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}
