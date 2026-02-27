
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelector } from "@/components/language-selector";
import { FeedbackPanel } from "@/components/feedback-panel";
import { Play, Sparkles, Loader2, Code2, Eraser } from "lucide-react";
import { aiCodeReviewWithExplanations, AiCodeReviewWithExplanationsOutput } from "@/ai/flows/ai-code-review-with-explanations";
import { aiCodeImprovementSuggestions, CodeImprovementSuggestionsOutput } from "@/ai/flows/ai-code-improvement-suggestions";
import { toast } from "@/hooks/use-toast";
import { HistoryItem } from "@/lib/types";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OptimizerPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState<AiCodeReviewWithExplanationsOutput | null>(null);
  const [improvementResult, setImprovementResult] = useState<CodeImprovementSuggestionsOutput | null>(null);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleRunReview = async () => {
    if (!code.trim()) {
      toast({
        title: "Empty Input",
        description: "Please paste some code to review.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setReviewResult(null);
    setImprovementResult(null);

    try {
      const [review, improvement] = await Promise.all([
        aiCodeReviewWithExplanations({ code, language }),
        aiCodeImprovementSuggestions({ code, language })
      ]);

      setReviewResult(review);
      setImprovementResult(improvement);

      const historyItem: HistoryItem = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        code,
        language,
        summary: review.overallSummary,
        status: review.bugs.length > 0 ? 'needs-fix' : 'improved',
        review,
        improvement
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('coderefine_history') || '[]');
      localStorage.setItem('coderefine_history', JSON.stringify([historyItem, ...existingHistory]));

    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description: "There was an error connecting to the AI engine. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearEditor = () => {
    setCode("");
    setReviewResult(null);
    setImprovementResult(null);
  };

  if (loading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 mt-[70px] p-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-8 h-full">
          
          <div className="flex flex-col gap-4 animate-in slide-in-from-left-4 fade-in duration-500">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
              <div className="bg-secondary/30 px-6 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">editor.js</span>
                  </div>
                  <LanguageSelector value={language} onValueChange={setLanguage} />
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                    onClick={clearEditor}
                  >
                    <Eraser className="h-3.5 w-3.5" />
                    Clear
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-8 gap-1.5 bg-primary hover:bg-primary/90 rounded-lg px-4"
                    onClick={handleRunReview}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Play className="h-3.5 w-3.5 fill-current" />
                    )}
                    {isAnalyzing ? "Analyzing..." : "Run Review"}
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative group">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste your code here for review...&#10;function example() {&#10;  console.log('Hello World');&#10;}"
                  className="w-full h-full resize-none border-0 bg-transparent p-6 font-code text-base focus-visible:ring-0 placeholder:text-muted-foreground/30 focus:outline-none scrollbar-thin scrollbar-thumb-primary/20"
                />
                
                {!code && !isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 flex-col gap-4">
                    <Code2 className="h-24 w-24" />
                    <p className="text-xl font-headline font-semibold">Ready to refine code</p>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                      <Sparkles className="h-16 w-16 text-primary animate-bounce relative z-20" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-headline font-bold mb-1">AI Senior Dev is Thinking</h3>
                      <p className="text-sm text-muted-foreground flex items-center justify-center">
                        Analyzing logic and performance
                        <span className="ml-1 flex">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-160px)] pr-2 scrollbar-thin scrollbar-thumb-border">
            <FeedbackPanel 
              review={reviewResult} 
              improvement={improvementResult} 
              isAnalyzing={isAnalyzing} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
