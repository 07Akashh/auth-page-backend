const Joi = require("joi");

const phoneRegex = /^\+\d{1,3}\d{10}$/;

const userValidationSchema = Joi.object({
    fullName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(phoneRegex)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must start with a "+" followed by the country code and 10 digits.',
        }),
    dob: Joi.date()
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)))
        .less('now')
        .iso()
        .required()
        .messages({
            'date.base': 'Date of birth must be a valid date.',
            'date.max': 'You must be at least 16 years old.',
            'date.less': 'Date of birth must be in the past.'
        }),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Password Did not Match.',
        }),
});

exports.validateRegisterUser = (userData) => {
    return userValidationSchema.validate(userData);
};

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

exports.validateLoginUser = (userData) => {
    return loginValidationSchema.validate(userData);
};
