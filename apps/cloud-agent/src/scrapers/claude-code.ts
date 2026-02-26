import { Product } from 'shared-types';
import { ScraperResult } from '../types.js';
import { scrapeGitHubReleases } from '../utils/github-scraper.js';

export async function scrapeClaudeCode(): Promise<ScraperResult> {
  console.log('🔍 Scraping Claude Code updates...');
  
  try {
    const updates = await scrapeGitHubReleases(
      'anthropics/claude-code',
      Product.CLAUDE_CODE,
      10 // Get last 10 releases
    );

    console.log(`✅ Found ${updates.length} Claude Code updates`);
    
    return {
      success: true,
      updates,
    };
  } catch (error) {
    console.error('❌ Error scraping Claude Code:', error);
    return {
      success: false,
      updates: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
