import { prisma } from './src/client';

async function main() {
  console.log('🌱 Seeding database with mock data...');

  const updates = [
    {
      product: 'ANTIGRAVITY',
      title: 'Antigravity Public Preview Launch',
      announcementDate: new Date('2025-11-18'),
      keyHighlights: [
        'Agent-first interface for autonomous coding',
        'Powered by Gemini 3 Pro and Gemini 3 Flash',
        'Available free for individuals with generous rate limits',
      ],
      version: '1.0.0',
      changelogUrl: 'https://blog.google/products/gemini/gemini-3/',
      category: 'RELEASE',
      rawContent: 'Launch announcement for Antigravity',
    },
    {
      product: 'CURSOR',
      title: 'Cursor 2.3 Stability Release',
      announcementDate: new Date('2025-12-22'),
      keyHighlights: [
        'Process separation for extensions',
        'Improved stability and performance',
        'Bug fixes and polish',
      ],
      version: '2.3.0',
      changelogUrl: 'https://forum.cursor.com/t/cursor-2-3-is-here/147076',
      category: 'RELEASE',
      rawContent: 'Stability-focused release',
    },
    {
      product: 'CURSOR',
      title: 'Long-Running Agents and Sandbox Support',
      announcementDate: new Date('2026-02-01'),
      keyHighlights: [
        'Cross-platform sandbox for secure agent execution',
        'Reduced interruptions with 40% fewer blocks',
        'Early enterprise adoption including NVIDIA',
      ],
      version: '2.4.0',
      changelogUrl: 'https://cursor.com/blog/sandbox',
      category: 'FEATURE',
      rawContent: 'Sandbox feature announcement',
    },
    {
      product: 'WARP',
      title: 'Scheduled Agents Based on Skills',
      announcementDate: new Date('2026-02-20'),
      keyHighlights: [
        'Run agents automatically on cron schedules',
        'Code cleanup, dependency updates, issue triage',
        'Programmable via CLI and API/SDK',
      ],
      changelogUrl: 'https://docs.warp.dev/changelog',
      category: 'FEATURE',
      rawContent: 'Scheduled agents feature',
    },
    {
      product: 'CLAUDE_CODE',
      title: 'Claude Code Security Released',
      announcementDate: new Date('2026-02-24'),
      keyHighlights: [
        'AI-powered security scanning for codebases',
        'Find long-hidden bugs and vulnerabilities',
        'Built on Claude Code for seamless integration',
      ],
      version: '2.1.50',
      changelogUrl: 'https://www.anthropic.com/news/claude-code-security',
      category: 'RELEASE',
      rawContent: 'Security feature launch',
    },
    {
      product: 'CLAUDE_CODE',
      title: 'Checkpointing and VS Code Extension',
      announcementDate: new Date('2026-01-15'),
      keyHighlights: [
        'Automatic code state checkpointing',
        'Instant rewind with /rewind command',
        'VS Code extension beta available',
      ],
      version: '2.1.40',
      changelogUrl: 'https://www.anthropic.com/news/claude-code-updates',
      category: 'FEATURE',
      rawContent: 'Checkpointing feature',
    },
    {
      product: 'WARP',
      title: 'Agent Modality and Cloud-Synced Conversations',
      announcementDate: new Date('2026-02-15'),
      keyHighlights: [
        'Dedicated conversation view for multi-turn workflows',
        'Conversations sync to cloud across devices',
        'Share with teammates via link',
      ],
      changelogUrl: 'https://docs.warp.dev/changelog',
      category: 'FEATURE',
      rawContent: 'Agent modality update',
    },
    {
      product: 'ANTIGRAVITY',
      title: 'Higher Rate Limits for Pro and Ultra Subscribers',
      announcementDate: new Date('2025-12-05'),
      keyHighlights: [
        'Priority access with highest rate limits',
        'Quotas refresh every five hours',
        'Enhanced support for Google AI subscribers',
      ],
      changelogUrl: 'https://blog.google/feed/new-antigravity-rate-limits/',
      category: 'IMPROVEMENT',
      rawContent: 'Rate limit improvements',
    },
  ];

  for (const update of updates) {
    await prisma.update.create({
      data: {
        ...update,
        keyHighlights: JSON.stringify(update.keyHighlights),
      },
    });
  }

  console.log(`✅ Created ${updates.length} updates`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
