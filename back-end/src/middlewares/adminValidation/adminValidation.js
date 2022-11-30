const { z } = require('zod');

const adminSchema = z.object({
  name: z
  .string({
    requiredError: 'Name is required',
    invalidTypeError: 'Name must be a string',
  })
  .min(12, { message: 'Name must be ate least 12 characters long' }),

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

  role: z
    .enum(['administrator', 'seller', 'customer'], {
      errorMap: () => ({ message: 'Please provide a valid role' }),
    }),

});

module.exports = {
  adminSchema,
};
