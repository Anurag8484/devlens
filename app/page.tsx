"use client";
import Navbar from "./components/Navbar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Github,
  Zap,
  Shield,
  GitBranch,
  Filter,
  Sparkles,
  LogOut,
} from "lucide-react";
import Footer from "./components/Footer";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Spinner } from "@/components/ui/spinner";
import { AvatarFallback } from "@/components/ui/avatar";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const data = useSession();
  console.log(data);
  const router = useRouter();

  const companies = [
    {
      name: "Google",
      logo: (
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M12 2L2 12L12 22L22 12L12 2Z"
            className="stroke-foreground"
          />
        </svg>
      ),
    },

    {
      name: "Microsoft",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="2"
            width="4"
            height="4"
            className="dark:fill-black fill-black"
          />
          <rect
            x="9"
            y="2"
            width="4"
            height="4"
            className="dark:fill-white fill-black"
          />
          <rect
            x="2"
            y="9"
            width="4"
            height="4"
            className="dark:fill-white fill-black"
          />
          <rect
            x="9"
            y="9"
            width="4"
            height="4"
            className="dark:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      name: "Vercel",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 75 75" fill="currentColor">
          <path
            d="M37.5 0 L75 75 L0 75 Z"
            className="dark:fill-white fill-black"
          />
        </svg>
      ),
    },
    {
      name: "React",
      logo: (
        <svg
          className="w-8 h-8 stroke-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="12" cy="12" r="2.5" className="fill-foreground" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.5"
            transform="rotate(120 12 12)"
          />
        </svg>
      ),
    },
    {
      name: "Cursor",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" className="fill-foreground/80" />
          <circle cx="12" cy="12" r="4" className="fill-background" />
        </svg>
      ),
    },

    {
      name: "GitHub",
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path
            className="fill-foreground"
            d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.26.79-.57v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.3-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.12-.12-.3-.52-1.52.1-3.17 0 0 .97-.31 3.18 1.19a10.94 10.94 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.65.23 2.87.11 3.17.75.82 1.19 1.86 1.19 3.12 0 4.43-2.69 5.39-5.25 5.68.43.37.81 1.1.81 2.22v3.29c0 .32.21.68.8.57A11.5 11.5 0 0 0 23.5 12C23.5 5.64 18.36.5 12 .5Z"
          />
        </svg>
      ),
    },
  ];

  const features = [
    {
      icon: GitBranch,
      title: "Add Your GitHub Repos",
      description:
        "Connect any public GitHub repository and start tracking issues instantly.",
    },
    {
      icon: Filter,
      title: "Intelligent Filtering",
      description:
        "Filter issues by labels, repositories, and time ranges for better organization.",
    },
    {
      icon: Sparkles,
      title: "AI Summaries",
      description:
        "Get AI-powered summaries of complex issues to save time and stay focused.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for solo developers",
      features: ["Up to 5 repositories", "Basic analytics", "Email support"],
    },
    {
      name: "Professional",
      price: "$99",
      description: "For growing teams",
      features: [
        "Unlimited repositories",
        "Advanced analytics",
        "Priority support",
        "Team management",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

        <div className="relative container mx-auto px-4 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="mb-4">
              Developer Tools
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Track GitHub Issues
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hero-from to-hero-to mt-2">
                Like Never Before
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              DevLens helps developers manage GitHub issues across multiple
              repositories with intelligent filtering and AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/dashboard">
                  {status === "authenticated" && "Dashboard"}
                  {status === "unauthenticated" && (
                    <span className="flex items-center">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                  {status === "loading" && <Spinner className="w-5 h-5" />}
                </Link>
              </Button>
              {status === "authenticated" && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <Github className="w-5 h-5" />
                  LogOut
                </Button>
              )}
              {status === "unauthenticated" && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => router.push("/login")}
                >
                  <Github className="w-5 h-5" />
                  Login with GitHub
                </Button>
              )}
              {status === "loading" && (
                <Button size="lg" variant="outline" className="gap-2">
                  <Spinner className="w-5 h-5" />
                </Button>
              )}

              {/* : (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => router.push("/login")}
                >
                  <Github className="w-5 h-5" />
                  Login with GitHub
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features to streamline your development workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-card to-muted/30 border-border/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join developers who are already using DevLens to manage their GitHub
            issues more effectively.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/add-repo">
              Add Your First Repo <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-primary" />
              <span className="font-semibold">DevLens</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                API
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
