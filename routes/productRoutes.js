const express = require("express");
const app = express();

app.get("/addproduct", (req, res) => {
  const product = new Products({
    name: "Adidas Fit Shirt",
    category: "Shirts",
    image: "/images/p2.jpg",
    price: 100,
    countInStock: 20,
    brand: "Adidas",
    rating: 4.0,
    numReviews: 10,
    description: "high quality product",
  });
  product
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
///Adds to Database

app.get("/showproducts", (req, res) => {
  Products.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
///SHOWS The DataBase
app.get("/singleproducts", (req, res) => {
  Products.findById("5fb2c5a4c72d5422d816f2a8")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
