import { apiFetch } from "./client";

export interface IntakePayload {
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  visitType: string;
  healthConcern: string;
  answers: {
    question: string;
    answer: string;
  }[];
}

export interface IntakeResponse {
  queueNumber: string;
  patientId: string;
}

export function submitIntake(payload: IntakePayload) {
  return apiFetch<IntakeResponse>("/api/intake", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
