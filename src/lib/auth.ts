import { cookies } from "next/headers";

export async function getCurrentUser() {
  const c = await cookies();
  const id = c.get("userId")?.value;
  if (!id) return null;
  return { id, name: id, role: "admin" };
}

export async function setSession(userId: string) {
  const c = await cookies();
  c.set("userId", userId, { httpOnly: true, path: "/" });
}

export async function clearSession() {
  const c = await cookies();
  c.delete("userId");
}
