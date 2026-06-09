import { regexList } from '@/utils/regex';
import { z } from 'zod';

export type LoginFormType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type LoginWithPasswordType = z.infer<typeof loginWithPasswordSchema>;

export const loginSchema = z.object({
  username: z
    .string({ error: 'required' }),
  password: z.string({ error: 'requiredPassword' }).min(5, 'minLength'),
});

export const OTPSchema = z.object({
  otp: z.string(),
});

export const loginWithPasswordSchema = z.object({
  username: z
    .string({ error: 'requiredMobile' })
    .refine(v => regexList.mobileEmail.test(v), 'notValid'),
  password: z.string({ error: 'requiredPassword' }).min(6, 'minLength'),
});

export const forgotPasswordSchema = z.object({
  username: z
    .string({ error: 'required' })
    .refine(v => regexList.mobileEmail.test(v), 'notValid'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string({ error: 'notValid' }).min(6, 'notValid'),
    repeatPassword: z.string({ error: 'notValid' }).optional(),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'duplicate',
    path: ['repeatPassword'],
  });
