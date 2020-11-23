const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", true); // fixeds error:  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
const dotenv = require("dotenv"); // Hides my DB passw login
const cookieParser = require("cookie-parser");
dotenv.config();
app.use(cors());
app.use(cookieParser());
//start server
const dbUrl = process.env.DB_CONNECT;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(4000))
  .catch((err) => {
    console.log("error", err);
  });

//Middleware
app.use(express.json()); //Gledai tova da e predi routes shtot ne bachka

//import ROuters
const userRoute = require("./routes/userRoutes");

const testRoute = require("./routes/testRoute");
const productsRoute = require("./routes/productRoutes");
// Use Routes
app.use("/api/user", userRoute);
app.use("/api/test", testRoute);
app.use("/api/products", productsRoute);
