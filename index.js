import express from "express";  
// has an error cannot use import statement outside a module
// add type = modules in package.json to fix the above error

// const express = require("express");

const app = express();

app.get("/users", (req, res) => {  // Use an arrow => instead of function() in ES6
    res.json({
        data: 'Matthew',
    });
});

app.listen(8000, () => {
    console.log('Node server is running on port 8000');
});