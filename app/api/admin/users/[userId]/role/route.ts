import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { role } = await request.json();
  if (!role || !["ADMIN", "USER"].includes(role)) {
    return new NextResponse("Invalid role", { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: "UPDATE_USER_ROLE",
        entityType: "User",
        entityId: updatedUser.id,
        userId: currentUser.id,
        details: { oldRole: updatedUser.role, newRole: role },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return new NextResponse("Failed to update user role", { status: 500 });
  }
}
