const express = require("express");
const router = express.Router();

//import controller
const {createTodo} = require("../controller/createtodo");
const {getTodo,getTodobyId} = require("../controller/gettodo");
const {updateTodo} = require("../controller/updatetodo");
const { deleteTodo } = require("../controller/deletetodo");

//define api routes
router.post("/createTodo",createTodo);
router.get("/getTodo",getTodo);
router.get("/getTodo/:id",getTodobyId);
router.put("/updateTodo/:id", updateTodo); 
router.delete("/deleteTodo/:id",deleteTodo);

module.exports = router;