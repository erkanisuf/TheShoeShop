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

const Register = ({ openRegister, handleCloseRegister }) => {
  const { dispatch } = useContext(MyContext);
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordTwo: "",
    email: "",
  });
  const handleOnChange = (e) => {
    console.log({ ...user, [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addNewUser = () => {
    console.log("ádded");
    handleCloseRegister();
  };
  return (
    <Dialog
      open={openRegister}
      onClose={handleCloseRegister}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText>Please create a new account.</DialogContentText>
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
        <TextField
          autoFocus
          margin="dense"
          id="passwordTwo"
          name="passwordTwo"
          label="Confirm password"
          type="passwordTwo"
          fullWidth
          onChange={handleOnChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseRegister} color="primary">
          Cancel
        </Button>
        <Button onClick={addNewUser} className={classes.loginbtn}>
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
