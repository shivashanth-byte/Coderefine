"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Shield, Zap, ArrowRight, Github, Users, Star } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";

export default function LandingPage() {
  const { user } = useUser();

  const developers = [
    { name: "Shiva Shanth Reddy" },
    { name: "Shiva Tej" },
    { name: "Manish Amballa" },
    { name: "Sampath Sriramoju" },
    { name: "Sheshi Charan" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Code Mastery</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tight">
              Elevate Your Code with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                CodeRefine AI
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the power of an automated Senior Developer. CodeRefine AI provides deep logic analysis, performance optimisations, and security auditing for your projects.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={user ? "/optimizer" : "/login"}>
                <Button size="lg" className="rounded-xl px-8 h-14 text-lg font-bold gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                  {user ? "Go to Optimiser" : "Sign Up & Get Started"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-xl px-8 h-14 text-lg font-semibold gap-2 group">
                <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                Explore Source
              </Button>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full animate-pulse" />
          </div>
        </section>

        {/* Brief Site Explanation */}
        <section className="py-24 bg-secondary/5 border-y border-border px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">Why CodeRefine AI?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-16 text-lg">
              Writing code is easy; writing *great* code is hard. We bridge that gap by using advanced generative AI to simulate the review process of a senior engineer, giving you instant, actionable feedback.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/5">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Refactor Instantly</h3>
                <p className="text-muted-foreground">Receive optimised versions of your functions, prioritising performance and readability without sacrificing logic.</p>
              </div>
              <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-orange-500/5">
                <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 mx-auto">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Security Audits</h3>
                <p className="text-muted-foreground">Automatically scan for SQL injections, XSS vulnerabilities, and improper authentication patterns in your snippets.</p>
              </div>
              <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/5">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 mx-auto">
                  <Star className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">Educational Feedback</h3>
                <p className="text-muted-foreground">Don't just fix it—learn from it. Every suggestion comes with a detailed explanation of "The Why" behind the change.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-4">
              <Users className="h-4 w-4" />
              Our Core Team
            </div>
            <h2 className="text-4xl font-headline font-bold mb-16">The Minds Behind CodeRefine</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {developers.map((dev, i) => (
                <div key={i} className="flex flex-col items-center group perspective-1000">
                  <div className="h-40 w-40 rounded-full bg-muted mb-6 border-4 border-card group-hover:border-primary transition-all duration-500 overflow-hidden relative shadow-2xl group-hover:scale-105">
                    <img 
                      src={`https://picsum.photos/seed/dev${i}/400/400`} 
                      alt={dev.name}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h4 className="font-bold text-xl mb-1">{dev.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border px-6 text-center">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              CodeRefine
            </span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md">
            The intelligent companion for modern developers. Empowering teams to ship better code, faster.
          </p>
          <div className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} CodeRefine AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
