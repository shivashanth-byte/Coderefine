
'use server';
/**
 * @fileOverview A Genkit flow for analyzing code, identifying issues, and providing human-like explanations.
 *
 * - aiCodeReviewWithExplanations - A function that initiates the code review process.
 * - AiCodeReviewWithExplanationsInput - The input type for the aiCodeReviewWithExplanations function.
 * - AiCodeReviewWithExplanationsOutput - The return type for the aiCodeReviewWithExplanations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCodeReviewWithExplanationsInputSchema = z.object({
  code: z.string().describe('The code snippet to be reviewed.'),
  language: z.string().describe('The programming language of the code (e.g., "Python", "JavaScript", "Java", "C++").'),
});
export type AiCodeReviewWithExplanationsInput = z.infer<typeof AiCodeReviewWithExplanationsInputSchema>;

const AiCodeReviewWithExplanationsOutputSchema = z.object({
  bugs: z.array(z.object({
    description: z.string().describe('A human-like explanation of the bug.'),
    lineNumber: z.number().optional().describe('The line number where the bug occurs.'),
    severity: z.enum(['low', 'medium', 'high']).optional().describe('Severity of the bug.'),
    suggestedFix: z.string().optional().describe('A suggested code snippet or explanation for fixing the bug.'),
  })).describe('Identified bugs in the code.'),
  optimizations: z.array(z.object({
    description: z.string().describe('A human-like explanation of the optimization opportunity.'),
    lineNumber: z.number().optional().describe('The line number where optimization is possible.'),
    suggestedImprovement: z.string().optional().describe('A suggested code snippet or explanation for optimizing the code.'),
  })).describe('Opportunities for code optimization.'),
  securityRisks: z.array(z.object({
    description: z.string().describe('A human-like explanation of the security risk.'),
    lineNumber: z.number().optional().describe('The line number where the security risk is found.'),
    severity: z.enum(['low', 'medium', 'high', 'critical']).optional().describe('Severity of the security risk.'),
    mitigationStrategy: z.string().optional().describe('A suggested strategy or code snippet to mitigate the security risk.'),
  })).describe('Identified security vulnerabilities.'),
  bestPractices: z.array(z.object({
    description: z.string().describe('A human-like explanation of a best practice not followed.'),
    lineNumber: z.number().optional().describe('The line number relevant to the best practice.'),
    suggestion: z.string().optional().describe('A suggestion or code snippet to adhere to best practices.'),
  })).describe('Suggestions for following best practices.'),
  overallSummary: z.string().describe('A summary of the code review, focusing on educational aspects and improvement areas.'),
});
export type AiCodeReviewWithExplanationsOutput = z.infer<typeof AiCodeReviewWithExplanationsOutputSchema>;

export async function aiCodeReviewWithExplanations(input: AiCodeReviewWithExplanationsInput): Promise<AiCodeReviewWithExplanationsOutput> {
  return aiCodeReviewWithExplanationsFlow(input);
}

const aiCodeReviewPrompt = ai.definePrompt({
  name: 'aiCodeReviewPrompt',
  input: {schema: AiCodeReviewWithExplanationsInputSchema},
  output: {schema: AiCodeReviewWithExplanationsOutputSchema},
  prompt: "You are CodeRefine AI, an expert senior software developer and mentor. Your task is to review the provided code written in {{{language}}}.\n" +
"Analyze the code for bugs, performance issues, security risks, and adherence to best practices.\n" +
"For each issue identified, provide a clear, human-like explanation, as if you are teaching a beginner developer. Focus on why it's an issue, its potential impact, and how to fix or improve it. Avoid overly technical jargon where possible, but be precise.\n\n" +
"Structure your feedback into the following categories: 'bugs', 'optimizations', 'securityRisks', and 'bestPractices'. For each identified point, include a 'description' and optionally a 'lineNumber' and a 'suggestedFix'/'suggestedImprovement'/'mitigationStrategy'/'suggestion' as appropriate. If no issues are found in a category, return an empty array for that category.\n\n" +
"Finally, provide an 'overallSummary' that summarizes the review, highlights key learning points, and offers general advice for improvement.\n\n" +
"Code to review:\n" +
"```{{{language}}}\n" +
"{{{code}}}\n" +
"```",
});

const aiCodeReviewWithExplanationsFlow = ai.defineFlow(
  {
    name: 'aiCodeReviewWithExplanationsFlow',
    inputSchema: AiCodeReviewWithExplanationsInputSchema,
    outputSchema: AiCodeReviewWithExplanationsOutputSchema,
  },
  async (input) => {
    const {output} = await aiCodeReviewPrompt(input);
    return output!;
  }
);
