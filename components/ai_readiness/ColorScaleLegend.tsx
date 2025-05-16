import React from 'react';
import { colorScaleConfig } from '@/data/aiReadinessData'; // Adjust path if needed

const ColorScaleLegend: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full mt-4 mb-6">
      <h3 className="text-lg font-medium text-gray-700 mb-2">AI Readiness Index Scale</h3>
      <div className="flex items-center w-full max-w-2xl">
        {/* Optional: Min value text */}
        {/* <span className="text-xs font-medium mr-2">Low</span> */}
        <div className="flex-grow flex h-6 rounded-md overflow-hidden border border-gray-300">
          {colorScaleConfig.map((item, index) => (
            <div
              key={index}
              className="flex-grow h-full flex items-center justify-center text-xs text-black font-medium px-1" // Adjusted text color for visibility
              style={{ backgroundColor: item.color, minWidth: '40px' }} // Added minWidth
              title={`> ${item.threshold.toFixed(2)}`} // Tooltip for threshold
            >
              {`≥${(item.threshold * 100).toFixed(0)}%`}
            </div>
          ))}
        </div>
        {/* Optional: Max value text */}
        {/* <span className="text-xs font-medium ml-2">High</span> */}
      </div>
    </div>
  );
};

export default ColorScaleLegend;