import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: number | string;
  label: string;
  icon: React.ReactNode;
  type?: 'percentage' | 'status';
  onIncrease?: () => void;
  onDecrease?: () => void;
  canAdjust?: boolean;
}

export default function StatusCard({ 
  title, 
  value, 
  label, 
  icon,
  type = 'percentage',
  onIncrease,
  onDecrease,
  canAdjust = false
}: StatusCardProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = type === 'percentage' && typeof value === 'number' 
    ? (value / 100) * circumference 
    : circumference * 0.75;
  const strokeDashoffset = circumference - progress;

  return (
    <div className="sketch-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="sketch-title">{title}</h3>
        <div className="text-slate-600">{icon}</div>
      </div>
      
      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={type === 'status' && value === 'Running' ? '#22c55e' : '#3B82F6'}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-slate-600">{label}</span>
            <span className={`text-xl font-semibold ${
              type === 'status' 
                ? value === 'Running' ? 'text-green-600' : 'text-red-600'
                : 'text-slate-800'
            }`}>
              {type === 'percentage' && typeof value === 'number' ? `${value}%` : value}
            </span>
          </div>
        </div>
      </div>

      {canAdjust && (
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={onDecrease}
            className="sketch-button p-2 hover:bg-slate-100 transition-colors"
            aria-label="Decrease value"
          >
            <Minus className="w-4 h-4 text-slate-600" />
          </button>
          <button 
            onClick={onIncrease}
            className="sketch-button p-2 hover:bg-slate-100 transition-colors"
            aria-label="Increase value"
          >
            <Plus className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      )}
    </div>
  );
}