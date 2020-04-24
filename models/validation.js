const Joi = require("@hapi/joi");

//Validate


const registrationValidation = data =>{
    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        birthDate: Joi.date().required()
    });
    return schema.validate(data);
};

const loginValidation = data =>{
    const schema = Joi.object().keys({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;