import express from "express";

// controllers: uses, register, login, secret are the functions inside the controller
import { users, register, login, secret } from "../controllers/auth.js";
// middlewares - call custom middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

//separate the different routes into different files and also to use router.use() to apply middleware to a specific set of routes.
//router.route('/path').get(function)
router.get("/users", users);  // users function is coming from controllers
router.post("/register", register);
router.post("/login", login);

// testing with token - add requireSignin, isAdmin as middleware
router.get("/secret", requireSignin, isAdmin, secret);

export default router;