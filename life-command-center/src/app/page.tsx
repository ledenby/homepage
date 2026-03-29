'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import UrgentTab from '@/components/UrgentTab';
import TrackerTab from '@/components/TrackerTab';
import SchoolTab from '@/components/SchoolTab';
import EmailResultsTab from '@/components/EmailResultsTab';
import UploadsTab from '@/components/UploadsTab';
import IdeasTab from '@/components/IdeasTab';
import { TabId } from '@/types';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'now', label: 'Now', icon: '⚡' },
  { id: 'tracker', label: 'Tracker', icon: '📋' },
  { id: 'school', label: 'School', icon: '📚' },
  { id: 'kids', label: 'Kids', icon: '🎀' },
  { id: 'bills', label: 'Bills', icon: '💰' },
  { id: 'uploads', label: 'Uploads', icon: '📸' },
  { id: 'other', label: 'Other', icon: '📌' },
  { id: 'ideas', label: 'Ideas', icon: '💡' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleScanComplete = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Header onScanComplete={handleScanComplete} />

      {/* Tab Navigation */}
      <nav className="sticky top-[60px] z-40 bg-cream border-b border-gray-200/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-3 py-2.5 text-sm font-body font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-coral text-navy'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div key={refreshKey}>
          {activeTab === 'now' && <UrgentTab />}
          {activeTab === 'tracker' && <TrackerTab />}
          {activeTab === 'school' && <SchoolTab />}
          {activeTab === 'kids' && <EmailResultsTab category="kids" />}
          {activeTab === 'bills' && <EmailResultsTab category="bills" />}
          {activeTab === 'uploads' && <UploadsTab />}
          {activeTab === 'other' && (
            <div className="space-y-4">
              <EmailResultsTab category="medical" />
              <EmailResultsTab category="pets" />
              <EmailResultsTab category="home" />
              <EmailResultsTab category="personal" />
              <EmailResultsTab category="other_actionable" />
            </div>
          )}
          {activeTab === 'ideas' && <IdeasTab />}
        </div>
      </main>
    </div>
  );
}
