import React from 'react';
import { Power, Droplet, Sun, AlertCircle } from 'lucide-react';

export default function SystemControls() {
  return (
    <div className="sketch-card">
      <h3 className="sketch-title mb-6">System Controls</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <button className="sketch-button flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Power className="w-5 h-5" />
            <span>System Power</span>
          </div>
          <span className="text-sm font-medium bg-emerald-100 px-3 py-1 rounded-full">ON</span>
        </button>

        <button className="sketch-button flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Droplet className="w-5 h-5" />
            <span>Dispensing Mode</span>
          </div>
          <span className="text-sm font-medium bg-blue-100 px-3 py-1 rounded-full">AUTO</span>
        </button>

        <button className="sketch-button flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5" />
            <span>Light Sensitivity</span>
          </div>
          <span className="text-sm font-medium bg-amber-100 px-3 py-1 rounded-full">MEDIUM</span>
        </button>

        <button className="sketch-button flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span>Emergency Stop</span>
          </div>
          <span className="text-sm font-medium bg-red-100 px-3 py-1 rounded-full">READY</span>
        </button>
      </div>
    </div>
  );
}