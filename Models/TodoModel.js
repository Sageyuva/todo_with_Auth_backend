const mongoose = require ("mongoose")

const TodoSchema = new mongoose.Schema({
    todo:String,
    id:String
},{
    timestamps:true
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports= TodoModel