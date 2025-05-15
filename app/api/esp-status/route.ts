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

    // Upsert: update jika ada, buat baru jika tidak ada
    const upsertedEspStatus = await prisma.esp_status.upsert({
      where: { id: 1 }, // Asumsi id: 1 untuk satu-satunya record
      update: {
        water_level,
        battery,
        last_picture,
        last_taken: new Date(last_taken),
        fire,
      },
      create: {
        id: 1,
        water_level,
        battery,
        last_picture,
        last_taken: new Date(last_taken),
        fire,
      },
    });

    return NextResponse.json({ id: upsertedEspStatus.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}