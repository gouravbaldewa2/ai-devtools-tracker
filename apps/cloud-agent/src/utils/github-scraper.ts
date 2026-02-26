import fetch from 'node-fetch';
import { Product, Category } from 'shared-types';
import { ScrapedUpdate } from '../types.js';

interface GitHubRelease {
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string;
}

export async function scrapeGitHubReleases(
  repo: string,
  product: Product,
  limit: number = 5
): Promise<ScrapedUpdate[]> {
  try {
    const url = `https://api.github.com/repos/${repo}/releases?per_page=${limit}`;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'AI-DevTools-Tracker',
    };

    // Add GitHub token if available for better rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const releases: GitHubRelease[] = await response.json() as GitHubRelease[];

    return releases.map((release) => {
      // Extract key highlights from body (first 3-5 bullet points or lines)
      const highlights = extractHighlights(release.body);

      return {
        product,
        title: release.name || release.tag_name,
        announcementDate: new Date(release.published_at),
        keyHighlights: highlights,
        version: release.tag_name.replace(/^v/, ''),
        changelogUrl: release.html_url,
        category: Category.RELEASE,
        rawContent: release.body,
      };
    });
  } catch (error) {
    console.error(`Failed to scrape GitHub releases for ${repo}:`, error);
    return [];
  }
}

function extractHighlights(body: string): string[] {
  const lines = body.split('\n').filter((line) => line.trim());
  const highlights: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Look for bullet points or numbered lists
    if (
      (trimmed.startsWith('- ') ||
        trimmed.startsWith('* ') ||
        trimmed.startsWith('+ ') ||
        /^\d+\./.test(trimmed)) &&
      highlights.length < 5
    ) {
      // Clean up markdown formatting
      const cleaned = trimmed
        .replace(/^[-*+]\s+/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/[*_`]/g, '')
        .trim();
      
      if (cleaned.length > 10 && cleaned.length < 200) {
        highlights.push(cleaned);
      }
    }
  }

  // If no bullet points found, take first few meaningful lines
  if (highlights.length === 0) {
    const meaningfulLines = lines
      .filter((line) => line.trim().length > 20)
      .slice(0, 3);
    highlights.push(...meaningfulLines);
  }

  return highlights.slice(0, 5);
}
