import { z } from 'zod';

export const RegistrationStepSchema = z.object({
  type: z.enum(['cosine', 'company', 'poster']),
});

// Shared Primitives
const trimmedString = (min: number, msg: string) => z.string().transform(v => v.trim()).pipe(z.string().min(min, msg));

export const UserBaseSchema = z.object({
  email: z.string().email('Invalid email address').transform(v => v.trim()),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
});

export const SkillLevel = z.enum(['Beginner', 'Intermediate', 'Advanced']);

export const SkillTagSchema = z.object({
  name: z.string(),
  level: SkillLevel,
});

// 1. Cosine (Student) Schema
// REQUIRED: Full Name, Email, Password, Student ID Status
// OPTIONAL: Portfolio links, Certifications
export const CosineRegistrationSchema = UserBaseSchema.extend({
  fullName: z.string()
    .transform(v => v.trim())
    .pipe(
      z.string()
        .min(2, 'FullName must be at least 2 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'No numbers or special characters allowed')
    ),
  collegeEmail: z.string().email('Invalid college email').transform(v => v.trim()).refine(e => {
    return e.endsWith('.edu') || e.endsWith('.ac.in');
  }, 'Must be a valid .edu or .ac.in email'),
  university: trimmedString(3, 'College name must be at least 3 characters'),
  degree: trimmedString(1, 'Degree/Major is required'),
  yearOfStudy: z.string().min(1, 'Year of study is required'),
  studentId: z.string().min(5, 'Student ID must be at least 5 characters').regex(/^[a-zA-Z0-9]+$/, 'Alphanumeric only'),
  skillTags: z.array(SkillTagSchema).min(1, 'Select at least one skill'),
  // Optional Fields
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  behanceUrl: z.string().url('Invalid Behance URL').optional().or(z.literal('')),
  certificationFile: z.any().optional(),
});

// 2. Company Schema
// REQUIRED: Contact Name, Email, Password, Company Name, Business Registration Number
export const CompanyRegistrationSchema = UserBaseSchema.extend({
  fullName: trimmedString(2, 'Contact person name must be at least 2 characters'),
  companyName: trimmedString(3, 'Company name must be at least 3 characters'),
  industry: trimmedString(1, 'Industry is required'),
  businessRegistrationNumber: z.string().min(6, 'Registration number must be at least 6 characters').regex(/^[a-zA-Z0-9]+$/, 'Alphanumeric only'),
  hiringNeeds: z.array(z.string()).min(1, 'Select at least one hiring interest'),
  wantsArena: z.boolean(),
});

// 3. General Gig Poster Schema
// REQUIRED: Name, Email, Password, Phone Number
export const PosterRegistrationSchema = UserBaseSchema.extend({
  fullName: trimmedString(1, 'Name or Alias is required'),
  phoneNumber: z.string().regex(/^(\+91)?\d{10}$/, 'Must be a valid 10-digit Indian mobile number'),
  otp: z.string().length(6, 'OTP must be 6 digits').optional(),
});

// Gig Schema
export const GigSchema = z.object({
  title: trimmedString(10, 'Title must be at least 10 characters').pipe(z.string().max(100, 'Max 100 characters')),
  description: trimmedString(50, 'Description must be at least 50 characters').pipe(z.string().max(1000, 'Max 1000 characters')),
  price: z.number().min(300, 'Minimum price is ₹300').nonnegative('No negative values'),
});

export type CosineRegistration = z.infer<typeof CosineRegistrationSchema>;
export type CompanyRegistration = z.infer<typeof CompanyRegistrationSchema>;
export type PosterRegistration = z.infer<typeof PosterRegistrationSchema>;
export type GigRegistration = z.infer<typeof GigSchema>;
