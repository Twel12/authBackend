import { Express } from "express";
import { signup } from "../controllers/authController";
const router : Express = require('express').Router();

router.post('/register',signup);

module.exports = router;