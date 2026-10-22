// app/page.tsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PlanCard from '@/components/PlanCard';
import LeadModal from '@/components/LeadModal';
import { Plan } from '@/types';

// Temporary Mock Data for UI building
const MOCK_PLANS: Plan[] = [
  {
    id: '1',
    name: 'Starter Fiber',
    speed: '50 Mbps',
    price: 499,
    category: 'home',
    features: ['Unlimited Data', 'Free Installation', '24x7 Customer Support'],
  },
  {
    id: '2',
    name: 'Super Speed',
    speed: '100 Mbps',
    price: 699,
    category: 'home',
    isPopular: true,
    features: ['Unlimited Data', 'Free Dual-Band Wi-Fi Router', 'Free Installation', 'Zero Lag Gaming'],
  },
  {
    id: '3',
    name: 'Giga Stream',
    speed: '200 Mbps',
    price: 999,
    category: 'home',
    features: ['Unlimited Data', 'Free Router', 'Free OTT Bundle (Hotstar, SonyLIV)', 'Priority Support'],
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handleOpenBooking = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onOpenBookModal={() => handleOpenBooking()} />

      {/* Hero Banner */}
      <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-200 mb-6">
            ⚡ Ultra Fast Fiber Optical Network
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6">
            Non-stop Speeds. <br />
            <span className="text-blue-600">Zero Interruptions.</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Ghar aur office ke liye ultra-fast fiber broadband starting at ₹499/month. Free router aur zero setup charges ke saath.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleOpenBooking()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/25 transition active:scale-95"
            >
              Get New Connection
            </button>
            <a
              href="#plans"
              className="bg-white hover:bg-slate-100 text-slate-800 text-base font-bold px-8 py-4 rounded-2xl border border-slate-200 transition"
            >
              Explore Plans
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/80">
            <div>
              <div className="text-2xl font-black text-slate-900">Up to 1 Gbps</div>
              <div className="text-xs text-slate-500 font-medium">Lightning Speeds</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">99.9%</div>
              <div className="text-xs text-slate-500 font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">⭐ 4.8 / 5</div>
              <div className="text-xs text-slate-500 font-medium">1500+ Happy Users</div>
            </div>
          </div>
        </div>

        {/* Feature Box / Image Placeholder */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-2xl font-bold mb-4">🚀 Free Dual-Band Wi-Fi Router</h3>
          <p className="text-blue-100 text-sm mb-6">
            Naye connection ke saath paayein 5GHz High-Speed Mesh Router bilkul free!
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6">
            <div className="text-xs text-blue-200 font-bold uppercase mb-1">Coverage Status</div>
            <div className="text-lg font-bold">100+ Areas Connected in City</div>
          </div>

          <button
            onClick={() => handleOpenBooking('100 Mbps Offer Plan')}
            className="w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition"
          >
            Claim Free Router Offer
          </button>
        </div>
      </section>

      {/* Broadband Plans Section */}
      <section id="plans" className="py-20 bg-white border-t border-slate-200/60 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Broadband Fiber Plans</h2>
            <p className="text-slate-500 mt-3 text-base">
              Apne ghar ya business ke zaroorat ke hisaab se best speed choose karein.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOCK_PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={(name) => handleOpenBooking(name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}