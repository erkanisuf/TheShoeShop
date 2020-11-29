import React, { useContext, useState } from "react";
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
import Rating from "@material-ui/lab/Rating";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import CloseIcon from "@material-ui/icons/Close";
import "./productID.css";
import AddCartButton from "./AddCartButton";

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
  const product = state.products.find((n) => n.id === Number(id));
  console.log(product, "FROM PRODUCT ID");

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

  return (
    <div className="gridProduct">
      <div className="nameAndRating">
        <h1>{product.name}</h1>
        <Rating
          name="simple-controlled"
          value={product.rating}
          onChange={console.log("change")}
        />
        Reviews {product.rating.lenght}
      </div>
      <div className="carouselGrid">
        <Carousel
          timeout={100}
          autoPlay={false}
          navButtonsAlwaysInvisible={true}
        >
          {product.image.map((item, i) => (
            <Item key={i} item={item} />
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
                    src={item}
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
      <div className="productDescription">productDescription</div>
      <div className="priceProduct">priceProduct</div>
      <div className="addCart">
        <AddCartButton product={product} />
      </div>
      <div className="shoeSize">shoeSize</div>
    </div>
  );
};

export default ProductID;
