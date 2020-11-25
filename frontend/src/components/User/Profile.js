import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAdress from "./UpdateAdress";

const headers = {
  "Content-Type": "application/json",
  auth_token: `${localStorage.getItem("UserToken")}`,
};

const Profile = () => {
  const [adress, setAdress] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/user/useradress`, { headers: headers })
      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          setAdress(res.data[0].adress);
          console.log(res);
        }
      })
      .catch((error) => {
        // console.log(error.response.request.response);
        // setError(error.response.request.response);
      });
  }, []);
  if (!adress) {
    return <h1>Loading..</h1>;
  } else
    return (
      <div>
        <h1>ADress{adress.city}</h1>
        <UpdateAdress />
      </div>
    );
};

export default Profile;
