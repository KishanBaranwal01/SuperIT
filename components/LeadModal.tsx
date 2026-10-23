// components/LeadModal.tsx
'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export default function LeadModal({ isOpen, onClose, defaultPlan }: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state add kiya hai
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    planName: defaultPlan || '100 Mbps Unlimited',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase Firestore ke 'leads' collection me data save karna
      await addDoc(collection(db, 'leads'), {
        fullName: formData.fullName,
        phone: formData.phone,
        pincode: formData.pincode,
        planName: formData.planName,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      setSubmitted(true);

      // 2.5 seconds ke baad modal close aur reset karna
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: '', phone: '', pincode: '', planName: defaultPlan || '100 Mbps Unlimited' });
        onClose();
      }, 2500);

    } catch (error) {
      console.error("Firebase me data save karne me error aaya: ", error);
      setLoading(false);
      alert('Kuch problem aayi. Kripya dobara try karein.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 text-3xl rounded-full flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Request Submitted!</h3>
            <p className="text-slate-500 text-sm mt-2">
              Hamari executive team 30 minutes ke andar aapko callback karegi.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Get High Speed Connection</h3>
            <p className="text-slate-500 text-sm mb-6">Apna detail bharein, installation executive call karenge.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    placeholder="Area pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Selected Plan</label>
                <input
                  type="text"
                  value={formData.planName}
                  onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-700 font-medium outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition mt-2 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Connection Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}