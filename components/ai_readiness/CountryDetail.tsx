import React from 'react';
import { AIReadinessCountryData } from '@/types/aiReadiness';
import { sortedAiReadinessData, aiReadinessDataArray, getColorByValue } from '@/data/aiReadinessData'; // Adjust path

interface CountryDetailProps {
  country: AIReadinessCountryData | null;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  const formatScore = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (!country) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Country Details</h2>
        <p className="text-gray-500">Click on a country on the map or list to view details.</p>
      </div>
    );
  }

  const rank = sortedAiReadinessData.findIndex(item => item.id === country.id) + 1;
  const globalAverage = aiReadinessDataArray.reduce((sum, c) => sum + c.value, 0) / aiReadinessDataArray.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 truncate" title={country.name}>{country.name}</h2>
        <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm flex-shrink-0 ml-2">
          <span className="font-semibold text-gray-600">Rank: </span>
          <span className="font-bold text-gray-800">{rank}</span>
          <span className="text-gray-500"> of {sortedAiReadinessData.length}</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-gray-700">AI Readiness Score:</span>
          <span className="font-bold text-gray-800">{formatScore(country.value)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
          <div
            className="h-4 rounded-full"
            style={{
              width: `${country.value * 100}%`,
              backgroundColor: getColorByValue(country.value),
            }}
          ></div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-2">Comparison</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Global Average:</span>
            <span className="font-medium">{formatScore(globalAverage)}</span>
          </div>
          {sortedAiReadinessData.length > 0 && (
            <div className="flex justify-between">
              <span>Top Country:</span>
              <span className="font-medium">{sortedAiReadinessData[0].name} ({formatScore(sortedAiReadinessData[0].value)})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;