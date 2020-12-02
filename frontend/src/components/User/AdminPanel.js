import React, { useState, useEffect } from "react";
import axios from "axios";

const headers = {
  auth_token: `${localStorage.getItem("UserToken")}`,
};
const AdminPanel = () => {
  const [adminproduct, setAdminproduct] = useState({
    name: "",
    price: "",
  });
  const [showit, setShowimage] = useState(null);
  const [image, setImage] = useState({ file: "" });
  const onChange = (e) => {
    setAdminproduct({ ...adminproduct, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  //   formData.append("productImage", image.file);
  formData.append("name", adminproduct.name);
  formData.append("price", adminproduct.price);

  for (const key of Object.keys(image.file)) {
    formData.append("productImage", image.file[key]);
  }
  console.log(formData);
  const onChangeImage = (e) => {
    setImage({ file: e.target.files });
  };
  console.log(image.file);

  const addNewProduct = () => {
    axios
      .post(
        `http://localhost:4000/api/products/addproduct`,

        formData,
        {
          headers: headers,
        }
      )

      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        //   setError(error.response.request.response);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/products/showproducts`).then((res) => {
      setShowimage(res.data[0].image);
    });
  });
  return (
    <div>
      name
      <input type="text" name="name" onChange={onChange} />
      price
      <input type="text" name="price" onChange={onChange} />
      <input
        type="file"
        name="productImage"
        onChange={onChangeImage}
        multiple
      />
      <button onClick={addNewProduct}>Add</button>
      <img src={`http://localhost:4000/${showit}`} alt={"g"} />
    </div>
  );
};

export default AdminPanel;
