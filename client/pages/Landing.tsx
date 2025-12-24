import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Zap,
  BarChart3,
  Globe,
  Shield,
  Code2,
  GitBranch,
  Rocket,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Instant Deployments",
    description: "Deploy your applications in seconds with zero configuration",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Monitor performance, traffic, and errors in real-time dashboards",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Automatic distribution across 200+ edge locations worldwide",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "DDoS protection, SSL/TLS, and advanced security features",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "Complete API and CLI for full deployment automation",
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    description:
      "Connect GitHub, GitLab, or Bitbucket for automatic deployments",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for learning and hobby projects",
    features: [
      "Up to 3 projects",
      "5GB bandwidth",
      "Community support",
      "Preview URLs",
      "Basic analytics",
    ],
  },
  {
    name: "Professional",
    price: "20",
    description: "For professional developers and small teams",
    highlighted: true,
    features: [
      "Unlimited projects",
      "100GB bandwidth",
      "Priority support",
      "Custom domains",
      "Advanced analytics",
      "Team collaboration",
      "Environment variables",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale applications",
    features: [
      "Everything in Pro",
      "Custom bandwidth",
      "24/7 support",
      "SLA guarantee",
      "Dedicated infrastructure",
      "Advanced security",
      "Custom integrations",
    ],
  },
];

const trustedCompanies = [
  "Airbnb",
  "Stripe",
  "GitHub",
  "Notion",
  "Figma",
  "Linear",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              ✨ The Future of Deployment
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Deploy with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/70">
              {" "}
              confidence
            </span>
          </h1>

          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            BuildBox is the modern deployment platform for developers and teams.
            Ship your applications faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-base px-8">
                Learn More
              </Button>
            </a>
          </div>

          {/* Code snippet preview */}
          <div className="mx-auto max-w-3xl mt-12">
            <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-foreground/80 overflow-x-auto">
                <code>{`$ buildbox deploy

🚀 Preparing deployment...
📦 Building application...
✓ Build complete (2.3s)
🌍 Deploying to 200+ regions...
✓ Deployment complete

🎉 Your app is live!
→ https://my-app.buildbox.dev`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-foreground/60 mb-8 text-sm font-medium">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {trustedCompanies.map((company) => (
              <div
                key={company}
                className="text-center text-foreground/40 font-semibold"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything you need to deploy
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Powerful features designed for modern developers and teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-card border border-border p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Always flexible to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`border rounded-lg p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-primary bg-background shadow-lg shadow-primary/20 relative scale-105"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-background text-xs font-semibold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/60 mb-6 text-sm">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-foreground/60 ml-2">/month</span>
                  )}
                </div>

                <Button
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Get Started
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to deploy faster?
          </h2>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already shipping with BuildBox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-base px-8"
              >
                Start Deploying Now
              </Button>
            </Link>
            <a href="#docs">
              <Button size="lg" variant="outline" className="text-base px-8">
                View Documentation
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
