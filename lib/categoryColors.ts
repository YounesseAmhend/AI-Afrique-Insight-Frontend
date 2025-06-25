export const categoryColors: { [key: string]: string } = {
  "Research": "#6366F1",
  "AI Tools": "#0EA5E9",
  "Industry": "#F59E42",
  "Startups": "#10B981",
  "Regulation": "#F43F5E",
  "Ethics": "#A21CAF",
  "Health": "#22D3EE",
  "Robotics": "#FBBF24",
  "NLP": "#8B5CF6",
  "Computer Vision": "#F472B6",
  "AI Art": "#FACC15",
  "Opinion": "#64748B"
};

export function getCategoryColor(name: string) {
  return categoryColors[name] || "#64748B";
} 