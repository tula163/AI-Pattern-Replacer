// src/api/pattern.ts
import api from "./index";

interface RegexResponse {
  regex: string;
  explanation?: string;
}

export const getRegexFromText = async (text: string): Promise<RegexResponse> => {
  const response = await api.post("/extract-regex", { text });
  return response.data;
};
