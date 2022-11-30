const { z } = require('zod');

const loginSchema = z.object({
  email: z
    .string({
      requiredError: 'email is required',
      invalidTypeError: 'email must be a string',
    })
    .email({ message: 'You must provide a valid email address' }),

  password: z
    .string({
      requiredError: 'password is required',
      invalidTypeError: 'password must be a string',
    })
    .min(6, { message: 'Password must be at least 6 characters' }),

});

module.exports = {
  loginSchema,
};
