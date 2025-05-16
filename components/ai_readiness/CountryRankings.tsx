import React from 'react';
import { AIReadinessCountryData } from '@/types/aiReadiness';
import { sortedAiReadinessData, getColorByValue } from '@/data/aiReadinessData';

interface CountryRankingsProps {
  selectedCountry: AIReadinessCountryData | null;
  onCountrySelect: (country: AIReadinessCountryData | null) => void;
}

const CountryRankings: React.FC<CountryRankingsProps> = ({ selectedCountry, onCountrySelect }) => {
  const formatScore = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div
  className="
    bg-gray-900 
    rounded-xl 
    shadow-xl 
    p-6 
    overflow-y-auto 
    h-full 
    border 
    border-gray-800
  "
>
  <h2 className="text-xl font-semibold text-gray-100 mb-4">
    Country Rankings
  </h2>
  <div className="space-y-1">
    {sortedAiReadinessData.map((country, index) => (
      <div
        key={country.id}
        className={`
          flex items-center justify-between py-2.5 px-3 rounded-lg
          transition-all duration-150 cursor-pointer
          ${
            selectedCountry?.id === country.id
              ? 'bg-indigo-900/60 border-l-4 border-indigo-400 shadow-lg'
              : 'hover:bg-gray-800 hover:shadow-sm'
          }
        `}
        onClick={() => onCountrySelect(country)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onCountrySelect(country)}
      >
        <div className="flex items-center min-w-0">
          <span className="w-7 text-sm text-right font-medium text-gray-500 mr-2">
            {index + 1}.
          </span>
          <span
            className="ml-2 text-gray-100 font-medium truncate"
            title={country.name}
          >
            {country.name}
          </span>
        </div>
        <div className="flex items-center flex-shrink-0 ml-2">
          <div
            className="w-12 h-2.5 rounded-full mr-2 border border-gray-700"
            style={{ backgroundColor: getColorByValue(country.value) }}
            title={`Score: ${formatScore(country.value)}`}
          ></div>
          <span className="font-medium text-sm text-gray-300 w-14 text-right">
            {formatScore(country.value)}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CountryRankings;