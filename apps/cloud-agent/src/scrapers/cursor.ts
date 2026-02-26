import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { Product, Category } from 'shared-types';
import { ScraperResult, ScrapedUpdate } from '../types.js';

export async function scrapeCursor(): Promise<ScraperResult> {
  console.log('🔍 Scraping Cursor updates...');
  
  try {
    // Cursor changelog page
    const response = await fetch('https://cursor.com/changelog');
    const html = await response.text();
    const $ = cheerio.load(html);

    const updates: ScrapedUpdate[] = [];

    // This is a simplified scraper - the actual structure may vary
    // In production, you'd need to inspect the actual HTML structure
    $('article, .changelog-entry, [class*="changelog"]').slice(0, 10).each((_, element) => {
      const $el = $(element);
      const title = $el.find('h2, h3, .title').first().text().trim();
      const dateText = $el.find('time, .date').first().text().trim();
      const content = $el.text().trim();

      if (title && title.length > 5) {
        updates.push({
          product: Product.CURSOR,
          title,
          announcementDate: new Date(dateText || Date.now()),
          keyHighlights: extractHighlights(content),
          version: extractVersion(title),
          changelogUrl: 'https://cursor.com/changelog',
          category: Category.RELEASE,
          rawContent: content.substring(0, 500),
        });
      }
    });

    console.log(`✅ Found ${updates.length} Cursor updates`);
    
    return {
      success: true,
      updates,
    };
  } catch (error) {
    console.error('❌ Error scraping Cursor:', error);
    // Return mock update so the agent doesn't fail completely
    return {
      success: false,
      updates: [{
        product: Product.CURSOR,
        title: 'Cursor Updates Available',
        announcementDate: new Date(),
        keyHighlights: ['Check cursor.com/changelog for latest updates'],
        changelogUrl: 'https://cursor.com/changelog',
        category: Category.ANNOUNCEMENT,
      }],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function extractHighlights(text: string): string[] {
  const sentences = text.split(/[.!?]\s+/).filter((s) => s.trim().length > 20);
  return sentences.slice(0, 3);
}

function extractVersion(title: string): string | undefined {
  const versionMatch = title.match(/v?(\d+\.\d+(?:\.\d+)?)/);
  return versionMatch ? versionMatch[1] : undefined;
}
