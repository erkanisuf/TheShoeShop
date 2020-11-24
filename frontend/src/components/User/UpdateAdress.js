import React, { useState } from "react";
import axios from "axios";
const UpdateAdress = () => {
  const [adress, setAdress] = useState({
    adress: {
      street: "",
      phone: "",
      city: "",
      postcode: "",
    },
  });

  const handleOnChange = (e) => {
    setAdress({
      ...adress,
      adress: { ...adress.adress, [e.target.name]: e.target.value },
    });
  };
  console.log(adress);

  const headers = {
    "Content-Type": "application/json",
    auth_token: `${localStorage.getItem("UserToken")}`,
  };
  const addAdress = () => {
    axios
      .put(
        `http://localhost:4000/api/user/update/${localStorage.getItem(
          "UserID"
        )}`,
        adress,
        { headers: headers }
      )

      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>street</h1>
      <input type="text" name="street" onChange={handleOnChange} />
      <h1>phone</h1>
      <input type="text" name="phone" onChange={handleOnChange} />
      <h1>postcode</h1>
      <input type="text" name="postcode" onChange={handleOnChange} />
      <h1>city</h1>
      <input type="text" name="city" onChange={handleOnChange} />
      <button onClick={addAdress}>Update</button>
    </div>
  );
};

export default UpdateAdress;
