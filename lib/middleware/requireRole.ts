import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAuth(req: any, roles: string[] = []) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  if (roles.length && !roles.includes(session.user.role)) {
    return null;
  }

  return session;
}