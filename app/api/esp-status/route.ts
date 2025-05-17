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
      fire === undefined ||
      last_picture.trim() === "" ||
      last_taken.trim() === "" ||
      isNaN(Date.parse(last_taken))
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
            timestamp: new Date(last_taken),
          },
        });
      }
      const updatedEspStatus = await prisma.esp_status.update({
        where: { id: 1 },
        data: {
          water_level,
          battery,
          last_picture,
          last_taken: new Date(last_taken),
          fire,
        },
      });
      return NextResponse.json({ id: updatedEspStatus.id }, { status: 200 });
    } else {
      const createdEspStatus = await prisma.esp_status.create({
        data: {
          id: 1,
          water_level,
          battery,
          last_picture,
          last_taken: new Date(last_taken),
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