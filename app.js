const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true); // fixeds error:  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
const dotenv = require("dotenv"); // Hides my DB passw login
dotenv.config();

//start server
const dbUrl = process.env.DB_CONNECT;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => {
    console.log("error", err);
  });

//Middleware
app.use(express.json()); //Gledai tova da e predi routes shtot ne bachka

// import Models
const Products = require("./models/ProductModel");

//import ROuters
const userRoute = require("./routes/userRoutes");

const testRoute = require("./routes/testRoute");
// Use Routes
app.use("/api/user", userRoute);
app.use("/api/test", testRoute);
