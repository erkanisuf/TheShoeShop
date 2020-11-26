import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../Context/Context";
const ProductID = () => {
  const { state, dispatch, putence } = useContext(MyContext);
  console.log(putence, "form IDDDDDDDDDDDDDDDDDDDDDDDDDD");
  let { id } = useParams();
  const product = state.products.find((n) => n.id === Number(id));
  console.log(product, "FROM PRODUCT ID");
  return (
    <div>
      <h1>THis is ProducT IDDD</h1>
    </div>
  );
};

export default ProductID;
