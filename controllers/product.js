import Product from "../models/product.js";
import slugify from "slugify";
import fs from "fs";   // by default without install npm i fs

export const create = async (req, res) => {
    try {
      console.log('all fields',req.fields);    // Use formdata as request
      console.log('file', req.files);
      const { name, description, price, category, quantity, shipping } = req.fields;
      const { photo } = req.files;
      
      console.log('category', category);
      // validation
      switch (true) {
        case !name.trim():
          return res.json({ error: "Name is required" });
        case !description.trim():
          return res.json({ error: "Description is required" });
        case !price.trim():
          return res.json({ error: "Price is required" });
        case !category.trim():
          return res.json({ error: "Category is required" });
        case !quantity?.trim():
          return res.json({ error: "Quantity is required" }); 
        case !shipping?.trim():
          return res.json({ error: "Shipping is required" });  
        case photo && photo.size > 1000000:
          return res.json({ error: "Image should be less than 1mb in size" });
      }
  
      // create product  split operator ...req.fields => all
      const product = new Product({ ...req.fields, slug: slugify(name) });
  
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
  
      await product.save();
      res.json(product);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

  export const list = async (req, res) => {
    // display product without photo
    try {
      const products = await Product.find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
  
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  };

export const read = async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
  
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  };

  export const photo = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId).select(
        "photo"
      );
      if (product.photo.data) {
        res.set("Content-Type", product.photo.contentType);
        return res.send(product.photo.data);
      }
    } catch (err) {
      console.log(err);
    }
  };