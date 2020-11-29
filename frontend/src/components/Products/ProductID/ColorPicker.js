import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles({
  paperBoxes: {
    marginTop: "25px",
    padding: "15px",
    height: "100px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "flex-start",
  },
  colors: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "1px solid black",
  },
});

const ColorPicker = () => {
  const classes = useStyles();
  const [colors, setColors] = useState([
    "red",
    "green",
    "orange",
    "yellow",
    "grey",
    "black",
  ]);
  const Circle = (props) => {
    return (
      <div
        className={classes.colors}
        style={{ backgroundColor: `${props.color}` }}
      >
        {props.children}{" "}
      </div>
    );
  };

  return (
    <Paper className={classes.paperBoxes}>
      {colors.map((el, i) => {
        return (
          <Circle color={el} key={i}>
            {el}
          </Circle>
        );
      })}
    </Paper>
  );
};

export default ColorPicker;
