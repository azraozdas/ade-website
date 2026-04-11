import { z } from 'zod';

// Password validation: min 8 chars, at least 1 letter + 1 number
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  priceCents: z.number().int().positive(),
  qty: z.number().int().positive(),
  shade: z.string().optional(),
});

export const createOrderSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  addressCountry: z.string().min(1, 'Country is required'),
  addressCity: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  addressLine: z.string().min(1, 'Address is required'),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;

