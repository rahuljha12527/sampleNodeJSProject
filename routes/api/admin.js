const express = require("express");

const router = express.Router();
const passport=require("../../config/passport-jwt-strategy");

const userApi=require("../../controllers/user_controller")


router.post("/signup", userApi.signup);


router.post("/login", userApi.login);


router.get("/profile/:id", passport.authenticate("admin-rule", { session: false }),userApi.profile)



