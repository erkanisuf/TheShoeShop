import React, { useState, useContext } from "react";
import { MyContext } from "../../Context/Context";
import { USER_LOGIN, FETCH_ADRESS } from "../../Context/reducers";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core/";

const headers = {
  "Content-Type": "application/json",
  auth_token: `${localStorage.getItem("UserToken")}`,
};
const useStyles = makeStyles({
  loginbtn: {
    borderRadius: "25px",
    fontSize: "13px",
    padding: "5px 10px",
    marginRight: "5px",
    backgroundColor: "#ffc107",
    "&:hover": {
      backgroundColor: "#ffac33",
    },
  },
});

const Login = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  const { dispatch } = useContext(MyContext);
  const classes = useStyles();
  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const handleOnChange = (e) => {
    console.log({ ...user, [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const Adress = () => {
    axios
      .get(`http://localhost:4000/api/user/useradress`, { headers: headers })
      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          dispatch({ type: FETCH_ADRESS, adress: res.data[0].adress });
          console.log(res);
        }
      })
      .catch((error) => {
        // console.log(error.response.request.response);
        // setError(error.response.request.response);
      });
  };

  const LogIn = () => {
    axios
      .post(`http://localhost:4000/api/user/login`, user)

      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          window.localStorage.setItem("UserToken", res.data.token);
          window.localStorage.setItem("User", res.data.user);
          window.localStorage.setItem("UserID", res.data.userID);
          console.log(res.data);
          dispatch({
            type: USER_LOGIN,
            token: res.data.token,
            user: {
              name: res.data.user,
              id: res.data.userID,
              adress: res.data.adress,
            },
          });
          setError(null);
          props.handleClose();
          if (location.state && location.state.from) {
            history.replace(location.state.from.pathname);
            console.log("ga");
          }
          // else go to home
          else {
            history.replace("/");
            console.log("anus");
          }
        }
      })
      .catch((error) => {
        // console.log(error.response.request.response);
        setError(error.response.request.response);
      });
  };

  return (
    <Dialog
      open={props.openLogin}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Log in</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please write your username and password to log in.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="name"
          fullWidth
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={LogIn} className={classes.loginbtn}>
          Sign in
        </Button>
      </DialogActions>
      {error && (
        <div>
          <p style={{ textAlign: "center", color: "red", fontWeight: "400" }}>
            {error}
          </p>
        </div>
      )}
    </Dialog>
  );
};

export default Login;
