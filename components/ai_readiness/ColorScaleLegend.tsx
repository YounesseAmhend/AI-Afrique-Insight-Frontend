
import React from 'react';
import { getColorByValue } from '@/data/aiReadinessData';

const ColorScaleLegend: React.FC = () => {
  // Create a scale with 10 steps
  const steps = 10;
  const scaleItems = Array.from({ length: steps }, (_, i) => 1 - i / (steps - 1));

  return (
    <div className="flex flex-col text-white">
      <h3 className="text-md font-semibold mb-2">AI Readiness Scale</h3>
      <div className="flex items-center">
        <div className="flex-1 flex">
          {scaleItems.map((value, i) => (
            <div
              key={i}
              className="h-4 flex-1"
              style={{ backgroundColor: getColorByValue(value) }}
              title={`${(value * 100).toFixed(0)}%`}
            />
          ))}
        </div>
        <div className="flex justify-between w-full px-2 text-xs mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default ColorScaleLegend;