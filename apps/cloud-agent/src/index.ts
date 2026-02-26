#!/usr/bin/env node

import { scrapeAntigravity } from './scrapers/antigravity.js';
import { scrapeCursor } from './scrapers/cursor.js';
import { scrapeWarp } from './scrapers/warp.js';
import { scrapeClaudeCode } from './scrapers/claude-code.js';
import { postUpdates } from './utils/api-client.js';
import { ScrapedUpdate } from './types.js';

async function main() {
  console.log('🚀 Starting AI Dev Tools Update Scraper...');
  console.log('⏰ Started at:', new Date().toISOString());
  console.log('');

  const allUpdates: ScrapedUpdate[] = [];
  let successCount = 0;
  let failCount = 0;

  // Run all scrapers
  const scrapers = [
    { name: 'Antigravity', fn: scrapeAntigravity },
    { name: 'Cursor', fn: scrapeCursor },
    { name: 'Warp', fn: scrapeWarp },
    { name: 'Claude Code', fn: scrapeClaudeCode },
  ];

  for (const scraper of scrapers) {
    try {
      const result = await scraper.fn();
      
      if (result.success) {
        successCount++;
        allUpdates.push(...result.updates);
        console.log(`✅ ${scraper.name}: ${result.updates.length} updates`);
      } else {
        failCount++;
        console.log(`⚠️  ${scraper.name}: Failed - ${result.error}`);
        // Still add any updates even if marked as failed
        if (result.updates.length > 0) {
          allUpdates.push(...result.updates);
        }
      }
    } catch (error) {
      failCount++;
      console.error(`❌ ${scraper.name}: Unexpected error:`, error);
    }
    
    // Small delay between scrapers to be polite
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('');
  console.log('📊 Scraping Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total updates collected: ${allUpdates.length}`);
  console.log('');

  // Post updates to API if we have any
  if (allUpdates.length > 0) {
    const posted = await postUpdates(allUpdates);
    
    if (posted) {
      console.log('✨ Agent run completed successfully!');
    } else {
      console.error('⚠️  Agent completed but failed to post updates');
      process.exit(1);
    }
  } else {
    console.log('⚠️  No updates to post');
  }

  console.log('');
  console.log('⏰ Finished at:', new Date().toISOString());
}

// Run the agent
main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
