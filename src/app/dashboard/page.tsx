import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard-client";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const employees = await prisma.employee.count();
  const shifts = await prisma.shift.findMany();
  const assignments = await prisma.schedule.count();
  const leaves = await prisma.leaveRequest.count({ where: { status: "pending" } });
  return <DashboardClient user={user} stats={{ employees, shifts: shifts.length, schedules: assignments, leaves }} shifts={shifts} />;
}