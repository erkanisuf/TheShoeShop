const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", //ref se izpolzva za modela Users
      },
    ],
  },
  // {
  //   name: { type: String, required: true, unique: true },
  //   image: { type: String, required: true },
  //   brand: { type: String, required: true },
  //   category: { type: String, required: true },
  //   description: { type: String, required: true },
  //   price: { type: Number, required: true },
  //   countInStock: { type: Number, required: true },
  //   rating: { type: Number, required: true },
  //   numReviews: { type: Number, required: true },
  // },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  //This transforms the obj Id of mongo to String to the front end
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Products = mongoose.model("Products", productSchema);
module.exports = Products;
