import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../../Context/Context";
import { FETCH_ADRESS } from "../../Context/reducers";
import axios from "axios";

import Adress from "./Adress";

import PropTypes from "prop-types";
import { makeStyles, AppBar, Tabs, Tab, Box, Button } from "@material-ui/core/";

const headers = {
  "Content-Type": "application/json",
  auth_token: `${localStorage.getItem("UserToken")}`,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  bar: {
    backgroundColor: "white",
    color: "grey",
    alignContent: "center",
  },
  indicator: {
    backgroundColor: "#ff9800",
  },
  editbtn: {
    borderRadius: "25px",
    fontSize: "13px",
    padding: "5px 10px",
    marginRight: "5px",
    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#ffac33",
    },
  },
}));

const Profile = () => {
  const { state, dispatch } = useContext(MyContext);

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openUpdateAdress, setopenUpdateAdress] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/api/user/useradress`, { headers: headers })
  //     .then((res) => {
  //       if (res.status === 400) {
  //         console.log("err");
  //       } else {
  //         dispatch({ type: FETCH_ADRESS, adress: res.data[0].adress });
  //         console.log(res);
  //       }
  //     })
  //     .catch((error) => {
  //       // console.log(error.response.request.response);
  //       // setError(error.response.request.response);
  //     });
  // }, [dispatch]);

  // // if (!state.user.adress) {
  // //   return <h1>Loading..</h1>;
  // } else
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          style={{ margin: "0 auto" }}
          classes={{ indicator: classes.indicator }}
        >
          <Tab label="Adress" {...a11yProps(0)} />
          <Tab label="Settings" {...a11yProps(1)} />
          <Tab label="My Orders" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {!state.user.adress ? (
          <button>Add ADress</button>
        ) : (
          <Adress state={state.user.adress} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        My Orders
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
};

export default Profile;
