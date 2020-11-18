const router = require("express").Router();
const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// import Models
const Products = require("../models/ProductModel");
router.post("/addproduct", async (req, res) => {
  const token = req.header("auth_token");
  if (!token) return res.status(401).send("No premission");
  const verify = jwt.verify(token, process.env.TOKEN_USER);
  req.user = verify;
  const user = await Users.findById({ _id: req.user._id });
  const product = new Products({
    name: req.body.name,
    price: parseInt(req.body.price),
    user: user,
    // name: "Adidas Fit Shirt",
    // category: "Shirts",
    // image: "/images/p2.jpg",
    // price: 100,
    // countInStock: 20,
    // brand: "Adidas",
    // rating: 4.0,
    // numReviews: 10,
    // description: "high quality product",
  });

  try {
    const savedNote = await product.save();
    user.products = user.products.concat(savedNote._id);
    await user.save();
    res.send(savedNote);
  } catch (err) {
    res.status(400).status(err);
  }
});
///Adds to Database

router.get("/showproducts", (req, res) => {
  Products.find({})
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
///SHOWS The DataBase
router.get("/singleproducts", (req, res) => {
  Products.findById("5fb2c5a4c72d5422d816f2a8")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
router.get("/productuser", async (req, res) => {
  const products = await Products.find({}).populate("user"); //stringa tuka e v mongoDB variable koito si go imam (primerno user e tozi na products v mongoto)
  res.send(products);
});
module.exports = router;
