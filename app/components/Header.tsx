'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity, Avatar, Name } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { Filter, TrendingUp } from 'lucide-react';

interface HeaderProps {
  filter: 'all' | 'mine' | 'public';
  onFilterChange: (filter: 'all' | 'mine' | 'public') => void;
}

export function Header({ filter, onFilterChange }: HeaderProps) {
  const { isConnected, address } = useAccount();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/10 border-b border-white/20 px-4 py-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold text-shadow">Social Todo</h1>
              <p className="text-white/70 text-xs">Track & Share Progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isConnected && address ? (
              <Identity 
                address={address as `0x${string}`}
                className="text-white"
              >
                <Avatar className="w-8 h-8" />
                <Name className="text-white text-sm hidden sm:block" />
              </Identity>
            ) : (
              <ConnectWallet />
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { key: 'all', label: 'All', icon: '🌟' },
            { key: 'public', label: 'Public', icon: '👥' },
            { key: 'mine', label: 'Mine', icon: '👤' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key as any)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
