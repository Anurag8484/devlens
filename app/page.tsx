"use client";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Github, Zap, Shield } from "lucide-react";
import Footer from "./components/Footer";

export default function LandingPage() {
  const { status } = useSession();
  const data = useSession();
  console.log(data)
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

  const founders = [
    { name: "Anurag Poonia", role: "CEO & Co-founder", image: "AJ" },
    { name: "Sarah Chen", role: "CTO & Co-founder", image: "SC" },
    { name: "Michael Park", role: "Head of Design", image: "MP" },
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
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section with Gradient */}
        <section className="relative overflow-hidden gradient-bg">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-black/5 border border-black/10 rounded-full text-sm font-medium text-foreground">
                  ✨ GitHub Repository Manager
                </div>
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
                  Manage Your Code
                  <span className="block text-black dark:text-white mt-2">
                    with Clarity
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  DevLens gives you complete visibility over your GitHub
                  repositories with a clean, professional interface designed for
                  modern developers.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                {status === "unauthenticated" ? (
                  <Button
                    onClick={() => router.push("/api/auth/signin")}
                    size="lg"
                    className="gap-2 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 px-8 h-12 rounded-lg"
                  >
                    <Github className="w-5 h-5" />
                    Connect with GitHub
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/dashboard")}
                    size="lg"
                    className="gap-2 bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 px-8 h-12 rounded-lg"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 h-12 border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 bg-transparent text-foreground rounded-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Features Cards with Animation */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                {
                  icon: Zap,
                  title: "Real-time Sync",
                  desc: "Automatically sync your repositories and stay up-to-date.",
                },
                {
                  icon: Shield,
                  title: "Secure",
                  desc: "Your data is encrypted and secure. We never store credentials.",
                },
                {
                  icon: Github,
                  title: "GitHub Native",
                  desc: "Built for GitHub developers, by GitHub developers.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="card-hover p-6 rounded-xl bg-white dark:bg-card border border-black/10 dark:border-white/10"
                >
                  <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-black dark:text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-light border-y border-black/10 dark:border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-muted-foreground mb-12 text-sm uppercase tracking-wide">
              Trusted by leading companies
            </p>
            <div className="companies-scroll">
              <div className="companies-scroll-content">
                {[...companies, ...companies].map((company, idx) => (
                  <div key={idx} className="logo-item group shrink-0">
                    <div className="w-20 h-20 bg-white dark:bg-card rounded-xl flex items-center justify-center font-semibold  dark:text-black border border-black/10 dark:border-white/10 transition-all duration-300 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-hover:border-black/30 dark:group-hover:border-white/30">
                      {company.logo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gradient-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan for your needs. Always flexible to
                scale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`card-hover rounded-xl p-8 border transition-all bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-2xl scale-105"
                      
                  `}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p
                    className={
                      plan.popular
                        ? "text-white/80 dark:text-black/80 mb-4"
                        : "text-muted-foreground mb-4"
                    }
                  >
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span
                        className={
                          plan.popular
                            ? "text-white/60 dark:text-black/60"
                            : "text-muted-foreground"
                        }
                      >
                        /month
                      </span>
                    )}
                  </div>
                  <Button
                    className={`w-full mb-8 ${
                      plan.popular
                        ? "bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90"
                        : "bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
                    }`}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-sm">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Meet the Founders
              </h2>
              <p className="text-lg text-muted-foreground">
                Passionate about making GitHub management effortless
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {founders.map((founder, idx) => (
                <div key={idx} className="text-center card-hover">
                  <div className="w-24 h-24 mx-auto mb-6 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold">
                    {founder.image}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-muted-foreground">{founder.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-light">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers managing their repositories with
              DevLens today.
            </p>
            <Button
              onClick={() =>
                router.push(
                  status === "unauthenticated"
                    ? "/api/auth/signin"
                    : "/dashboard"
                )
              }
              size="lg"
              className="gap-2 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 px-8 h-12 rounded-lg"
            >
              {status === "unauthenticated"
                ? "Sign in with GitHub"
                : "Go to Dashboard"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
