import express from "express";  
// has an error cannot use import statement outside a module
// add type = modules in package.json to fix the above error
// const express = require("express");
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import swaggerUi from "swagger-ui-express"; 
import specs from "./routes/swagger.js";
// To resolve the security from different domain
import cors from "cors";

// get parameters from .env
dotenv.config();
const app = express();

// db
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());  // post json request to node
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// localhost:8080/users
// app.route('/path').get(function)
app.get("/users", (req, res) => {  // Use an arrow => instead of function() in ES6
    res.json({
        data: 'Matthew',
    });
}); 

// https://expressjs.com/en/guide/writing-middleware.html
app.use((req, res, next) => {
    console.log("THIS is my own middleware");
    next();   // must have next() to do call back function, otherwise hang up
})

// router middleware
// localhost:8080/api/users
// calling different routes in different files, auth.js, category.js and product.js
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8080;  // Get env variable from .env

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});