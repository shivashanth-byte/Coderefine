
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, History, BookOpen, User, Sun, Moon, Info, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useUser } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";

const navItems = [
  { name: "Optimiser", href: "/optimizer", icon: LayoutDashboard },
  { name: "History", href: "/history", icon: History },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = async () => {
    // Handle mock logout
    localStorage.removeItem('coderefine_mock_user');
    // Handle firebase logout
    await signOut(getAuth());
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-background/80 backdrop-blur-md border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            CodeRefine
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? (
            <Moon className="h-5 w-5 transition-all" />
          ) : (
            <Sun className="h-5 w-5 transition-all" />
          )}
        </Button>
        
        {user ? (
          <>
            <Button variant="ghost" size="icon" className="rounded-full hover:text-destructive" onClick={handleLogout} title="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className={cn(
                "rounded-full border border-border transition-all",
                pathname === "/profile" ? "bg-primary/10 border-primary text-primary" : "hover:bg-muted"
              )}>
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <Button className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold px-6 shadow-lg shadow-primary/20">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
