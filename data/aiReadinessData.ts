import { AIReadinessCountryData, ColorScaleItemConfig } from '@/types/aiReadiness';

// AI Readiness data for countries
export const aiReadinessDataArray: AIReadinessCountryData[] = [
  { id: "AL", name: "Albania", value: 0.5267925411 },
  { id: "DZ", name: "Algeria", value: 0.3704386652 },
  { id: "AO", name: "Angola", value: 0.2596592419 },
  { id: "AR", name: "Argentina", value: 0.473809436 },
  { id: "AM", name: "Armenia", value: 0.4928866848 },
  { id: "AU", name: "Australia", value: 0.7271003276 },
  { id: "AT", name: "Austria", value: 0.7245657593 },
  { id: "AZ", name: "Azerbaijan", value: 0.4709397778 },
  { id: "BS", name: "Bahamas", value: 0.4575124606 }, // Corrected name
  { id: "BH", name: "Bahrain", value: 0.5152552128 },
  { id: "BD", name: "Bangladesh", value: 0.3840644881 },
  { id: "BB", name: "Barbados", value: 0.5046559796 },
  { id: "BY", name: "Belarus", value: 0.4707805738 },
  { id: "BE", name: "Belgium", value: 0.6724778414 },
  { id: "BZ", name: "Belize", value: 0.4226269051 },
  { id: "BJ", name: "Benin", value: 0.3631641939 },
  { id: "BT", name: "Bhutan", value: 0.4419174641 },
  { id: "BO", name: "Bolivia", value: 0.3766047582 },
  { id: "BA", name: "Bosnia and Herzegovina", value: 0.427913107 },
  { id: "BW", name: "Botswana", value: 0.4128481001 },
  { id: "BR", name: "Brazil", value: 0.5013404191 },
  { id: "BN", name: "Brunei", value: 0.495252721 }, // Corrected name
  { id: "BG", name: "Bulgaria", value: 0.5772901177 }
  // ... add all your other countries
];

// Sort data by value for the rankings (descending)
export const sortedAiReadinessData: AIReadinessCountryData[] =
  [...aiReadinessDataArray].sort((a, b) => b.value - a.value);

// Color scale for the map (ensure thresholds are ascending for easier logic)
export const colorScaleConfig: ColorScaleItemConfig[] = [
  { threshold: 0.0, color: "#edf8e9" }, // Base color for values < 0.3
  { threshold: 0.3, color: "#c7e9c0" },
  { threshold: 0.4, color: "#a1d99b" },
  { threshold: 0.5, color: "#74c476" },
  { threshold: 0.6, color: "#41ab5d" },
  { threshold: 0.7, color: "#238b45" },
  { threshold: 0.8, color: "#005a32" }
].sort((a,b) => a.threshold - b.threshold); // Ensure sorted by threshold

// Function to get color based on value
export const getColorByValue = (value: number): string => {
  let selectedColor = colorScaleConfig[0].color; // Default to the lowest threshold color
  for (let i = colorScaleConfig.length - 1; i >= 0; i--) {
    if (value >= colorScaleConfig[i].threshold) {
      selectedColor = colorScaleConfig[i].color;
      break;
    }
  }
  return selectedColor;
};