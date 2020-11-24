import React, { useState, useContext } from "react";
import { MyContext } from "../../Context/Context";
import { USER_LOGIN } from "../../Context/reducers";
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

const Login = ({ openLogin, handleClose }) => {
  const { dispatch } = useContext(MyContext);
  const classes = useStyles();
  const [user, setUser] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const handleOnChange = (e) => {
    console.log({ ...user, [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value });
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
          dispatch({
            type: USER_LOGIN,
            token: res.data.token,
            user: res.data.user,
          });
          setError(null);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error.response.request.response);
        setError(error.response.request.response);
      });
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
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
          label="Username"
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={LogIn} className={classes.loginbtn}>
          Sign in
        </Button>
      </DialogActions>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </Dialog>
  );
};

export default Login;
