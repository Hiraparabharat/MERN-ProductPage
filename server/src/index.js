const database = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const ProductRoute = require("./Routes/ProductRoute");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(ProductRoute);

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).send(err.message);
  }
  if (err.code === 11000) {
    return res.status(400).send(`${err.keyValue.title} is available`);
  }

  res.status(500).send(err);
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

database().then(() => {
  app.listen(8000, () => console.log("app listen on port 8000"));
});
