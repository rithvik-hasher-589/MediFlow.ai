import { z } from "zod";

export const intakeSchema = z.object({
  fullName: z.string(),
  age: z.number(),
  gender: z.string(),
  phone: z.string(),
  visitType: z.string(),
  healthConcern: z.string(),
  answers: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export type IntakeInput = z.infer<typeof intakeSchema>;
