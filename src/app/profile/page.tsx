
"use client";

import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Calendar, Code2, Award, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { HistoryItem } from "@/lib/types";

export default function ProfilePage() {
  const [stats, setStats] = useState({ totalReviews: 0, improvedCode: 0 });

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('coderefine_history') || '[]');
    setStats({
      totalReviews: history.length,
      improvedCode: history.filter((item: HistoryItem) => item.status === 'improved').length
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-[70px] p-6 max-w-[1000px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          
          {/* Left Column: User Card */}
          <div className="flex flex-col gap-6">
            <Card className="p-8 flex flex-col items-center text-center bg-card border-border shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
              <div className="relative mb-6">
                <Avatar className="h-28 w-28 border-4 border-background shadow-2xl">
                  <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full border-4 border-card">
                  <Award className="h-5 w-5" />
                </div>
              </div>
              <h2 className="text-2xl font-headline font-bold mb-1">Jane Developer</h2>
              <p className="text-muted-foreground text-sm mb-6">Senior Software Engineer</p>
              
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 rounded-xl h-9 text-xs font-semibold">Edit Profile</Button>
                <Button variant="secondary" size="icon" className="h-9 w-9 rounded-xl"><Settings className="h-4 w-4" /></Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-lg">
              <h3 className="font-headline font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                <User className="h-4 w-4 text-primary" />
                Personal Info
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Email Address</span>
                  <span className="text-sm font-medium flex items-center gap-2">
                    jane.dev@coderefine.ai
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">October 12, 2023</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">Active Subscription</span>
                  <span className="text-sm font-bold text-accent">Professional Tier</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 rounded-xl">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Stats & Progress */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 bg-primary/5 border-primary/20 shadow-sm group hover:border-primary/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Code2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Total Code Reviews</p>
                    <p className="text-3xl font-bold font-headline">{stats.totalReviews}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-emerald-500/5 border-emerald-500/20 shadow-sm group hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Refined Snippets</p>
                    <p className="text-3xl font-bold font-headline">{stats.improvedCode}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-headline font-bold">Language Mastery</h3>
                <Button variant="link" className="text-primary text-sm p-0">View Detailed Report</Button>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      TypeScript / React
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">Expert • 92%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-in slide-in-from-left duration-1000 ease-out" style={{ width: '92%' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      Python / Data Science
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">Advanced • 68%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent animate-in slide-in-from-left duration-1000 delay-200 ease-out" style={{ width: '68%' }} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      Systems Architecture
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">Intermediate • 41%</span>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-muted-foreground animate-in slide-in-from-left duration-1000 delay-400 ease-out" style={{ width: '41%' }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center text-center group">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="font-headline font-bold text-xl mb-2">Upcoming Milestone</h4>
              <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                You're just <span className="text-primary font-bold">4 code optimizations</span> away from unlocking the "Architect" badge. Keep refining!
              </p>
              <Button variant="secondary" className="rounded-xl px-8 h-10 font-bold">Start Review</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
