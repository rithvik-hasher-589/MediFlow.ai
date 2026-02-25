import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { intakeSchema } from "../schemas/intake.schema";

function generateQueueNumber(): string {
  return "A" + (1000 + Math.floor(Math.random() * 9000));
}

export async function submitIntake(req: Request, res: Response): Promise<void> {
  try {
    const data = intakeSchema.parse(req.body);
    const queueNumber = generateQueueNumber();

    const patient = await prisma.patient.create({
      data: {
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        visitType: data.visitType,
        healthConcern: data.healthConcern,
        queueNumber,
        answers: {
          create: data.answers,
        },
      },
    });

    res.json({
      success: true,
      queueNumber,
      patientId: patient.id,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: "Invalid submission",
        details: process.env.NODE_ENV !== "production" ? err.flatten() : undefined,
      });
      return;
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", err);
      const message =
      err instanceof Error ? err.message : "Invalid submission";
      res.status(400).json({ error: message });
      return;
    }
    console.error("Intake submission error:", err);
    res.status(400).json({ error: "Invalid submission" });
  }
}
