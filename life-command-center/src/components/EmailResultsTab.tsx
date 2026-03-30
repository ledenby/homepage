'use client';

import { useState, useEffect } from 'react';
import { EmailResult } from '@/types';
import { generateIcsUrl } from '@/lib/calendar';

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  kids: { label: 'Kids & Activities', icon: '🎀', color: 'border-pink-400 bg-pink-50' },
  school: { label: 'School', icon: '📚', color: 'border-blue-400 bg-blue-50' },
  medical: { label: 'Medical', icon: '🏥', color: 'border-green-400 bg-green-50' },
  bills: { label: 'Bills & Payments', icon: '💰', color: 'border-amber-400 bg-amber-50' },
  pets: { label: 'Pets', icon: '🐶', color: 'border-orange-400 bg-orange-50' },
  home: { label: 'Home & Maintenance', icon: '🏠', color: 'border-teal-400 bg-teal-50' },
  personal: { label: 'Personal', icon: '💅', color: 'border-purple-400 bg-purple-50' },
  other_actionable: { label: 'Other Actionable', icon: '📌', color: 'border-gray-400 bg-gray-50' },
  uncategorized: { label: 'Other', icon: '📋', color: 'border-gray-300 bg-gray-50' },
};

export default function EmailResultsTab({ category }: { category?: string }) {
  const [emails, setEmails] = useState<EmailResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const fetchEmails = () => {
    fetch('/api/scan')
      .then((r) => r.json())
      .then((data) => { setEmails(data); setLoading(false); });
  };

  useEffect(() => { fetchEmails(); }, []);

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  // Filter by category if specified
  let filtered = emails;
  if (category) {
    filtered = emails.filter((e) => e.category === category);
  }

  // Group by category
  const grouped: Record<string, EmailResult[]> = {};
  filtered.forEach((e) => {
    if (!grouped[e.category]) grouped[e.category] = [];
    grouped[e.category].push(e);
  });

  if (Object.keys(grouped).length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p className="text-3xl mb-2">📧</p>
        <p className="font-body">No emails yet. Hit &ldquo;Scan Gmail&rdquo; to get started.</p>
      </div>
    );
  }

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setExpandedCategories(next);
  };

  return (
    <div className="space-y-3">
      {Object.entries(grouped).map(([cat, catEmails]) => {
        const config = categoryConfig[cat] || categoryConfig.uncategorized;
        const isExpanded = expandedCategories.has(cat);

        return (
          <div key={cat} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggleCategory(cat)}
              className={`w-full p-3 flex items-center gap-2 border-l-4 ${config.color} text-left`}
            >
              <span className="text-lg">{config.icon}</span>
              <span className="font-body font-semibold text-navy text-sm flex-1">{config.label}</span>
              <span className="text-xs text-gray-400 font-body">{catEmails.length}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="divide-y divide-gray-100">
                {catEmails.map((email) => (
                  <div key={email.id} className="p-3 pl-12">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-navy truncate">{email.subject}</p>
                        <p className="font-body text-xs text-gray-400 mt-0.5">{email.fromAddr}</p>
                        <p className="font-body text-xs text-gray-500 mt-1 line-clamp-2">{email.snippet}</p>
                        <p className="font-body text-[10px] text-gray-300 mt-1">
                          {new Date(email.emailDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = generateIcsUrl(
                            email.subject,
                            new Date(email.emailDate),
                            `From: ${email.fromAddr}\n${email.snippet}`,
                            true
                          );
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'event.ics';
                          link.click();
                        }}
                        className="text-gray-300 hover:text-coral transition-colors flex-shrink-0 p-1 mt-1"
                        title="Add to Calendar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
