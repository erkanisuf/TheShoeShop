import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Product from "../Products/Product";

const MyFavorites = ({ state }) => {
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
      .catch((error) => {
        // setError(error.response.request.response);
      });
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
      .catch((error) => {
        //   console.log(error.response.request.response);
        //   setError(error.response.request.response);
      });
  };

  useEffect(() => {
    ReFetch();
  }, [state.user, removeFromFav]);

  //   const removeFromFav = (param) => {
  //     console.log(param);
  //     axios
  //       .put(
  //         `http://localhost:4000/api/user/deletefav`,
  //         { item: param },
  //         { headers: headers }
  //       )

  //       .then((res) => {
  //         if (res.status === 400) {
  //           console.log("err");
  //         } else {
  //           console.log(res);
  //         }
  //       })
  //       .catch((error) => {
  //         // setError(error.response.request.response);
  //       });
  //   };

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
            <div key={index}>
              <Product product={item} key={index} />
              <button onClick={() => removeFromFav(item.id)}>
                Un-favorite
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFavorites;
