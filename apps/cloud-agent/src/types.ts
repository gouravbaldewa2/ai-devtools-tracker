import { Product, Category } from 'shared-types';

export interface ScrapedUpdate {
  product: Product;
  title: string;
  announcementDate: Date;
  keyHighlights: string[];
  version?: string;
  changelogUrl: string;
  category: Category;
  rawContent?: string;
}

export interface ScraperResult {
  success: boolean;
  updates: ScrapedUpdate[];
  error?: string;
}
