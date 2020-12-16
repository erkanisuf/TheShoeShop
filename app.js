const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false); // fixeds error:  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
const dotenv = require("dotenv"); // Hides my DB passw login
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lit-thicket-99427.herokuapp.com/"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//start server
const dbUrl = process.env.DB_CONNECT;
const PORT = process.env.PORT || 4000;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => {
    console.log("error", err);
  });

//Middleware
app.use(express.json()); //Gledai tova da e predi routes shtot ne bachka

//import ROuters
const userRoute = require("./routes/userRoutes");

const testRoute = require("./routes/testRoute");
const productsRoute = require("./routes/productRoutes");
const paymentRoute = require("./routes/paymentRoutes");
// Use Routes
app.use("/api/user", userRoute);
app.use("/api/test", testRoute);
app.use("/api/products", productsRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/payment", paymentRoute);

//http://localhost:4000/uploads/Climbing-the-Rinjani-Volcano.jpg  IMG how to get
