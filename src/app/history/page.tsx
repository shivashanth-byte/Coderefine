"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Search, Filter, Code2, Trash2, ChevronRight, ExternalLink, Sparkles, Bug, Lock, Zap, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { HistoryItem } from "@/lib/types";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = localStorage.getItem('coderefine_history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('coderefine_history', JSON.stringify(updated));
  };

  const filteredHistory = history.filter(item => 
    item.summary.toLowerCase().includes(search.toLowerCase()) || 
    item.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 mt-[70px] p-6 max-w-[1200px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-headline font-bold mb-2">Review History</h1>
              <p className="text-muted-foreground">Keep track of your growth and previous optimizations.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search reviews..." 
                  className="pl-10 w-[240px] bg-card border-border"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <Card key={item.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all group">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Code2 className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg capitalize">{item.language} Review</span>
                          <Badge 
                            variant={item.status === 'improved' ? 'default' : item.status === 'critical' ? 'destructive' : 'secondary'}
                            className={item.status === 'improved' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                          >
                            {item.status.replace('-', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-2">
                            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.summary}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" className="gap-2">
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-border">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-2xl">
                              <Code2 className="h-6 w-6 text-primary" />
                              {item.language.toUpperCase()} Review Insight
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-8 mt-6">
                            {/* Code Comparison Section */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Original Code</h4>
                                <pre className="p-4 bg-background border border-border rounded-xl font-code text-sm overflow-x-auto max-h-[400px]">
                                  <code>{item.code}</code>
                                </pre>
                              </div>
                              {item.improvement && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">Refined Code</h4>
                                  <pre className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl font-code text-sm overflow-x-auto max-h-[400px]">
                                    <code>{item.improvement.improvedCode}</code>
                                  </pre>
                                </div>
                              )}
                            </div>

                            {/* Refinement Logic */}
                            {item.improvement && (
                              <div className="p-6 bg-secondary/20 rounded-2xl border border-border">
                                <h4 className="flex items-center gap-2 font-bold mb-2">
                                  <Sparkles className="h-5 w-5 text-accent" />
                                  AI Refinement Strategy
                                </h4>
                                <p className="text-muted-foreground leading-relaxed italic">"{item.improvement.explanation}"</p>
                              </div>
                            )}

                            {/* Categorized Feedback */}
                            {item.review && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Bugs */}
                                {item.review.bugs.length > 0 && (
                                  <Card className="p-4 border-l-4 border-l-destructive bg-destructive/5">
                                    <h4 className="flex items-center gap-2 font-bold text-destructive mb-3">
                                      <Bug className="h-4 w-4" />
                                      Bugs ({item.review.bugs.length})
                                    </h4>
                                    <div className="space-y-3">
                                      {item.review.bugs.map((b, i) => (
                                        <div key={i} className="text-sm">
                                          <p className="font-semibold mb-1">Line {b.lineNumber}:</p>
                                          <p className="opacity-80">{b.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </Card>
                                )}

                                {/* Security */}
                                {item.review.securityRisks.length > 0 && (
                                  <Card className="p-4 border-l-4 border-l-orange-500 bg-orange-500/5">
                                    <h4 className="flex items-center gap-2 font-bold text-orange-500 mb-3">
                                      <Lock className="h-4 w-4" />
                                      Security ({item.review.securityRisks.length})
                                    </h4>
                                    <div className="space-y-3">
                                      {item.review.securityRisks.map((s, i) => (
                                        <div key={i} className="text-sm">
                                          <p className="font-semibold mb-1 capitalize">{s.severity} Risk:</p>
                                          <p className="opacity-80">{s.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </Card>
                                )}

                                {/* Optimizations */}
                                {item.review.optimizations.length > 0 && (
                                  <Card className="p-4 border-l-4 border-l-emerald-500 bg-emerald-500/5">
                                    <h4 className="flex items-center gap-2 font-bold text-emerald-500 mb-3">
                                      <Zap className="h-4 w-4" />
                                      Optimizations ({item.review.optimizations.length})
                                    </h4>
                                    <div className="space-y-3">
                                      {item.review.optimizations.map((o, i) => (
                                        <div key={i} className="text-sm">
                                          <p className="opacity-80">{o.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </Card>
                                )}

                                {/* Best Practices */}
                                {item.review.bestPractices.length > 0 && (
                                  <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-500/5">
                                    <h4 className="flex items-center gap-2 font-bold text-blue-500 mb-3">
                                      <BookOpen className="h-4 w-4" />
                                      Best Practices ({item.review.bestPractices.length})
                                    </h4>
                                    <div className="space-y-3">
                                      {item.review.bestPractices.map((bp, i) => (
                                        <div key={i} className="text-sm">
                                          <p className="opacity-80">{bp.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </Card>
                                )}
                              </div>
                            )}
                            
                            {/* Summary Footer */}
                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
                              <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Senior AI Summary</h4>
                              <p className="text-foreground/90 leading-relaxed">{item.summary}</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                              <Link href={`/?history=${item.id}`}>
                                <Button variant="outline" className="gap-2">
                                  <ExternalLink className="h-4 w-4" />
                                  Load in Editor
                                </Button>
                              </Link>
                              <Button variant="secondary" onClick={() => {
                                if (typeof window !== 'undefined' && navigator.clipboard) {
                                  navigator.clipboard.writeText(item.code);
                                }
                              }}>
                                Copy Original
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <History className="h-16 w-16 mb-4" />
                <p className="text-lg font-medium">No reviews found</p>
                <Link href="/">
                  <Button variant="link" className="text-primary">Start your first review</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
