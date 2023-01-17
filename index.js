import express from "express";  
// has an error cannot use import statement outside a module
// add type = modules in package.json to fix the above error
// const express = require("express");
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import morgan from "morgan";

dotenv.config();
const app = express();

// db
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());  // post json request to node

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
app.use("/api", authRoutes);

const port = process.env.PORT || 8080;  // Get env variable from .env

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});