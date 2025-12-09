import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
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

  try {
    // Soft delete the user
    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        deletedBy: currentUser.id,
      },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        action: "DELETE_USER",
        entityType: "User",
        entityId: deletedUser.id,
        userId: currentUser.id,
        details: { 
          userEmail: deletedUser.email,
          userName: deletedUser.name,
        },
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Failed to delete user", { status: 500 });
  }
}