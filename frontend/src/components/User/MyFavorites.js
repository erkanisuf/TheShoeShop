import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Product from "../Products/Product";
import { IconButton, makeStyles } from "@material-ui/core/";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  removeStyle: {
    marginBottom: "-25px",
    color: "white",
    position: "absolute",
    top: "0",
    zIndex: "55",
    border: "5px solid white",
    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#e65100",
    },
  },
}));

const MyFavorites = ({ state }) => {
  const classes = useStyles();
  const [myfavs, setmyFavs] = useState([]);

  const removeFromFav = useCallback((param) => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: `${localStorage.getItem("UserToken")}`,
    };
    console.log(param);
    axios
      .put(
        `http://localhost:4000/api/user/deletefav`,
        { item: param },
        { headers: headers }
      )

      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          console.log(res);
          ReFetch();
        }
      })
      .catch((error) => {});
  }, []);

  const ReFetch = () => {
    axios
      .get(
        `http://localhost:4000/api/user/myfavs`,

        {
          headers: { auth_token: `${localStorage.getItem("UserToken")}` },
        }
      )

      .then((res) => {
        if (res.status === 401) {
          console.log("err");
        } else {
          setmyFavs(res.data.favorites);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    ReFetch();
  }, [state.user, removeFromFav]);

  return (
    <div>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",

          flex: "1 1 0",
          justifyContent: "flex-start",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {myfavs.map((item, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <IconButton
                onClick={() => removeFromFav(item.id)}
                className={classes.removeStyle}
              >
                <ClearIcon size="sm" />
              </IconButton>

              <Product product={item} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFavorites;
