
"use client";

import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap, Video, FileCode, Lightbulb } from "lucide-react";

export default function LearnPage() {
  const resources = [
    { title: "Clean Code Principles", type: "Article", icon: FileCode, desc: "Learn the fundamentals of writing readable and maintainable code." },
    { title: "Advanced Python Patterns", type: "Video", icon: Video, desc: "Deep dive into Pythonic ways of solving complex problems." },
    { title: "Web Security 101", type: "Course", icon: GraduationCap, desc: "Protect your applications from common vulnerabilities." },
    { title: "AI-Assisted Development", type: "Guide", icon: Lightbulb, desc: "Master the art of prompting for better code generation." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-[70px] p-6 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
        <h1 className="text-3xl font-headline font-bold mb-2">Learning Hub</h1>
        <p className="text-muted-foreground mb-8 text-lg">Curated resources to help you become a world-class developer.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, i) => (
            <Card key={i} className="p-6 bg-card border-border hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <res.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xl">{res.title}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{res.type}</span>
                  </div>
                  <p className="text-muted-foreground">{res.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
