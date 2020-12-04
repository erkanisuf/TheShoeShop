import React, { useState } from "react";
import Adress from "../User/Adress";
import { Button, Link } from "@material-ui/core/";
import Login from "../User/Login";
import GuestAdress from "./GuestAdress";

const CheckOutAdress = ({ state }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);
  console.log(state.user.adress, "--------------");
  const handleClose = () => {
    setOpenLogin(false);
  };
  if (state.user.name === null) {
    return (
      <div style={{ margin: "0 auto" }}>
        <Link onClick={() => setOpenLogin(true)}>Log in</Link> or continue as{" "}
        <Link onClick={() => setOpenGuest(true)}>Guest</Link>
        <Login openLogin={openLogin} handleClose={handleClose} />
        <GuestAdress
          openUpdateAdress={openGuest}
          handleCloseAdress={() => setOpenGuest(false)}
        />
        {state.user.adress !== null && (
          <div>
            "Guest User" <Adress state={state.user.adress} />
          </div>
        )}
      </div>
    );
  } else
    return (
      <div>
        <Adress state={state.user.adress} />{" "}
      </div>
    );
};

export default CheckOutAdress;
