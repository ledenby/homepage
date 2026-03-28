'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header({ onScanComplete }: { onScanComplete?: () => void }) {
  const { data: session } = useSession();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await fetch('/api/scan', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setScanResult(`Found ${data.savedCount} emails, filtered ${data.spamCount} spam`);
        onScanComplete?.();
      } else {
        setScanResult(data.error || 'Scan failed');
      }
    } catch {
      setScanResult('Network error');
    } finally {
      setScanning(false);
    }
  };

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight">Life Command Center</h1>
          {session && (
            <p className="text-xs text-gray-400 mt-0.5">{session.user?.email}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <button
                onClick={handleScan}
                disabled={scanning}
                className="bg-coral hover:bg-coral/80 disabled:opacity-50 text-white text-sm px-3 py-1.5 rounded-lg font-body font-medium transition-colors"
              >
                {scanning ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Scanning…
                  </span>
                ) : (
                  '📧 Scan Gmail'
                )}
              </button>
              <button
                onClick={() => signOut()}
                className="text-gray-400 hover:text-white text-xs transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-white text-navy text-sm px-3 py-1.5 rounded-lg font-body font-medium hover:bg-gray-100 transition-colors"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
      {scanResult && (
        <div className="bg-navy-light px-4 py-2 text-center text-sm text-gray-300">
          {scanResult}
        </div>
      )}
    </header>
  );
}
