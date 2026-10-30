const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password123", 10);
  const dept = await prisma.department.create({ data: { name: "Production A" } });
  const dept2 = await prisma.department.create({ data: { name: "Warehouse" } });
  const skill = await prisma.skill.create({ data: { name: "Machine Op" } });
  const shifts = await Promise.all([
    prisma.shift.create({ data: { name: "เช้า", startTime: "06:00", endTime: "14:00", color: "#f59e0b" } }),
    prisma.shift.create({ data: { name: "บ่าย", startTime: "14:00", endTime: "22:00", color: "#3b82f6" } }),
    prisma.shift.create({ data: { name: "ดึก", startTime: "22:00", endTime: "06:00", color: "#8b5cf6" } }),
  ]);
  const emp = await prisma.employee.create({ data: { code: "F001", name: "พนักงาน 001", departmentId: dept.id } });
  await prisma.employeeSkill.create({ data: { employeeId: emp.id, skillId: skill.id } });
  const roles = ["admin", "manager", "employee", "supervisor", "shift_leader"];
  for (const r of roles) {
    await prisma.user.create({ data: { email: `${r}@factory.com`, password: hashed, name: r, role: r, employeeId: r === "employee" ? emp.id : null } });
  }
  console.log("seeded");
}
main().finally(() => prisma.$disconnect());
