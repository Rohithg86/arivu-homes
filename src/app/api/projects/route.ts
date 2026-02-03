import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminCookieName, verifyAdminSession } from '@/lib/adminAuth';

export async function GET() {
  try {
    // Seed on first run (so production comes up with the required two projects automatically)
    const count = await prisma.project.count();
    if (count === 0) {
      await prisma.project.createMany({
        data: [
          {
            name: "Commercial Rental Building in Jigani, Classic Elmwood Layout (G+2)",
            location: "Jigani, Classic Elmwood Layout, Bangalore",
            type: "Commercial",
            startDate: "",
            expectedCompletion: "",
            completionPercentage: 0,
            status: "In Progress",
            description: "Commercial rental building (G+2) – current project.",
            images: [
              "/uploads/projects/jigani/elevation.jpg",
              "/uploads/projects/jigani/1.jpg",
              "/uploads/projects/jigani/2.jpg",
            ],
          },
          {
            name: "G+2 Individual Building near Sita Circle, Magadi Road",
            location: "Near Sita Circle, Magadi Road, Bangalore",
            type: "Residential",
            startDate: "",
            expectedCompletion: "",
            completionPercentage: 0,
            status: "In Progress",
            description: "G+2 individual building – current project.",
            images: [
              "/uploads/projects/magadi/elevation.jpg",
              "/uploads/projects/magadi/1.jpg",
              "/uploads/projects/magadi/2.jpg",
            ],
          },
          {
            name: "Yash House Renovation",
            location: "Bangalore",
            type: "Renovation",
            startDate: "2024",
            expectedCompletion: "2025",
            completionPercentage: 100,
            status: "Completed",
            description: "Complete house renovation project.",
            client: "Yash",
            images: [
              "/uploads/completed/yash/1.jpg",
              "/uploads/completed/yash/2.jpg",
              "/uploads/completed/yash/3.jpg",
              "/uploads/completed/yash/4.jpg",
              "/uploads/completed/yash/5.jpg",
              "/uploads/completed/yash/6.jpg",
              "/uploads/completed/yash/7.jpg",
              "/uploads/completed/yash/8.jpg",
              "/uploads/completed/yash/9.jpg",
              "/uploads/completed/yash/10.jpg",
            ],
          },
        ],
      });
    }

    const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback for environments where DB isn't available (e.g. serverless + sqlite)
    const fallback = [
      {
        id: 1,
        name: "Commercial Rental Building in Jigani, Classic Elmwood Layout (G+2)",
        location: "Jigani, Classic Elmwood Layout, Bangalore",
        type: "Commercial",
        startDate: "",
        expectedCompletion: "",
        completionPercentage: 0,
        status: "Ongoing",
        description: "Commercial rental building (G+2) – ongoing project.",
        images: [
          "/uploads/projects/jigani/elevation.jpg",
          "/uploads/projects/jigani/1.jpg",
          "/uploads/projects/jigani/2.jpg",
        ],
      },
      {
        id: 2,
        name: "G+2 Individual Building near Sita Circle, Magadi Road",
        location: "Near Sita Circle, Magadi Road, Bangalore",
        type: "Residential",
        startDate: "",
        expectedCompletion: "",
        completionPercentage: 0,
        status: "Ongoing",
        description: "G+2 individual building – ongoing project.",
        images: [
          "/uploads/projects/magadi/elevation.jpg",
          "/uploads/projects/magadi/1.jpg",
          "/uploads/projects/magadi/2.jpg",
        ],
      },
      {
        id: 3,
        name: "Yash House Renovation",
        location: "Bangalore",
        type: "Renovation",
        startDate: "2024",
        expectedCompletion: "2025",
        completionPercentage: 100,
        status: "Completed",
        description: "Complete house renovation project.",
        client: "Yash",
        images: [
          "/uploads/completed/yash/1.jpg",
          "/uploads/completed/yash/2.jpg",
          "/uploads/completed/yash/3.jpg",
          "/uploads/completed/yash/4.jpg",
          "/uploads/completed/yash/5.jpg",
          "/uploads/completed/yash/6.jpg",
          "/uploads/completed/yash/7.jpg",
          "/uploads/completed/yash/8.jpg",
          "/uploads/completed/yash/9.jpg",
          "/uploads/completed/yash/10.jpg",
        ],
      },
    ];
    return NextResponse.json(fallback);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(getAdminCookieName())?.value;
    const v = verifyAdminSession(token);
    if (!v.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.location) {
      return NextResponse.json({ error: 'Name and location are required' }, { status: 400 });
    }

    const created = await prisma.project.create({
      data: {
        name: body.name,
        location: body.location,
        client: body.client ?? null,
        type: body.type ?? "",
        startDate: body.startDate ?? "",
        expectedCompletion: body.expectedCompletion ?? "",
        completionPercentage: Number(body.completionPercentage ?? 0),
        status: body.status ?? "Planning",
        description: body.description ?? "",
        images: Array.isArray(body.images) ? body.images : [],
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(getAdminCookieName())?.value;
    const v = verifyAdminSession(token);
    if (!v.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const updated = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.name !== undefined ? { name: updateData.name } : {}),
        ...(updateData.location !== undefined ? { location: updateData.location } : {}),
        ...(updateData.client !== undefined ? { client: updateData.client } : {}),
        ...(updateData.type !== undefined ? { type: updateData.type } : {}),
        ...(updateData.startDate !== undefined ? { startDate: updateData.startDate } : {}),
        ...(updateData.expectedCompletion !== undefined ? { expectedCompletion: updateData.expectedCompletion } : {}),
        ...(updateData.completionPercentage !== undefined
          ? { completionPercentage: Number(updateData.completionPercentage) }
          : {}),
        ...(updateData.status !== undefined ? { status: updateData.status } : {}),
        ...(updateData.description !== undefined ? { description: updateData.description } : {}),
        ...(updateData.images !== undefined ? { images: updateData.images } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    const message = error instanceof Error ? error.message : 'Failed to update project';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(getAdminCookieName())?.value;
    const v = verifyAdminSession(token);
    if (!v.ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    await prisma.project.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
