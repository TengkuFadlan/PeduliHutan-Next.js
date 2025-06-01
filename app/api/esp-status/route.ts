import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import TelegramBot from 'node-telegram-bot-api';

// Initialize Telegram Bot with your token from environment variables
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || ''); // Provide an empty string as fallback

// Get the group chat ID from environment variables
const GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID;

export async function POST(request: Request) {
  try {
    const { water_level, fire } = await request.json();

    // Validate required fields
    if (water_level === undefined || fire === undefined) {
      return NextResponse.json({ error: 'Semua field diperlukan dan harus valid' }, { status: 400 });
    }

    const existingEspStatus = await prisma.esp_status.findUnique({
      where: { id: 1 },
    });

    let fireStatusChanged = false;

    if (existingEspStatus) {
      // Check if fire status has changed
      if (existingEspStatus.fire !== fire) {
        fireStatusChanged = true;
        // Record fire history
        await prisma.history.create({
          data: {
            fire,
            timestamp: new Date(),
          },
        });
      }

      // Check if water level has changed
      if (existingEspStatus.water_level !== water_level) {
        // Record water history
        await prisma.water_history.create({
          data: {
            water_level,
            timestamp: new Date(),
          },
        });
      }

      // Update the main ESP status
      const updatedEspStatus = await prisma.esp_status.update({
        where: { id: 1 },
        data: {
          water_level,
          last_taken: new Date(),
          fire,
        },
      });

      // Send Telegram notification if fire status changed
      if (fireStatusChanged && GROUP_CHAT_ID) {
        const fireMessage = fire
          ? '🚨 **PERHATIAN! Terdeteksi kebakaran!** Segera periksa lokasi.'
          : '✅ **Status kebakaran telah aman.**';

        try {
          await bot.sendMessage(GROUP_CHAT_ID, fireMessage, { parse_mode: 'Markdown' });
          console.log(`Telegram notification sent: ${fireMessage}`);
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }
      }

      return NextResponse.json({ id: updatedEspStatus.id }, { status: 200 });

    } else {
      // If no existing status, create a new one
      const createdEspStatus = await prisma.esp_status.create({
        data: {
          id: 1, // Assuming 'id: 1' is always the target for this ESP
          water_level,
          last_taken: new Date(),
          fire,
        },
      });

      // Send Telegram notification for initial fire status if it's 'true'
      if (fire && GROUP_CHAT_ID) {
        const fireMessage = '🚨 **PERHATIAN! Terdeteksi kebakaran!** Segera periksa lokasi.';
        try {
          await bot.sendMessage(GROUP_CHAT_ID, fireMessage, { parse_mode: 'Markdown' });
          console.log(`Telegram notification sent for initial fire detection: ${fireMessage}`);
        } catch (telegramError) {
          console.error('Failed to send Telegram notification:', telegramError);
        }
      }

      return NextResponse.json({ id: createdEspStatus.id }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}