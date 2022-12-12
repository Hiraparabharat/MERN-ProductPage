const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "Product is availble"],
    },
    price: { type: Number, required: [true, "Price is required"] },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ],
        message: "this is not a valid category",
      },
    },
    description: { type: String, required: [true, "Description is required"] },
    image: { type: String, required: [true, "Image is required"] },
  },
  { timestamps: true }
);

schema.index({ title: "text", category: "text", description: "text" });

module.exports = mongoose.model("product", schema);
