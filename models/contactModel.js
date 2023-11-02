const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
   name:{
    type:String
   },
   company:{
          type:String
   },
   email:{
         type:String
   },
   subject:
   {
       type:String
   },
   message:{
          type:String
   }
},
{
    timestamps:true
}
)
const contactModel = mongoose.model('contactModel',contactSchema)
module.exports = contactModel
