import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, return sample data since we don't have a Project model in Prisma yet
    const projects = [
      {
        id: 1,
        name: "Luxury Villa - Whitefield",
        location: "Whitefield, Bangalore",
        type: "Residential",
        startDate: "2024-01-15",
        expectedCompletion: "2024-12-30",
        completionPercentage: 75,
        status: "In Progress",
        description: "Modern luxury villa with smart home features and sustainable design.",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400"],
        budget: 25000000,
        actualCost: 18750000,
      },
      {
        id: 2,
        name: "Commercial Complex - Koramangala",
        location: "Koramangala, Bangalore",
        type: "Commercial",
        startDate: "2024-03-01",
        expectedCompletion: "2025-06-15",
        completionPercentage: 45,
        status: "In Progress",
        description: "Multi-story commercial complex with retail and office spaces.",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"],
        budget: 50000000,
        actualCost: 22500000,
      },
      {
        id: 3,
        name: "Apartment Renovation - Indiranagar",
        location: "Indiranagar, Bangalore",
        type: "Renovation",
        startDate: "2024-02-10",
        expectedCompletion: "2024-08-20",
        completionPercentage: 90,
        status: "Near Completion",
        description: "Complete renovation of 3BHK apartment with modern interiors.",
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
        budget: 1500000,
        actualCost: 1350000,
      },
    ];

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.location) {
      return NextResponse.json({ error: 'Name and location are required' }, { status: 400 });
    }

    // For now, return the project data with a generated ID
    // In a real implementation, you would save this to the database
    const newProject = {
      id: Date.now(), // Simple ID generation
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // For now, return the updated project data
    // In a real implementation, you would update the database
    const updatedProject = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // For now, return success
    // In a real implementation, you would delete from the database
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
