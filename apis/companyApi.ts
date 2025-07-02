import axios from "@/lib/axios"

export async function fetchCompanies() {
  const response = await axios.get("/api/ai-company")
  return response.data
} 