'use client';

import { Product, PRODUCT_INFO } from 'shared-types';

interface FilterBarProps {
  selectedProduct: Product | 'ALL';
  onProductChange: (product: Product | 'ALL') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  selectedProduct,
  onProductChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  const products = [
    { value: 'ALL' as const, label: 'All Products' },
    ...Object.values(Product).map((product) => ({
      value: product,
      label: PRODUCT_INFO[product].name,
    })),
  ];

  return (
    <div className="glass p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search updates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-white placeholder-text-secondary"
          />
        </div>

        {/* Product Filter */}
        <div className="flex gap-2 flex-wrap">
          {products.map((product) => (
            <button
              key={product.value}
              onClick={() => onProductChange(product.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedProduct === product.value
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-white/10'
              }`}
            >
              {product.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
