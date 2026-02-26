'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Update, PRODUCT_INFO } from 'shared-types';

interface UpdateCardProps {
  update: Update;
}

export function UpdateCard({ update }: UpdateCardProps) {
  const productInfo = PRODUCT_INFO[update.product];
  const date = typeof update.announcementDate === 'string' 
    ? new Date(update.announcementDate) 
    : update.announcementDate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass glass-hover p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: productInfo.color }}
          >
            {productInfo.name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{productInfo.name}</h3>
            <p className="text-xs text-text-secondary">{format(date, 'MMM d, yyyy')}</p>
          </div>
        </div>
        {update.version && (
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
            v{update.version}
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold mb-3">{update.title}</h4>

      {/* Key Highlights */}
      {update.keyHighlights && update.keyHighlights.length > 0 && (
        <ul className="space-y-2 mb-4">
          {update.keyHighlights.slice(0, 3).map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
          {update.keyHighlights.length > 3 && (
            <li className="text-sm text-text-secondary/60 ml-4">
              +{update.keyHighlights.length - 3} more
            </li>
          )}
        </ul>
      )}

      {/* Category Badge */}
      <div className="flex items-center justify-between mt-4">
        <span className="px-3 py-1 rounded-full bg-white/5 text-xs uppercase tracking-wide">
          {update.category.replace('_', ' ')}
        </span>
        <a
          href={update.changelogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View Details →
        </a>
      </div>
    </motion.div>
  );
}
