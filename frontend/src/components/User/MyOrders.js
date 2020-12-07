import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  makeStyles,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const MyOrders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    auth_token: `${localStorage.getItem("UserToken")}`,
  };
  useEffect(() => {
    const myOrders = () => {
      axios
        .get(`http://localhost:4000/api/user/userorders`, { headers: headers })

        .then((res) => {
          if (res.status === 400) {
            console.log("err");
          } else {
            console.log(res.data[0].orders);
            setOrders(res.data[0].orders);
          }
        })
        .catch((error) => {
          // setError(error.response.request.response);
        });
    };
    myOrders();
  }, []);
  return (
    <div>
      <p>My Orders</p>

      <List
        className={classes.root}
        style={{ display: "flex", width: "100%", flexDirection: "column" }}
      >
        {orders.map((el, index) => {
          return (
            <div key={index}>
              <ListItem
                alignItems="flex-start"
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <ListItemText primary={`Order Location: ${el.orderLocation}`} />
                <ListItemText primary={`Order Status: ${el.orderMessage}`} />
                <ListItemText
                  primary={`Tracking Number: ${el.trackingNumber}`}
                />
                <ListItemText primary={`${el.amount} euros`} />
                <ListItemText primary={el.createdAt} />
              </ListItem>
              <List>
                {el.cart.map((key, ind) => {
                  return (
                    <ListItem key={ind}>
                      {/* {el.cartMongo.map((key, ind) => {
                        return (
                          <Avatar
                            alt={key.name}
                            src={`http://localhost:4000/uploads/${key.image[0].filename}`}
                          />
                        );
                      })} */}
                      <Avatar
                        alt={key.name}
                        src={`http://localhost:4000/uploads/${
                          el.cartMongo.find((z) => z.id === key.mongoProductID)
                            .image[0].filename
                        }`}
                      />
                      <ListItemText
                        primary={`${key.name},${key.color} - size: ${key.selectedSize} , quantity: ${key.quantity}`}
                      />{" "}
                    </ListItem>
                  );
                })}
              </List>
              <List></List>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </div>
  );
};
// image={`http://localhost:4000/uploads/${product.image[0].filename}`}
export default MyOrders;
