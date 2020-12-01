import React, { useState, useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core/";
import { Link } from "react-router-dom";
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
    cursor: "pointer",
  },
});

const ColorPicker = ({ selectColor, productOriginal, state }) => {
  const classes = useStyles();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const filterColors = state.filter((el) => el.name === productOriginal.name);

    setColors(filterColors);
  }, [productOriginal, state]);

  const Circle = (props) => {
    return (
      <Link to={`/products/${props.color}`}>
        <div
          // onClick={() => selectColor(props.color)}
          className={classes.colors}
          style={{ backgroundColor: `${props.color}` }}
        >
          {props.children}
        </div>
      </Link>
    );
  };

  return (
    <Paper className={classes.paperBoxes}>
      {colors.map((el, i) => {
        return (
          <Circle color={el.id} key={i}>
            <img src={el.image[0]} alt={el.name} style={{ width: "50px" }} />
          </Circle>
        );
      })}
    </Paper>
  );
};

export default ColorPicker;
