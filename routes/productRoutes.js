const router = require("express").Router();
const Users = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const verify = require("./privateRoute");

// import Models
const Products = require("../models/ProductModel");
router.post("/addproduct", verify, async (req, res) => {
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
  const products = await Products.find({}).populate("user", {
    name: 1,
    email: 1,
  }); //stringa tuka e v mongoDB variable koito si go imam (primerno user e tozi na products v mongoto)
  res.send(products);
});

router.delete("/delete/:id", verify, async (request, response, next) => {
  const user = await Users.findById({ _id: request.user._id });
  const product = await Products.findById({ _id: request.params.id });
  console.log(product.user[0], "product");
  console.log(user._id, "user");
  if (user._id.toString() === product.user[0].toString()) {
    Products.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  } else {
    response.send("Premission denied!");
  }
});
module.exports = router;
