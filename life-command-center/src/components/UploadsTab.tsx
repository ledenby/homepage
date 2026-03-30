'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadType } from '@/types';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'band', label: 'Band App' },
  { value: 'classdojo', label: 'ClassDojo' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'school', label: 'School' },
  { value: 'medical', label: 'Medical' },
  { value: 'kids', label: 'Kids Activities' },
  { value: 'bills', label: 'Bills' },
  { value: 'other', label: 'Other' },
];

export default function UploadsTab() {
  const [uploads, setUploads] = useState<UploadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('general');
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUploads = async () => {
    const res = await fetch('/api/uploads');
    const data = await res.json();
    setUploads(data);
    setLoading(false);
  };

  useEffect(() => { fetchUploads(); }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setShowForm(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    try {
      // Convert file to base64 to avoid iOS Safari FormData issues
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const res = await fetch('/api/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: base64,
          filename: selectedFile.name,
          caption,
          category,
          notes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedFile(null);
        setPreview(null);
        setCaption('');
        setCategory('general');
        setNotes('');
        setShowForm(false);
        fetchUploads();
      } else {
        alert('Upload failed: ' + JSON.stringify(data));
      }
    } catch (err: any) {
      alert('Upload error: ' + err.name + ': ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this upload?')) return;
    await fetch(`/api/uploads?id=${id}`, { method: 'DELETE' });
    fetchUploads();
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setCaption('');
    setCategory('general');
    setNotes('');
    setShowForm(false);
  };

  if (loading) return <div className="p-4 text-center text-gray-400">Loading…</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-heading text-lg font-bold text-navy">Screenshots & Uploads</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-coral hover:text-coral/80 font-body font-medium"
        >
          + Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <p className="text-xs text-gray-400 font-body px-1">
        Capture screenshots from Band, WhatsApp, ClassDojo, or any app and save them here with notes.
      </p>

      {showForm && (
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          {preview && (
            <img src={preview} alt="Preview" className="w-full max-h-48 object-contain rounded-lg bg-gray-50" />
          )}
          <input
            type="text"
            placeholder="Caption (e.g. 'Cheer schedule from Band')"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body bg-white"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full border rounded-lg px-3 py-2 text-sm font-body"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-coral text-white text-sm px-4 py-2 rounded-lg font-body font-medium disabled:opacity-50 flex-1"
            >
              {uploading ? 'Uploading…' : 'Save'}
            </button>
            <button
              onClick={resetForm}
              className="text-gray-400 text-sm px-4 py-2 rounded-lg font-body"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {uploads.length === 0 && !showForm ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📸</p>
          <p className="font-body text-sm">No uploads yet. Tap &ldquo;+ Upload&rdquo; to save a screenshot.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={`/api/uploads/image?url=${encodeURIComponent(upload.url)}`}
                alt={upload.caption}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="font-body text-xs font-semibold text-navy truncate">{upload.caption || upload.filename}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-body px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {categories.find((c) => c.value === upload.category)?.label || upload.category}
                  </span>
                  <button
                    onClick={() => handleDelete(upload.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {upload.notes && (
                  <p className="font-body text-[10px] text-gray-400 mt-1 line-clamp-2">{upload.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
