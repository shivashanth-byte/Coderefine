import { AiCodeReviewWithExplanationsOutput } from "@/ai/flows/ai-code-review-with-explanations";
import { CodeImprovementSuggestionsOutput } from "@/ai/flows/ai-code-improvement-suggestions";

export type CodeLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go';

export interface HistoryItem {
  id: string;
  timestamp: number;
  code: string;
  language: string;
  summary: string;
  status: 'improved' | 'needs-fix' | 'critical';
  review?: AiCodeReviewWithExplanationsOutput;
  improvement?: CodeImprovementSuggestionsOutput;
}
