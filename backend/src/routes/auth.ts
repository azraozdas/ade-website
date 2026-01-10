import { Router, Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import prisma from '../lib/prisma';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
} from '../lib/validators';
import { AppError } from '../middleware/errorHandler';
import { authRateLimiter } from '../middleware/security';

const router = Router();

// Apply rate limiting to all auth routes
router.use(authRateLimiter);

// POST /api/auth/register - Create new user account
// This endpoint handles user registration with validation and password hashing
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body against our Zod schema
    // This will throw an error if the data doesn't match our requirements
    const registrationData: RegisterInput = registerSchema.parse(req.body);

    // Normalize the email address: convert to lowercase and remove whitespace
    // This is important because email addresses should be case-insensitive
    // It also prevents duplicate accounts with the same email written differently
    const normalizedEmail = registrationData.email.toLowerCase().trim();

    // Check if a user with this email already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // If user already exists, return a conflict error (409)
    if (existingUser) {
      throw new AppError(409, 'EMAIL_EXISTS', 'An account with this email already exists');
    }

    // Hash the password using argon2 before storing it
    // We never store plain text passwords for security reasons
    const passwordHash = await argon2.hash(registrationData.password);

    // Create the new user in the database
    // We only select certain fields to return (exclude password hash)
    const newUser = await prisma.user.create({
      data: {
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // Return the newly created user with a 201 Created status
    res.status(201).json(newUser);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

// POST /api/auth/login - Authenticate user
// This endpoint verifies user credentials and returns user information if valid
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the login request body (email and password)
    const loginData: LoginInput = loginSchema.parse(req.body);

    // Normalize the email for case-insensitive lookup (same as registration)
    const normalizedEmail = loginData.email.toLowerCase().trim();

    // Find the user in the database by their email address
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // If no user found with this email, return an error
    // We use the same error message for both wrong email and wrong password
    // This prevents attackers from knowing which emails exist in our system
    if (!user) {
      console.log(`❌ Login failed: User not found for email: ${loginData.email}`);
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Wrong email or password');
    }

    // Verify the provided password against the stored hash
    // argon2.verify compares the plain password with the hashed version
    const isPasswordValid = await argon2.verify(user.passwordHash, loginData.password);

    // If password doesn't match, return the same error as above (security best practice)
    if (!isPasswordValid) {
      console.log(`❌ Login failed: Invalid password for email: ${loginData.email}`);
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Wrong email or password');
    }

    // If we get here, the login was successful
    console.log(`✅ Login successful for: ${user.email}`);

    // Return user data (without the password hash)
    // Note: For this MVP, we're not using JWT tokens
    // The frontend will store this user data in localStorage to maintain the session
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

// POST /api/auth/forgot - Request password reset (simulated)
// This endpoint simulates a password reset flow
// In a real application, this would send an email with a reset link
router.post('/forgot', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate that we received a valid email address
    const forgotPasswordData: ForgotPasswordInput = forgotPasswordSchema.parse(req.body);

    // Always return success, even if the email doesn't exist in our system
    // This is a security best practice - we don't want to reveal which emails are registered
    // In a real implementation, we would send an email with a reset token here

    // For this MVP, we're just simulating the password reset
    // Generate a fake token (in production, this would be a secure random token stored in the database)
    const fakeToken = Math.random().toString(36).substring(2, 15);
    const resetUrl = `http://localhost:5173/reset-password?token=${fakeToken}`;

    // Log the reset request details to the console (for development/debugging)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 PASSWORD RESET REQUEST (SIMULATED)');
    console.log(`   Email: ${forgotPasswordData.email}`);
    console.log(`   Reset URL: ${resetUrl}`);
    console.log(`   Token expires in: ${process.env.RESET_TOKEN_TTL_MINUTES || 30} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Return success response
    res.json({ ok: true });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

export default router;

