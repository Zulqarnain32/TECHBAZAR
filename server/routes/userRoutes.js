const express = require("express")
const verifyToken = require("../middlewares/authMiddleware")
const authrizedRole = require("../middlewares/roleMiddleware")
const router = express.Router();
const UserModel = require("../models/UserModel")
const mongoose = require("mongoose")

router.get("/superAdmin", verifyToken,authrizedRole("superAdmin"),(req,res) => {
    res.json("Welcome User")
})

// only admin and superAdmin can access it
router.get("/admin", verifyToken,authrizedRole("superAdmin","admin"),(req,res) => {
    res.json("Welcome Admin")
})

// only admin and manager can access it
router.get("/manager", verifyToken,authrizedRole("admin","manager"),(req,res) => {
    res.json("Welcome Manager")
})

// all can access it
router.get("/user", verifyToken,authrizedRole("admin","manager","user"),(req,res) => {
    res.json("Welcome User")
})


module.exports = router