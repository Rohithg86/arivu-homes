import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectInfo, categories } = body;

    // Calculate totals
    const totalAmount = categories.reduce((sum: number, category: any) => {
      return sum + category.items.reduce((itemSum: number, item: any) => {
        return itemSum + (item.quantity * item.rate);
      }, 0);
    }, 0);

    const contingency = totalAmount * 0.05;
    const gst = totalAmount * 0.18;
    const grandTotal = totalAmount + contingency + gst;

    // Generate BOQ report
    const boqReport = {
      projectInfo,
      categories: categories.map((category: any) => ({
        ...category,
        subtotal: category.items.reduce((sum: number, item: any) => sum + (item.quantity * item.rate), 0)
      })),
      summary: {
        subtotal: totalAmount,
        contingency,
        gst,
        grandTotal
      },
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(boqReport);
  } catch (error) {
    console.error('Error generating BOQ:', error);
    return NextResponse.json({ error: 'Failed to generate BOQ' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return default BOQ template
    const defaultTemplate = {
      categories: [
        {
          name: "Earthwork",
          items: [
            { description: "Excavation for foundation", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "Backfilling", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "Compaction", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
          ]
        },
        {
          name: "Concrete Work",
          items: [
            { description: "RCC Foundation", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "RCC Columns", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "RCC Beams", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "RCC Slab", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
          ]
        },
        {
          name: "Masonry",
          items: [
            { description: "Brick masonry 1st class", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "Block masonry", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
            { description: "Stone masonry", unit: "Cum", quantity: 0, rate: 0, amount: 0 },
          ]
        },
        {
          name: "Finishing",
          items: [
            { description: "Plastering 12mm", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
            { description: "Painting 2 coats", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
            { description: "Flooring tiles", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
            { description: "False ceiling", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
          ]
        },
        {
          name: "Electrical",
          items: [
            { description: "Electrical wiring", unit: "Sqm", quantity: 0, rate: 0, amount: 0 },
            { description: "Light fixtures", unit: "Nos", quantity: 0, rate: 0, amount: 0 },
            { description: "Power outlets", unit: "Nos", quantity: 0, rate: 0, amount: 0 },
          ]
        },
        {
          name: "Plumbing",
          items: [
            { description: "Water supply pipes", unit: "Rmt", quantity: 0, rate: 0, amount: 0 },
            { description: "Drainage pipes", unit: "Rmt", quantity: 0, rate: 0, amount: 0 },
            { description: "Sanitary fixtures", unit: "Nos", quantity: 0, rate: 0, amount: 0 },
          ]
        }
      ]
    };

    return NextResponse.json(defaultTemplate);
  } catch (error) {
    console.error('Error fetching BOQ template:', error);
    return NextResponse.json({ error: 'Failed to fetch BOQ template' }, { status: 500 });
  }
}
