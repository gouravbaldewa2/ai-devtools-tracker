import { Product } from 'shared-types';
import { ScraperResult } from '../types.js';
import { scrapeGitHubReleases } from '../utils/github-scraper.js';

export async function scrapeWarp(): Promise<ScraperResult> {
  console.log('🔍 Scraping Warp updates...');
  
  try {
    const updates = await scrapeGitHubReleases(
      'warpdotdev/Warp',
      Product.WARP,
      10 // Get last 10 releases
    );

    console.log(`✅ Found ${updates.length} Warp updates`);
    
    return {
      success: true,
      updates,
    };
  } catch (error) {
    console.error('❌ Error scraping Warp:', error);
    return {
      success: false,
      updates: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
