const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutContentSchema = new Schema({

    about_heading:{
        type:String
    },
    about_description:{
        type:String
    }
},
{
    timestamps:true
}
)

const aboutContentModel = mongoose.model('aboutContentModel',aboutContentSchema)
module.exports = aboutContentModel