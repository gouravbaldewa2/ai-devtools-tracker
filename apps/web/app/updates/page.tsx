'use client';

import { useState, useEffect } from 'react';
import { UpdateCard } from '@/components/UpdateCard';
import { FilterBar } from '@/components/FilterBar';
import { Product, Update } from 'shared-types';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUpdates();
  }, [selectedProduct, searchQuery]);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedProduct !== 'ALL') {
        params.append('product', selectedProduct);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/updates?${params.toString()}`);
      const data = await response.json();
      setUpdates(data.updates);
    } catch (error) {
      console.error('Error fetching updates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="glass glass-hover max-w-6xl mx-auto p-6 mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AI Dev Tools Tracker
        </h1>
        <p className="text-center text-text-secondary mt-2">
          Latest updates from Antigravity, Cursor, Warp, and Claude Code
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Filters */}
        <FilterBar
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Updates Grid */}
        {loading ? (
          <div className="glass p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
            <p className="text-text-secondary mt-4">Loading updates...</p>
          </div>
        ) : updates.length === 0 ? (
          <div className="glass p-12 text-center">
            <p className="text-text-secondary text-lg">No updates found</p>
            <p className="text-text-secondary/60 text-sm mt-2">
              Try adjusting your filters or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {updates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
