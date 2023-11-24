import { Express } from "express";
import { login, signup } from "../controllers/authController";
const router : Express = require('express').Router();

router.post('/register',signup)
    .post('/login',login);

module.exports = router;