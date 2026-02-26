import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'database/src/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const product = searchParams.get('product');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {};
    
    if (product) {
      where.product = product.toUpperCase();
    }
    
    if (category) {
      where.category = category.toUpperCase();
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { keyHighlights: { hasSome: [search] } },
      ];
    }

    // Fetch updates with filtering and pagination
    const [updates, total] = await Promise.all([
      prisma.update.findMany({
        where,
        orderBy: { announcementDate: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.update.count({ where }),
    ]);

    return NextResponse.json({
      updates,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    );
  }
}
