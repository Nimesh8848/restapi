import { Schema,models,model } from "mongoose";
const BlogSchmea =new Schema({
    title:{type:'string',required:true},
    content:{type:'string',required:true},
    user:{type:Schema.Types.ObjectId,ref:"User"},
    category:{type:Schema.Types.ObjectId,ref:"Category"},
},
{
    timestamps:true,
});
const Blog =models.Blog||model("Blog",BlogSchmea);
export default Blog;