const TodoModel = require("../Models/TodoModel")
const express = require('express')
const router = express.Router()


router.post("/addtodo" , async(req,res)=>{
    try {
        const {todo , id } = req.body
        const newTodo = await TodoModel.create({todo, id})
        res.json(newTodo )
    } catch (error) {
        res.json("error while creating todo")
    }
})

router.get("/gettodo", async (req, res) => {
    try {
        const { id } = req.query; // Retrieving id from req.query
        const todos = await TodoModel.find({ id });
        if (todos && todos.length > 0) { // Check if todos is not empty
            res.json(todos); // Sending todos array in the response
        } else {
            res.json("Todo not found");
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json("Error getting todo"); // Set status code to 500 for internal server error
    }
});

router.get("/gettodo/:id" , async(req,res)=>{
    try {
        const { id } = req.params; // Fix destructuring here
        const todo = await TodoModel.findById({_id:id}); // You need to await for the operation to complete
        res.json(todo); // Respond with deleted todo
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" }); // Correct error response
    }
})

router.post("/edittodo/:id", async (req, res) => {
    try {
        const { id } = req.params; // Corrected destructuring
        const todo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true }); // Corrected findByIdAndUpdate usage
        res.json(todo); // Respond with updated todo
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" }); // Corrected error response message
    }
});

router.delete("/deletetodo/:id", async (req, res) => {
    try {
        const { id } = req.params; // Fix destructuring here
        const todo = await TodoModel.findByIdAndDelete({_id:id}); // You need to await for the operation to complete
        res.json(todo); // Respond with deleted todo
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" }); // Correct error response
    }
});

module.exports= router