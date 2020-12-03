import React from "react";
import Rating from "@material-ui/lab/Rating";
const RatingAll = ({ reviews }) => {
  console.log(reviews, "revs");
  return (
    <div>
      <h1>Rating all</h1>
      {reviews.reviews.map((el, index) => {
        return (
          <div key={index}>
            <p>by: {el.user.name}</p>
            <Rating value={el.rating} readOnly /> <p>{el.review}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RatingAll;
