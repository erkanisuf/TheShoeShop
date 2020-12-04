import React from "react";

import SelectSize from "../SelectSize/SelectSize";
import {
  REMOVE_PRODUCT,
  INCREMENT_QUANT,
  DECREMENT_QUANT,
} from "../../Context/reducers";
import {
  List,
  ListItem,
  makeStyles,
  ListItemAvatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Divider,
  Avatar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    flex: "1 1 0px",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "1 1 0px",
  },
  inline: {
    width: "100px",
  },
  plusminus: {
    marginLeft: "5px",
    width: "2px",
    height: "2px",
    color: "white",

    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#ffac33",
    },
    "& svg": {
      fontSize: "20px",
      color: "white",
    },
  },
}));

const CheckOutCart = ({ state, dispatch }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {state.cart.map((item, index) => {
        return (
          <div className={classes.rootTwo} key={index}>
            <ListItem alignItems="flex-start" className={classes.list}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:4000/uploads/${item.image[0].filename}`}
                />
              </ListItemAvatar>

              <ListItemText
                className={classes.inline}
                primary={<b>{item.name}</b>}
                secondary={item.price * item.quantity + "€"}
              />
              <SelectSize item={item} />
              <ListItemText
                primary={<b>Quantity</b>}
                secondary={
                  <>
                    {item.quantity}
                    <IconButton
                      className={classes.plusminus}
                      onClick={() =>
                        dispatch({ type: INCREMENT_QUANT, product: item })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      className={classes.plusminus}
                      onClick={() =>
                        dispatch({ type: DECREMENT_QUANT, product: item })
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                  </>
                }
              />

              <ListItemSecondaryAction>
                <IconButton
                  onClick={() =>
                    dispatch({ type: REMOVE_PRODUCT, product: item })
                  }
                >
                  <ClearIcon
                    color="secondary"
                    style={{
                      fontSize: "30px",
                      display: "inline",
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

export default CheckOutCart;
