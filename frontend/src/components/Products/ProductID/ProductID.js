import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../../Context/Context";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Button,
  makeStyles,
  IconButton,
  Modal,
} from "@material-ui/core";
import RatingReview from "./RatingReview";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import CloseIcon from "@material-ui/icons/Close";
import "./productID.css";
import Description from "./Description";
import ColorPicker from "./ColorPicker";
import ProductPrice from "./ProductPrice";

const ProductID = () => {
  const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
      width: "90%",

      position: "relative",

      [theme.breakpoints.up("md")]: {
        width: "700px",
        margin: "0 auto",
        maxHeight: "100%",
        objectFit: "contain",

        position: "relative",
      },
    },
    paper: {
      width: window.innerWidth > 1024 ? "100%" : "375px",
      height: window.innerWidth > 1024 ? "100%" : "80%",
      overflow: "scroll",
      position: "relative",
      justifyContent: "center",
      alignContent: "center",

      display: "flex",
      backgroundColor: theme.palette.background.paper,
      border: window.innerWidth > 1024 ? "2px solid #000" : "none",

      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const { state, dispatch, putence } = useContext(MyContext);

  let { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productFind = state.products.find((n) => n.id === id);
    setProduct(productFind);
  }, [state.products, id]);

  console.log(id, "FROM PRODUCT ID");

  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(null);

  const handleOpen = (param) => {
    setOpenImage(param);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Item = (props) => {
    return (
      <Paper className={classes.sectionDesktop}>
        <img
          onClick={(val) => handleOpen(val.target.currentSrc)}
          style={{
            cursor: "pointer",
            objectFit: "contain",
            width: window.innerWidth > 1024 ? "100%" : "100%",
            height: window.innerWidth > 1024 ? "500px" : "200px",
          }}
          alt={props.item}
          src={props.item}
        />

        <IconButton
          onClick={(val) => handleOpen(val.target.currentSrc)}
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            border: "1px solid grey",
          }}
        >
          <AspectRatioIcon />
        </IconButton>
      </Paper>
    );
  };

  if (!product) {
    return <h1> Loading....</h1>;
  }
  return (
    <div className="gridProduct">
      <div className="nameAndRating">
        <h1>{product.name}</h1>
        <RatingReview
          productId={product.id}
          product={product}
          user={state.user}
        />
      </div>
      <div className="carouselGrid">
        <Carousel
          timeout={100}
          autoPlay={false}
          navButtonsAlwaysInvisible={true}
        >
          {product.image.map((item, i) => (
            <Item
              key={i}
              item={`http://${window.location.hostname}:4000/uploads/${item.filename}`}
            />
          ))}
        </Carousel>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            {" "}
            <Carousel
              timeout={100}
              autoPlay={false}
              navButtonsAlwaysInvisible={
                window.innerWidth > 1024 ? true : false
              }
            >
              {product.image.map((item, i) => (
                <div key={i}>
                  <img
                    alt={item}
                    src={`http://${window.location.hostname}:4000/uploads/${item.filename}`}
                    style={
                      window.innerWidth > 1024
                        ? {
                            maxHeight: "1000px",
                            position: "relative",
                          }
                        : {
                            width: "375px",

                            objectFit: "contain",
                          }
                    }
                  />
                </div>
              ))}
            </Carousel>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 15,
                right: 100,
                transform: "scale(2)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Modal>
      </div>
      <div className="productDescription">
        <Description product={product} />
      </div>

      <div className="addCart">
        <ProductPrice product={product} />
        <div style={{ height: "10px", marginTop: "15px" }}>
          <b>Other colors:</b>
        </div>

        <ColorPicker productOriginal={product} state={state.products} />
      </div>
    </div>
  );
};

export default ProductID;
