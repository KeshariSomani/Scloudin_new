const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productcardSchema = new Schema({

    product_card_title:{
        type:String,
        required:true
    },
    product_card_description:{
        type:String,
        required:true
    }
},
{
   timestamps:true
}
)

const productcardModel = mongoose.model('productcardModel',productcardSchema)
module.exports = productcardModel