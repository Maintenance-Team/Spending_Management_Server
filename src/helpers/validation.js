import Joi from 'joi';

export const loginValidate = (data) => {
  const LoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(20).required(),
  });

  return LoginSchema.validate(data);
};

export const registerValidate = (data) => {
  const RegisterSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).max(20).required(),
    name: Joi.string().required(),
    gender: Joi.boolean().required(),
    dateOfBirth: Joi.date().required(),
  });

  return RegisterSchema.validate(data);
};
