import { z } from 'zod';

// Password validation schema
// Requirements:
// - Minimum 8 characters long
// - Must contain at least one letter (a-z or A-Z)
// - Must contain at least one number (0-9)
// This helps ensure passwords are reasonably secure
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

// Schema for validating individual order items
// Each item in the cart becomes an order item
export const orderItemSchema = z.object({
  id: z.string(), // Product ID
  name: z.string(), // Product name
  priceCents: z.number().int().positive(), // Price in cents (must be positive integer)
  qty: z.number().int().positive(), // Quantity (must be at least 1)
  shade: z.string().optional(), // Optional shade selection for products that have multiple shades
});

// Schema for validating the entire order creation request
// This includes customer information, shipping address, and order items
export const createOrderSchema = z.object({
  email: z.string().email('Invalid email address'), // Customer email for order confirmation
  fullName: z.string().min(1, 'Full name is required'), // Customer's full name
  phone: z.string().min(1, 'Phone number is required'), // Contact phone number
  addressCountry: z.string().min(1, 'Country is required'), // Shipping country
  addressCity: z.string().min(1, 'City is required'), // Shipping city
  postalCode: z.string().min(1, 'Postal code is required'), // Postal/ZIP code
  addressLine: z.string().min(1, 'Address is required'), // Street address
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'), // At least one item required
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;

