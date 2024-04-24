import mongoose, { Schema } from "mongoose";

const book=new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    published:{
        type:Number,
        required:true
    }
});

export default mongoose.model("books",book)