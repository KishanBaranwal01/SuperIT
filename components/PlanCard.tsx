// components/PlanCard.tsx
import { Plan } from '@/types';

interface PlanCardProps {
  plan: Plan;
  onSelect: (planName: string) => void;
}

export default function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div
      className={`relative p-6 bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl ${
        plan.isPopular
          ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
      <div className="text-3xl font-extrabold text-blue-600 my-3 tracking-tight">
        {plan.speed}
      </div>
      
      <div className="flex items-baseline gap-1 my-4">
        <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
        <span className="text-xs font-semibold text-slate-500 uppercase">/ month + GST</span>
      </div>

      <div className="w-full h-px bg-slate-100 my-4" />

      <ul className="space-y-2.5 mb-8 text-sm text-slate-600">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2.5">
            <span className="text-emerald-500 font-bold">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.name)}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition active:scale-95 ${
          plan.isPopular
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
        }`}
      >
        Book Connection
      </button>
    </div>
  );
}