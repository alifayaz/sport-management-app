import { regexList } from '@/utils/regex';
import { z } from 'zod';

export type LoginFormType = z.infer<typeof loginSchema>;
export type RegisterFormType = z.infer<typeof registerSchema>;
export type RegisterRequest = Omit<RegisterFormType, 'confirmPassword'>;

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'نام کاربری الزامی است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, 'نام کاربری حداقل 4 کاراکتر وارد نمایید.'),
    password: z
      .string()
      .regex(
        regexList.strongPassword,
        'پسورد شما باید شامل اعداد و کاراکترهای خاص و حداقل 6 کاراکتر باشد.',
      ),
    confirmPassword: z.string().min(1, 'تکرار رمز عبور الزامی است'),
    first_name: z.string().min(1, 'نام الزامی است'),
    last_name: z.string().min(1, 'نام خانوادگی الزامی است'),
    gender: z.enum(['male', 'female', 'other']).optional(),
    phone_number: z.string().min(11, 'شماره موبایل حداقل 11 رقم می باشد.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'تکرار رمز عبور مطابقت ندارد',
    path: ['confirmPassword'],
  });

export const createAvailabilitySchema = z.object({
  sport: z.enum([
    'football',
    'futsal',
    'volleyball',
    'badminton',
    'padel',
    'tennis',
  ]),
  latitude: z.number(),
  longitude: z.number(),
  start_time: z.string(),
  arena_type: z.enum(['outdoor', 'indoor']),
  arena_name: z.string().optional(),
  duration: z.string(),
});
export type CreateAvailabilityType = z.infer<typeof createAvailabilitySchema>;

export type MatchStatus =
  | 'accepted'
  | 'expire'
  | 'waiting'
  | 'canceled'
  | 'active'
  | 'completed';

export type MatchData = {
  id: string;
  sport: SportType;
  arena_type: ArenaType;
  arena_name: string;
  start_time: string;
  end_time: string;
  status: MatchStatus;
  host: {
    id: string;
    age: number;
    first_name: string;
    last_name: string;
    gender: string;
    rate: string;
  };
  guest: {
    id: string;
    age: number;
    first_name: string;
    last_name: string;
    gender: string;
    rate: string;
  };
};

export type SportType =
  | 'football'
  | 'futsal'
  | 'volleyball'
  | 'badminton'
  | 'padel'
  | 'tennis';

export const sportNameFa: Record<SportType, string> = {
  football: 'فوتبال',
  futsal: 'فوتسال',
  volleyball: 'والیبال',
  badminton: 'بدمینتون',
  padel: 'پدل',
  tennis: 'تنیس',
};

export type ArenaType = 'outdoor' | 'indoor';

export type UserInfo = {
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  rate: string;
  age: number;
};
