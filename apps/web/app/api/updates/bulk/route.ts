import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'database/src/client';

// Middleware to verify API key
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.AGENT_API_KEY;
  
  if (!expectedKey) {
    console.error('AGENT_API_KEY not configured');
    return false;
  }
  
  return apiKey === expectedKey;
}

export async function POST(request: NextRequest) {
  // Verify API key
  if (!verifyApiKey(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: 'Invalid payload: updates array required' },
        { status: 400 }
      );
    }

    // Validate each update
    for (const update of updates) {
      if (!update.product || !update.title || !update.announcementDate || !update.changelogUrl) {
        return NextResponse.json(
          { error: 'Invalid update: missing required fields' },
          { status: 400 }
        );
      }
    }

    // Insert updates using createMany
    const result = await prisma.update.createMany({
      data: updates.map((update: any) => ({
        product: update.product.toUpperCase(),
        title: update.title,
        announcementDate: new Date(update.announcementDate),
        keyHighlights: update.keyHighlights || [],
        version: update.version || null,
        changelogUrl: update.changelogUrl,
        category: update.category?.toUpperCase() || 'FEATURE',
        rawContent: update.rawContent || null,
      })),
      skipDuplicates: true, // Skip if already exists
    });

    return NextResponse.json({
      success: true,
      inserted: result.count,
      message: `Successfully inserted ${result.count} updates`,
    });
  } catch (error) {
    console.error('Error inserting updates:', error);
    return NextResponse.json(
      { error: 'Failed to insert updates' },
      { status: 500 }
    );
  }
}
