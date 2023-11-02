const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blogSchema = new Schema({
    blog_title:{
        type:String,
        required:true
    },
    blog_description:{
        type:String,
        required:true
    },
    blog_image_url:{
        type:String,
        required:true
    },
    blog_short_description:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

const blogModel = mongoose.model('blogModel',blogSchema)
module.exports = blogModel