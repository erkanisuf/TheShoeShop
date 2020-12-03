import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DialogWindow from "./ProductID/DialogWindow ";

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
  IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { MyContext } from "../../Context/Context";
import { ADD_PRODUCT } from "../../Context/reducers";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles({
  root: {
    borderRadius: "5px",
    width: "100%",

    maxWidth: 250,
    margin: " 15px",
  },
  media: {
    height: 300,
    position: "relative",
  },
  cardcontainer: {
    width: "250px",
    display: "flex",
    position: "relative",
  },
  btncontainer: {
    position: "absolute",
    bottom: 100,
    right: 0,
  },
  addToCart: {
    margin: "0 auto",
    width: "70px",
    height: "70px",
    border: "10px solid white",
    borderRadius: "50px",
    fontSize: "13px",
    padding: "5px 15px",
    backgroundColor: "#ffc107",
    transition: "1s",
    color: "black",
    "&:hover": {
      backgroundColor: "#ffac33",
      border: "5px solid grey",
      transform: "scale(1.2)",
    },
  },
  price: {
    marginTop: "15px",
    fontFamily: "Goldman",
  },
  inCart: {
    margin: "0 auto",
    width: "70px",
    height: "70px",
    border: "10px solid white",
    borderRadius: "50px",
    fontSize: "13px",
    padding: "5px 15px",

    transition: "1s",
    color: "black",
  },
});

export default function Product({ product }) {
  const classes = useStyles();

  const { state, dispatch } = useContext(MyContext);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const disableChange = (param) => {
    setDisable(param);
  };
  useEffect(() => {
    const copyState = [...state.cart];
    const findIndex = copyState.findIndex((item) => item.id === product.id);
    if (findIndex < 0) {
      disableChange(false);
    } else {
      disableChange(true);
      handleClose();
    }
  }, [state.cart, product]);

  const addToCart = () => {
    if (product.selectedSize === "") {
      setOpen(true);
    } else {
      dispatch({ type: ADD_PRODUCT, product: product });
    }
  };
  console.log(product.image[0].filename);
  return (
    <Paper elevation={1} className={classes.root}>
      <Card className={classes.cardcontainer}>
        <CardActionArea>
          <Link
            to={`/products/${product.id}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <CardMedia
              className={classes.media}
              image={`http://localhost:4000/uploads/${product.image[0].filename}`}
              title="Contemplative Reptile"
            />
            {/* <Rating
              name="simple-controlled"
              value={product.rating}
              onChange={console.log("change")}
              readOnly
            /> */}

            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ fontFamily: "Exo 2" }}
              >
                {product.name},{product.color}
              </Typography>{" "}
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

        <CardActions className={classes.btncontainer}>
          {disable ? (
            <IconButton disabled className={classes.inCart}>
              <AddShoppingCartIcon />
              <span>In Cart</span>
            </IconButton>
          ) : (
            <IconButton className={classes.addToCart} onClick={addToCart}>
              <ShoppingCartIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
      <DialogWindow open={open} handleClose={handleClose} product={product} />
    </Paper>
  );
}
