const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    job_title :{
        type:String,
        required:true
    },
    job_location:{
        type:String,
        required:true
    },
    job_type:{
        type:String,
        required:true
    },
    job_short_description:{
    },
    job_description:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

const jobModel = mongoose.model('jobModel',jobSchema)
module.exports = jobModel