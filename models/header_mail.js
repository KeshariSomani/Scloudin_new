const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const headerMailSchema = new Schema({

    header_email:{
        type:String,
        required:true
    }
},
{
    type:String,
}
)

const headerMail = mongoose.model('headerMail',headerMailSchema)
module.exports = headerMail