import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { messageTable } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const messages = await db.select().from(messageTable);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await db.insert(messageTable).values(body);
    return NextResponse.json({ message: 'Message created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
