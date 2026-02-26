import fetch from 'node-fetch';
import { ScrapedUpdate } from '../types.js';

const API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/api';
const API_KEY = process.env.BACKEND_API_KEY || '';

export async function postUpdates(updates: ScrapedUpdate[]): Promise<boolean> {
  try {
    console.log(`📤 Posting ${updates.length} updates to API...`);
    
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
