
"use client";

import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Sparkles, Brain, Cpu, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-[70px] p-6 max-w-[1000px] mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">About CodeRefine AI</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We are dedicated to bridging the gap between junior developers and industry experts through advanced AI mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="p-8 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize high-level code architectural knowledge by providing instant, actionable feedback powered by large language models.
            </p>
          </Card>
          <Card className="p-8 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">The Technology</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built on Google's Genkit and Gemini 1.5, we leverage state-of-the-art inference to understand code context, not just syntax.
            </p>
          </Card>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            CodeRefine AI started as a small project to automate the mundane parts of code reviews. It evolved into a full-fledged mentor that helps thousands of developers write more secure, performant, and maintainable code every day.
          </p>
          <p className="text-lg text-muted-foreground">
            We believe that better code leads to a better world, and we're here to help every developer reach their full potential.
          </p>
        </div>
      </main>
    </div>
  );
}
