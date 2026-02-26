import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'database/src/client';

export async function GET(request: NextRequest) {
  try {
    // Get stats for each product
    const [
      antigravityCount,
      cursorCount,
      warpCount,
      claudeCodeCount,
      totalCount,
      latestUpdates,
    ] = await Promise.all([
      prisma.update.count({ where: { product: 'ANTIGRAVITY' } }),
      prisma.update.count({ where: { product: 'CURSOR' } }),
      prisma.update.count({ where: { product: 'WARP' } }),
      prisma.update.count({ where: { product: 'CLAUDE_CODE' } }),
      prisma.update.count(),
      prisma.update.findMany({
        orderBy: { announcementDate: 'desc' },
        take: 1,
        select: {
          product: true,
          announcementDate: true,
        },
      }),
    ]);

    // Get latest update per product
    const latestPerProduct = await Promise.all([
      prisma.update.findFirst({
        where: { product: 'ANTIGRAVITY' },
        orderBy: { announcementDate: 'desc' },
      }),
      prisma.update.findFirst({
        where: { product: 'CURSOR' },
        orderBy: { announcementDate: 'desc' },
      }),
      prisma.update.findFirst({
        where: { product: 'WARP' },
        orderBy: { announcementDate: 'desc' },
      }),
      prisma.update.findFirst({
        where: { product: 'CLAUDE_CODE' },
        orderBy: { announcementDate: 'desc' },
      }),
    ]);

    return NextResponse.json({
      totalUpdates: totalCount,
      byProduct: {
        antigravity: antigravityCount,
        cursor: cursorCount,
        warp: warpCount,
        claudeCode: claudeCodeCount,
      },
      latestPerProduct: {
        antigravity: latestPerProduct[0],
        cursor: latestPerProduct[1],
        warp: latestPerProduct[2],
        claudeCode: latestPerProduct[3],
      },
      lastUpdate: latestUpdates[0]?.announcementDate || null,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
