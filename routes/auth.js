import express from "express";

//controllers
import { users } from "../controllers/auth.js";

const router = express.Router();

//separate the different routes into different files and also to use router.use() to apply middleware to a specific set of routes.
//router.route('/path').get(function)
router.get("/users", users);  // users function is coming from controllers

export default router;