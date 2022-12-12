const Router = require("express").Router();
const multer = require("multer");
const Product = require("../Model/Products");
const fs = require("fs");
const path = require("path");
const getQuery = require("../utils/getQuery");
const getSorting = require("../utils/getSorting");

//store images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Product route
Router.route("/products")
  .get(async (req, res, next) => {
    try {
      const data = await Product.find(getQuery(req.query)).sort(
        getSorting(req.query)
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  })
  .post(upload.single("image"), async (req, res, next) => {
    try {
      if (req?.file?.filename) {
        req.body.image = `http://localhost:8000/images/${req.file.filename}`;
      }
      const product = await Product.create({ ...req.body });

      res.send(product);
    } catch (error) {
      const path1 = path.join("public", "images", req.file.filename);
      if (req.file) {
        fs.unlinkSync(path1);
      }
      next(error);
    }
  });

Router.route("/products/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(400).send("product is not available");
      }
    } catch (error) {
      next(error);
    }
  })
  .put(upload.single("image"), async (req, res, next) => {
    try {
      if (req?.file?.filename) {
        req.body.image = `http://localhost:8000/images/${req.file.filename}`;
      }
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (product) {
        res.send(product);
      } else {
        res.status(400).send("product is not available");
      }
    } catch (error) {
      if (req.file) {
        const path1 = path.join("public", "images", req.file.filename);
        fs.unlinkSync(path1);
      }
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (deleted) {
        const filename = deleted.image.split("/");
        const path1 = path.join(
          "public",
          "images",
          filename[filename.length - 1]
        );
        fs.unlinkSync(path1);
        res.send(deleted);
      } else {
        res.status(400).send("product is not available");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = Router;
