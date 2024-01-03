const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const footerSchema = new Schema({

    mobile_number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }

},
{
    timestamps:true
}
)

const footerModel = mongoose.model('footerModel',footerSchema)
module.exports = footerModel
