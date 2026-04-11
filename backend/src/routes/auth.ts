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
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: RegisterInput = registerSchema.parse(req.body);

    // Normalize email (lowercase and trim)
    const normalizedEmail = input.email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError(409, 'EMAIL_EXISTS', 'An account with this email already exists');
    }

    // Hash password
    const passwordHash = await argon2.hash(input.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login - Authenticate user
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: LoginInput = loginSchema.parse(req.body);

    // Find user (case-insensitive email search)
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (!user) {
      console.log(`❌ Login failed: User not found for email: ${input.email}`);
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Wrong email or password');
    }

    // Verify password
    const validPassword = await argon2.verify(user.passwordHash, input.password);

    if (!validPassword) {
      console.log(`❌ Login failed: Invalid password for email: ${input.email}`);
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Wrong email or password');
    }

    console.log(`✅ Login successful for: ${user.email}`);

    // Return user data (no JWT for MVP, frontend handles session via localStorage)
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/forgot - Request password reset (simulated)
router.post('/forgot', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: ForgotPasswordInput = forgotPasswordSchema.parse(req.body);

    // Always return success (security best practice)
    // In real implementation, would send email with reset token

    // Generate fake token and log to console (MVP simulation)
    const fakeToken = Math.random().toString(36).substring(2, 15);
    const resetUrl = `http://localhost:5173/reset-password?token=${fakeToken}`;

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 PASSWORD RESET REQUEST (SIMULATED)');
    console.log(`   Email: ${input.email}`);
    console.log(`   Reset URL: ${resetUrl}`);
    console.log(`   Token expires in: ${process.env.RESET_TOKEN_TTL_MINUTES || 30} minutes`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;

