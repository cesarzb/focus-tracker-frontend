"use client";

interface PeriodSelectorProps {
  currentPeriod: string;
  onChange: (period: string) => void;
}

const PERIODS = [
  { label: "All", value: "all" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const PeriodSelector = ({ currentPeriod, onChange }: PeriodSelectorProps) => {
  return (
    <div className="flex p-1.5 bg-stone-950 border border-stone-800 rounded-2xl shadow-inner w-fit">
      {PERIODS.map((p) => {
        const isActive = currentPeriod === p.value;

        return (
          <button
            key={p.value}
            onClick={() => onChange(p.value)}
            className={`
              px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300
              ${
                isActive
                  ? "bg-orange-600 text-stone-50 shadow-lg shadow-orange-900/40 active:scale-95"
                  : "text-stone-500 hover:text-stone-300 active:scale-95"
              }
            `}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
};

export default PeriodSelector;
