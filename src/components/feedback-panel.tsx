"use client";

import { AiCodeReviewWithExplanationsOutput } from "@/ai/flows/ai-code-review-with-explanations";
import { CodeImprovementSuggestionsOutput } from "@/ai/flows/ai-code-improvement-suggestions";
import { Card } from "@/components/ui/card";
import { Bug, Zap, Lock, BookOpen, CheckCircle2, Copy, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FeedbackPanelProps {
  review?: AiCodeReviewWithExplanationsOutput | null;
  improvement?: CodeImprovementSuggestionsOutput | null;
  isAnalyzing: boolean;
}

export function FeedbackPanel({ review, improvement, isAnalyzing }: FeedbackPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 bg-card border-l-4 border-l-primary/30 animate-pulse">
            <div className="h-4 w-1/4 bg-muted rounded mb-4" />
            <div className="h-12 w-full bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-border rounded-2xl opacity-50">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-headline font-semibold mb-2">No Review Yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Paste your code and run a review to see AI insights, bug reports, and optimizations.
        </p>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Improved code copied to clipboard.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Overall Summary */}
      <Card className="p-6 bg-primary/10 border-l-4 border-l-primary shadow-lg group hover:shadow-primary/10 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-headline font-bold text-lg">Senior Mentor's Summary</h3>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{review.overallSummary}</p>
      </Card>

      {/* Bugs Section */}
      {review.bugs.length > 0 && (
        <Card className="p-6 bg-card border-l-4 border-l-destructive shadow-md hover:shadow-destructive/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-destructive" />
              <h3 className="font-headline font-bold">Bugs Found</h3>
            </div>
            <Badge variant="destructive">{review.bugs.length}</Badge>
          </div>
          <div className="space-y-4">
            {review.bugs.map((bug, idx) => (
              <div key={idx} className="bg-secondary/20 p-4 rounded-xl">
                <p className="text-sm font-medium mb-1">Line {bug.lineNumber}: {bug.description}</p>
                {bug.suggestedFix && (
                  <pre className="mt-2 p-2 bg-background rounded text-xs font-code overflow-x-auto">
                    {bug.suggestedFix}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Security Section */}
      {review.securityRisks.length > 0 && (
        <Card className="p-6 bg-card border-l-4 border-l-orange-500 shadow-md hover:shadow-orange-500/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-500" />
              <h3 className="font-headline font-bold">Security Risks</h3>
            </div>
            <Badge className="bg-orange-500">{review.securityRisks.length}</Badge>
          </div>
          <div className="space-y-4">
            {review.securityRisks.map((risk, idx) => (
              <div key={idx} className="bg-secondary/20 p-4 rounded-xl">
                <p className="text-sm font-medium mb-1">Severity: {risk.severity}</p>
                <p className="text-sm opacity-90">{risk.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Optimizations */}
      {review.optimizations.length > 0 && (
        <Card className="p-6 bg-card border-l-4 border-l-emerald-500 shadow-md hover:shadow-emerald-500/5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              <h3 className="font-headline font-bold">Optimizations</h3>
            </div>
            <Badge className="bg-emerald-500">{review.optimizations.length}</Badge>
          </div>
          <div className="space-y-4">
            {review.optimizations.map((opt, idx) => (
              <div key={idx} className="bg-secondary/20 p-4 rounded-xl">
                <p className="text-sm opacity-90">{opt.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Improved Code (If available) */}
      {improvement && (
        <Card className="p-6 bg-primary border-l-4 border-l-accent shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle2 className="h-24 w-24" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-foreground" />
              <h3 className="font-headline font-bold text-primary-foreground">Refined Code</h3>
            </div>
            <Button 
              size="sm" 
              variant="secondary" 
              className="rounded-lg h-8 gap-1"
              onClick={() => copyToClipboard(improvement.improvedCode)}
            >
              <Copy className="h-3 w-3" />
              Copy
            </Button>
          </div>
          <div className="relative z-10">
            <pre className="bg-background/90 p-4 rounded-xl text-xs font-code overflow-x-auto max-h-[400px]">
              <code>{improvement.improvedCode}</code>
            </pre>
            <div className="mt-4 p-4 bg-background/20 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-primary-foreground/90 italic">"{improvement.explanation}"</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
