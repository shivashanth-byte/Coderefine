
'use server';
/**
 * @fileOverview Provides AI-generated suggestions for rewriting, optimizing, or correcting code snippets.
 *
 * - aiCodeImprovementSuggestions - A function that provides improved code snippets and explanations.
 * - CodeImprovementSuggestionsInput - The input type for the aiCodeImprovementSuggestions function.
 * - CodeImprovementSuggestionsOutput - The return type for the aiCodeImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeImprovementSuggestionsInputSchema = z.object({
  code: z.string().describe('The original code snippet to be reviewed and improved.'),
  language: z.string().describe('The programming language of the code snippet (e.g., Python, JavaScript).'),
});
export type CodeImprovementSuggestionsInput = z.infer<typeof CodeImprovementSuggestionsInputSchema>;

const CodeImprovementSuggestionsOutputSchema = z.object({
  improvedCode: z.string().describe('The rewritten, optimized, or corrected code snippet.'),
  explanation: z.string().describe('A clear, simple explanation of the changes made and why they improve the code, suitable for a beginner.'),
});
export type CodeImprovementSuggestionsOutput = z.infer<typeof CodeImprovementSuggestionsOutputSchema>;

export async function aiCodeImprovementSuggestions(
  input: CodeImprovementSuggestionsInput
): Promise<CodeImprovementSuggestionsOutput> {
  return aiCodeImprovementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeImprovementPrompt',
  input: {schema: CodeImprovementSuggestionsInputSchema},
  output: {schema: CodeImprovementSuggestionsOutputSchema},
  prompt: "You are an experienced senior software engineer tasked with reviewing a junior developer's code.\n" +
"Your goal is to provide a rewritten, optimized, or corrected version of the provided code, and explain the changes in a clear, simple, human-like language, suitable for a beginner.\n" +
"Focus on identifying mistakes, explaining why they are mistakes, and showing how to improve the code for better performance, readability, or adherence to best practices.\n" +
"Do not use technical jargon in your explanation.\n\n" +
"Programming Language: {{{language}}}\n" +
"Original Code:\n" +
"```{{{language}}}\n" +
"{{{code}}}\n" +
"```\n\n" +
"Please provide the improved code and a concise explanation of the changes.",
});

const aiCodeImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiCodeImprovementSuggestionsFlow',
    inputSchema: CodeImprovementSuggestionsInputSchema,
    outputSchema: CodeImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('No output received from the AI model.');
    }
    return output;
  }
);
