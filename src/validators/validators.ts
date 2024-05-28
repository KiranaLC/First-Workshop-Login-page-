// validators.ts
import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm Password is required').optional()
});

export type FormValues = z.infer<typeof formSchema>;
