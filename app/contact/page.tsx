// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // FAQ open/close state (+ icon toggle ke liye)
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "New broadband connection lagane me kitna time lagta hai?",
      answer: "Connection request submit hone ke 24 se 48 ghanto ke andar hamari technical team aapke ghar par fiber router install kar deti hai."
    },
    {
      question: "Kya installation charges bilkul free hain?",
      answer: "Haan, abhi hamare promotional offer ke tahat installation aur router configuration bilkul free hai."
    },
    {
      question: "Agar internet speed slow ho ya connection cut ho jaye toh kya karein?",
      answer: "Aap hamare 24x7 support helpline par call kar sakte hain ya support team ko message bhej sakte hain, turant resolution mil jayega."
    },
    {
      question: "Kya main apna plan baad me upgrade ya downgrade kar sakta hoon?",
      answer: "Bilkul! Aap kisi bhi waqt hamare customer portal ya support team ke zariye apna plan change kar sakte hain."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase Firestore ke 'contacts' collection me message save karna
      await addDoc(collection(db, 'contacts'), {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      setLoading(false);
      setSuccess(true);
      setFormData({ fullName: '', phone: '', email: '', message: '' });

      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    } catch (error) {
      console.error("Firebase me save karne me error aaya: ", error);
      setLoading(false);
      alert('Kuch error aaya, kripya dobara try karein.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onOpenBookModal={() => {}} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Contact & Support</h1>
          <p className="text-slate-500 mt-3 text-base">
            Koi sawal hai ya naya connection lena chahte hain? Humse sampark karein.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Send us a Message</h3>

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-semibold">
                ✓ Aapka message successfully send ho gaya hai! Hum jald hi sampark karenge.
              </div>
            )}

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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email ID</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Apna message yahan likhein..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* FAQ Accordion Section (+ / - icon feature) */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl p-6 transition shadow-sm hover:border-slate-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left font-bold text-slate-800 focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ml-4 transition-transform duration-200">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="mt-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}