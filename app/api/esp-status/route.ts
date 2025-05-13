import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { water_level, battery, last_picture, last_taken, fire } = await request.json();

    // Validate required fields
    if (
      water_level === undefined ||
      battery === undefined ||
      !last_picture ||
      !last_taken ||
      fire === undefined
    ) {
      return NextResponse.json({ error: 'Semua field diperlukan' }, { status: 400 });
    }

    // Update the single esp_status record
    const updatedEspStatus = await prisma.esp_status.update({
      where: { id: 1 }, // Assuming the single record always has an ID of 1
      data: {
        water_level,
        battery,
        last_picture,
        last_taken: new Date(last_taken), // Ensure the date is properly formatted
        fire,
      },
    });

    return NextResponse.json({ id: updatedEspStatus.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}