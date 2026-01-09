import { NextRequest, NextResponse } from "next/server";
//import { getServerSession } from "next-auth";
//import { authOptions } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: { donations: true },
        },
        updates: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        milestones: {
          orderBy: { targetDate: "asc" },
        },
        impactMetrics: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Project detail GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
