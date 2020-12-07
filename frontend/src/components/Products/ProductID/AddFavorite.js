import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
const token = localStorage.getItem("UserToken");

const useStyles = makeStyles({
  favbtn: {
    color: "#ffc107",
    border: "1px solid #eeeeee",
    height: "100%",
    marginLeft: "5px",
    backgroundColor: "white",

    "&:hover": {
      backgroundColor: "#ffc107",
      color: "white",
    },
  },
});
const AddFavorite = ({ product, state }) => {
  const [disable, setDisable] = useState(false);
  const classes = useStyles();

  const addToFavorites = () => {
    axios
      .put(
        `http://localhost:4000/api/user/addfavorites`,

        { item: product.id },
        {
          headers: { auth_token: `${localStorage.getItem("UserToken")}` },
        }
      )

      .then((res) => {
        if (res.status === 400) {
          console.log("err");
          setDisable(false);
        } else {
          console.log(res);
          setDisable(true);
        }
      })
      .catch((error) => {
        setDisable(false);
        //   setError(error.response.request.response);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/user/userfavs`,

        {
          headers: { auth_token: `${localStorage.getItem("UserToken")}` },
        }
      )

      .then((res) => {
        if (res.status === 401) {
          console.log("err");
        } else {
          const findFav = res.data.find((el) => el === product.id);
          if (findFav) {
            setDisable(true);
          } else {
            setDisable(false);
          }
          console.log(Boolean(findFav));
        }
      })
      .catch((error) => {
        setDisable(true);
        console.log(error.response.request.response);
        //   setError(error.response.request.response);
      });
  }, [state.user, product.id]);

  return (
    <div>
      <Button
        className={classes.favbtn}
        disabled={state.user.name === null || disable}
        onClick={addToFavorites}
      >
        {state.user.name === null || disable ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </Button>
    </div>
  );
};

export default AddFavorite;
