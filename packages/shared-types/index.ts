export enum Product {
  ANTIGRAVITY = 'ANTIGRAVITY',
  CURSOR = 'CURSOR',
  WARP = 'WARP',
  CLAUDE_CODE = 'CLAUDE_CODE',
}

export enum Category {
  FEATURE = 'FEATURE',
  BUGFIX = 'BUGFIX',
  IMPROVEMENT = 'IMPROVEMENT',
  RELEASE = 'RELEASE',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export interface Update {
  id: string;
  product: Product;
  title: string;
  announcementDate: Date | string;
  keyHighlights: string[];
  version?: string | null;
  changelogUrl: string;
  category: Category;
  scrapedAt: Date | string;
  rawContent?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UpdatesResponse {
  updates: Update[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface StatsResponse {
  totalUpdates: number;
  byProduct: {
    antigravity: number;
    cursor: number;
    warp: number;
    claudeCode: number;
  };
  latestPerProduct: {
    antigravity: Update | null;
    cursor: Update | null;
    warp: Update | null;
    claudeCode: Update | null;
  };
  lastUpdate: Date | string | null;
}

export const PRODUCT_INFO = {
  [Product.ANTIGRAVITY]: {
    name: 'Antigravity',
    description: 'Google AI IDE',
    color: '#4285F4',
    url: 'https://antigravity.google',
  },
  [Product.CURSOR]: {
    name: 'Cursor',
    description: 'AI Code Editor',
    color: '#8B5CF6',
    url: 'https://cursor.com',
  },
  [Product.WARP]: {
    name: 'Warp',
    description: 'Agentic Terminal',
    color: '#01CFFD',
    url: 'https://warp.dev',
  },
  [Product.CLAUDE_CODE]: {
    name: 'Claude Code',
    description: 'AI Terminal Tool',
    color: '#D4A574',
    url: 'https://github.com/anthropics/claude-code',
  },
} as const;
