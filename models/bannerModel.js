const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({

    banner_image_url:{
        type:String,
        required:true
    }

},

{
   timestamps:true
}
)

const bannerModel = mongoose.model('bannerModel',bannerSchema)
module.exports = bannerModel