'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { GmailAccountType } from '@/types';

export default function Header({ onScanComplete }: { onScanComplete?: () => void }) {
  const { data: session } = useSession();
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<GmailAccountType[]>([]);
  const [showAccounts, setShowAccounts] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('/api/gmail-accounts');
      const data = await res.json();
      setAccounts(data);
    } catch {}
  };

  useEffect(() => {
    if (session) fetchAccounts();
  }, [session]);

  const handleScan = async () => {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await fetch('/api/scan', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        const acctCount = data.scannedAccounts?.length || 1;
        setScanResult(
          `Scanned ${acctCount} account${acctCount !== 1 ? 's' : ''} — ${data.savedCount} emails, ${data.spamCount} spam filtered`
        );
        onScanComplete?.();
        fetchAccounts();
      } else {
        setScanResult(data.error || 'Scan failed');
      }
    } catch {
      setScanResult('Network error');
    } finally {
      setScanning(false);
    }
  };

  const handleAddAccount = () => {
    // Sign in with Google again to add another account - forces account selector
    signIn('google', undefined, { prompt: 'select_account consent' });
  };

  const handleRemoveAccount = async (id: string) => {
    if (!confirm('Remove this Gmail account and its scanned emails?')) return;
    await fetch(`/api/gmail-accounts?id=${id}`, { method: 'DELETE' });
    fetchAccounts();
    onScanComplete?.();
  };

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight">Life Command Center</h1>
          {session && (
            <button
              onClick={() => setShowAccounts(!showAccounts)}
              className="text-xs text-gray-400 mt-0.5 hover:text-gray-200 transition-colors flex items-center gap-1"
            >
              {accounts.length > 0
                ? `${accounts.length} Gmail account${accounts.length !== 1 ? 's' : ''}`
                : session.user?.email
              }
              <svg className={`w-3 h-3 transition-transform ${showAccounts ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
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
                  '📧 Scan All'
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

      {/* Connected Accounts Panel */}
      {showAccounts && session && (
        <div className="bg-navy-light px-4 py-3 border-t border-gray-700">
          <div className="max-w-3xl mx-auto space-y-2">
            <p className="text-xs text-gray-400 font-body font-medium uppercase tracking-wider">Connected Gmail Accounts</p>
            {accounts.map((acct) => (
              <div key={acct.id} className="flex items-center justify-between py-1.5">
                <div>
                  <p className="text-sm text-white font-body">{acct.email}</p>
                  <p className="text-[10px] text-gray-500">
                    {acct.lastScanAt
                      ? `Last scanned ${new Date(acct.lastScanAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`
                      : 'Never scanned'
                    }
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveAccount(acct.id)}
                  className="text-gray-500 hover:text-red-400 text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddAccount}
              className="w-full text-center text-xs text-coral hover:text-coral/80 font-body font-medium py-2 border border-dashed border-gray-600 rounded-lg mt-2 transition-colors"
            >
              + Add another Gmail account
            </button>
          </div>
        </div>
      )}

      {scanResult && (
        <div className="bg-navy-light px-4 py-2 text-center text-sm text-gray-300 border-t border-gray-700">
          {scanResult}
        </div>
      )}
    </header>
  );
}
