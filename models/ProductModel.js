const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    // category: { type: String, required: true, unique: true },
    // image: { type: String, required: true, unique: true },
    // countInStock: { type: Number, required: true, unique: true },
    // brand: { type: String, required: true, unique: true },
    // description: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    image: { type: Array, default: [] },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", //ref se izpolzva za modela Users
      },
    ],
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating", //ref se izpolzva za modela Users
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews", //ref se izpolzva za modela Users
      },
    ],
  },

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
