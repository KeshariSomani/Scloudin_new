const joi = require('joi')

exports.contactFormValidation = (data)=>
{
    const Schema = joi.object({
        name:joi.string().required(),
        subject:joi.string().required(),
        company:joi.string().required(),
        email:joi.string().required(),
        message:joi.string().required()
    })
    return Schema.validate(data)
}

