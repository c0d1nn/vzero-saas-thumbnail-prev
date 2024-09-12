import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { isAuthenticated } = getKindeServerSession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { userId, channelName } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { channelName },
    });

    return NextResponse.json({ success: true, channelName: updatedUser.channelName });
  } catch (error) {
    console.error('Error updating channel name:', error);
    return NextResponse.json({ success: false, error: 'Failed to update channel name' }, { status: 500 });
  }
}
