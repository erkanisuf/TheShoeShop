import React, { useEffect } from "react";
import axios from "axios";

const MyOrders = () => {
  const headers = {
    "Content-Type": "application/json",
    auth_token: `${localStorage.getItem("UserToken")}`,
  };
  useEffect(() => {
    const myOrders = () => {
      axios
        .get(`http://localhost:4000/api/user/userorders`, { headers: headers })

        .then((res) => {
          if (res.status === 400) {
            console.log("err");
          } else {
            console.log(res.data[0].orders);
          }
        })
        .catch((error) => {
          // setError(error.response.request.response);
        });
    };
    myOrders();
  }, []);
  return (
    <div>
      <p>My Orders</p>
    </div>
  );
};

export default MyOrders;
