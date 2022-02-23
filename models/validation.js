const joi = require('@hapi/joi');

exports.validateSchema = (data)=> {
    const schema = joi.object({
        name: joi.string().min(4).required(),
        email: joi.string().min(7).required().email(),
        password: joi.string().min(8).required()
    })
    return schema.validate(data)
}
