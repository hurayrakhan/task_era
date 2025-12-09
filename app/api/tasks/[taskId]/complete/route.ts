/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, context: any) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { taskId } = context.params;
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    // Only assignee or admin can mark complete
    const team = await prisma.team.findUnique({ where: { id: task.teamId } });
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

    if (task.assignedTo !== user.id && team.createdBy !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.task.update({ where: { id: taskId }, data: { status: "COMPLETED" } });
    return NextResponse.json({ task: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
