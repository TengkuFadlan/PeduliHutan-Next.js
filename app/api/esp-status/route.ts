import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { water_level, fire } = await request.json();

    // Validate required fields
    if (
      water_level === undefined ||
      fire === undefined
    ) {
      return NextResponse.json({ error: 'Semua field diperlukan dan harus valid' }, { status: 400 });
    }

    const existingEspStatus = await prisma.esp_status.findUnique({
      where: { id: 1 },
    });

    if (existingEspStatus) {
      if (existingEspStatus.fire !== fire) {
        await prisma.history.create({
          data: {
            fire,
            timestamp: new Date(),
          },
        });
      }
      const updatedEspStatus = await prisma.esp_status.update({
        where: { id: 1 },
        data: {
          water_level,
          last_taken: new Date(),
          fire,
        },
      });
      return NextResponse.json({ id: updatedEspStatus.id }, { status: 200 });
    } else {
      const createdEspStatus = await prisma.esp_status.create({
        data: {
          id: 1,
          water_level,
          last_taken: new Date(),
          fire,
        },
      });
      return NextResponse.json({ id: createdEspStatus.id }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}