const Joi = require("joi")

const registerBody = Joi.object({
    name: Joi.string().trim().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().trim().lowercase().required(),
    confirmPassword: Joi.ref("password")
})


const loginBody = Joi.object({
    account: Joi.string().trim().lowercase().required(),
    password: Joi.string().trim().lowercase().required()
})

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(", ");

            return res.status(400).json({
                error: errorMessage
            })
        }

        next()
    }
}

module.exports = {
    registerBody,
    validate,
    loginBody
}