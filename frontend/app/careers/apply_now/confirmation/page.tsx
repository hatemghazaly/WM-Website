import type { Metadata } from "next";
import ApplicationConfirmationClient from "./confirmation-client";

export const metadata: Metadata = {
  title: "Application Received | Willi Med",
  description: "Confirmation page after submitting a career application.",
};

export default function ApplicationConfirmationPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const nameValue = searchParams?.name;
  const roleValue = searchParams?.role;
  const name = Array.isArray(nameValue) ? nameValue[0] : nameValue;
  const role = Array.isArray(roleValue) ? roleValue[0] : roleValue;

  return <ApplicationConfirmationClient name={name} role={role} />;
}
