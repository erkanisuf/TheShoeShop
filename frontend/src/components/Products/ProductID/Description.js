import React, { useState } from "react";
import { Paper, Tabs, Tab, makeStyles } from "@material-ui/core/";
import Product from "../Product";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#ff9800",
    color: "black",
  },
}));
const Description = ({ product }) => {
  const classes = useStyles();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Descp = () => {
    return (
      <div style={{ marginLeft: "25px", width: "" }}>
        {" "}
        <p>{product.description}</p>
      </div>
    );
  };

  const TabRender = () => {
    switch (value) {
      case 0:
        return <Descp />;
      case 1:
        return <h1>thi sis 1</h1>;
      default:
        return <h1>err</h1>;
    }
  };
  console.log(value);
  return (
    <Paper style={{ height: "300px", marginBottom: "25px" }}>
      <Tabs
        value={value}
        classes={{ indicator: classes.indicator }}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Description" />

        <Tab label="Details" />
      </Tabs>

      <TabRender />
    </Paper>
  );
};

export default Description;
