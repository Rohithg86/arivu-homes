
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const projects = [
        {
            name: "Commercial Rental Building in Jigani, Classic Elmwood Layout (G+2)",
            location: "Jigani, Classic Elmwood Layout, Bangalore",
            type: "Commercial",
            startDate: "",
            expectedCompletion: "",
            completionPercentage: 0,
            status: "In Progress",
            description: "Commercial rental building (G+2) – current project.",
            images: JSON.stringify([
                "/uploads/projects/jigani/elevation.jpg",
                "/uploads/projects/jigani/1.jpg",
                "/uploads/projects/jigani/2.jpg",
            ]),
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
            images: JSON.stringify([
                "/uploads/projects/magadi/elevation.jpg",
                "/uploads/projects/magadi/1.jpg",
                "/uploads/projects/magadi/2.jpg",
            ]),
        },
        {
            name: "Yash House Renovation",
            location: "Bangalore",
            type: "Renovation",
            status: "Completed",
            description: "Complete house renovation project.",
            client: "Yash",
            startDate: "2024",
            expectedCompletion: "2025",
            completionPercentage: 100,
            images: JSON.stringify([
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
            ]),
        }
    ];

    for (const p of projects) {
        // Upsert to avoid triggering errors on re-runs or unique constraint issues if name was unique (it's not but safer)
        // Actually, simple createMany or check exists is fine. 
        // Since this runs at build time on volatile DB, just create.
        try {
            await prisma.project.create({ data: p });
            console.log(`Created project: ${p.name}`);
        } catch (e) {
            console.log(`Skipping or failed ${p.name}:`, e);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
