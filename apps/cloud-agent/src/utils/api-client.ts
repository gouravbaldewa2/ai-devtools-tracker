import fetch from 'node-fetch';
import { ScrapedUpdate } from '../types.js';

const DEFAULT_API_URL = 'http://localhost:3000/api';

// Prefer BACKEND_API_URL if provided. Otherwise, if NEXT_PUBLIC_APP_URL is set (as in .env.example),
// use that as the base URL and append `/api`.
const API_URL =
  process.env.BACKEND_API_URL ||
  (process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')}/api`
    : DEFAULT_API_URL);

// Prefer BACKEND_API_KEY for backwards compatibility, but default to AGENT_API_KEY
// (which is what the Next.js API route expects per .env.example).
const API_KEY = process.env.BACKEND_API_KEY || process.env.AGENT_API_KEY || '';

export async function postUpdates(updates: ScrapedUpdate[]): Promise<boolean> {
  try {
    if (!API_KEY) {
      console.error('❌ Missing API key: set AGENT_API_KEY (or BACKEND_API_KEY)');
      return false;
    }

    console.log(`📤 Posting ${updates.length} updates to API (${API_URL})...`);

    const response = await fetch(`${API_URL}/updates/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ updates }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ API Error (${response.status}):`, error);
      return false;
    }

    const result = await response.json();
    console.log(`✅ Posted successfully:`, result);
    return true;
  } catch (error) {
    console.error('❌ Failed to post updates:', error);
    return false;
  }
}
