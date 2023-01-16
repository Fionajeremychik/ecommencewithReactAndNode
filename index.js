import express from "express";  
// has an error cannot use import statement outside a module
// add type = modules in package.json to fix the above error
// const express = require("express");
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/users", (req, res) => {  // Use an arrow => instead of function() in ES6
    res.json({
        data: 'Matthew',
    });
});

const port = process.env.PORT || 8000;  // Get env variable from .env

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});