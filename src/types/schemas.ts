import { regexList } from '@/utils/regex';
import { z } from 'zod';

export type LoginFormType = z.infer<typeof loginSchema>;
export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z
    .string({ error: 'required' }),
  password: z.string({ error: 'requiredPassword' }).min(5, 'minLength'),
});

export const registerSchema = z.object({
  username: z.string({ error: 'required' }),
  password: z.string({ error: 'requiredPassword' }).min(5, 'minLength'),
  first_name: z.string(),
  last_name: z.string(),
  mobile: z.string(),
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

export type MatchStatus = "active" | "expire" | "waiting";

export type MatchData = {
  id: string
  sport: SportType;
  arena_type: ArenaType;
  arena_name: string;
  start_time: string;
  end_time: string;
  status: MatchStatus;
  user: {
    age: number,
    first_name: string,
    last_name: string,
    gender: string,
    rate: string
  },
};

export type SportType =
    | "football"
    | "futsal"
    | "volleyball"
    | "badminton"
    | "padel"
    | "tennis";

export const sportNameFa: Record<SportType, string> = {
  football: "فوتبال",
  futsal: "فوتسال",
  volleyball: "والیبال",
  badminton: "بدمینتون",
  padel: "پدل",
  tennis: "تنیس",
};

export type ArenaType = "outdoor" | "indoor";