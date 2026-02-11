import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import {
  Zap,
  BarChart3,
  Globe,
  Shield,
  Code2,
  GitBranch,
  Rocket,
  ArrowRight,
  Check,
  Terminal,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Rocket,
    title: "Instant Deployments",
    description: "Deploy your applications in seconds with zero configuration.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Monitor performance, traffic, and errors in real-time dashboards.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Automatic distribution across 200+ edge locations worldwide.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "DDoS protection, SSL/TLS, and advanced security features.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Complete API and CLI for full deployment automation.",
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    description:
      "Connect GitHub, GitLab, or Bitbucket for automatic deployments.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for hobbyists",
    features: [
      "Up to 3 projects",
      "5GB bandwidth",
      "Community support",
      "Preview URLs",
    ],
  },
  {
    name: "Pro",
    price: "29",
    description: "For professional developers",
    highlighted: true,
    features: [
      "Unlimited projects",
      "100GB bandwidth",
      "Priority support",
      "Custom domains",
      "Advanced analytics",
      "Team collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale teams",
    features: [
      "Everything in Pro",
      "Custom bandwidth",
      "24/7 support",
      "SLA guarantee",
      "Dedicated infrastructure",
      "SSO & Audit logs",
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary tracking-wide uppercase font-heading">
                v2.0 Now Available
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] font-heading tracking-tighter"
            >
              SHIP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                FASTER.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground/80 max-w-xl mb-10 leading-relaxed font-light"
            >
              The next-generation build server for modern engineering teams.
              Automated pipelines, instant previews, and global edge delivery.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 h-12 rounded-none skew-x-[-10deg] border border-primary/50 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300 transform"
                >
                  <span className="skew-x-[10deg] flex items-center relative z-10">
                    START DEPLOYING <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-[10deg]"></div>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="font-bold text-lg px-8 h-12 rounded-none skew-x-[-10deg] border border-white/20 hover:bg-white/5 transition-all text-white"
              >
                <span className="skew-x-[10deg]">DOCUMENTATION</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-white/10 p-2 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#0D0D10] rounded-lg p-6 font-mono text-sm border border-white/5 shadow-inner">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-white/50">
                    $ <span className="text-primary">buildbox</span> init
                    my-project
                  </p>
                  <p className="text-emerald-500">
                    ✓ Project initialized successfully
                  </p>
                  <p className="text-white/50">
                    $ <span className="text-primary">buildbox</span> deploy
                  </p>
                  <p className="text-white/80">
                    <span className="text-blue-400">ℹ</span> Analyzing project
                    structure...
                  </p>
                  <p className="text-white/80">
                    <span className="text-blue-400">ℹ</span> Detected Next.js
                    application
                  </p>
                  <p className="text-white/80">
                    <span className="text-purple-400">➜</span> Building
                    application... <span className="text-white/30">(2.4s)</span>
                  </p>
                  <p className="text-emerald-500">
                    ✓ Deployment complete:{" "}
                    <span className="underline decoration-dashed decoration-white/30 cursor-pointer hover:text-white">
                      https://my-project.buildbox.app
                    </span>
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-card border border-primary/30 p-4 rounded-lg shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-md">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold">
                      Status
                    </p>
                    <p className="text-sm font-bold text-white">Online 100%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 -left-8 bg-card border border-primary/30 p-4 rounded-lg shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-md">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider font-bold">
                      Build Time
                    </p>
                    <p className="text-sm font-bold text-white">2.4s Average</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-white/30 mb-8 text-sm font-mono uppercase tracking-widest">
            Powering Next-Gen Teams
          </h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {trustedCompanies.map((company) => (
              <h3
                key={company}
                className="text-xl font-bold font-heading text-white"
              >
                {company}
              </h3>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 font-heading tracking-tight">
              BUILT FOR SCALE
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Everything you need to ship production-grade applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                  }}
                  className="group relative p-8 bg-card/30 border border-white/5 hover:border-primary/50 transition-colors duration-300 rounded-none overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 40%)`
                    }}
                  />

                  <div className="w-14 h-14 bg-white/5 rounded-none flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors relative z-10">
                    <Icon className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-heading relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed relative z-10 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Demo Section */}
      <section className="py-24 bg-card/30 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 font-heading">
              DEVELOPER EXPERIENCE <br />
              <span className="text-primary">REDEFINED</span>
            </h2>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              Forget complex YAML files and dashboard configuration hunting.
              BuildBox infers your framework, builds efficiently, and deploys
              globally.
            </p>

            <ul className="space-y-6">
              {[
                "Framework Agnostic",
                "Preview Environments",
                "Instant Rollbacks",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-20"></div>
            <div className="relative bg-[#0D0D10] text-[#a9b7c6] p-4 rounded-lg font-mono text-sm border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-white/30">bash</div>
              </div>
              <pre className="overflow-x-auto">
                <code>
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-blue-400">~/projects/my-app</span>{" "}
                  <span className="text-yellow-400">git</span> push origin main
                  {"\n\n"}
                  <span className="text-gray-500">
                    Enumerating objects: 15, done.
                  </span>
                  {"\n"}
                  <span className="text-gray-500">
                    Counting objects: 100% (15/15), done.
                  </span>
                  {"\n"}
                  <span className="text-gray-500">
                    Writing objects: 100% (9/9), 1.25 KiB | 1.25 MiB/s, done.
                  </span>
                  {"\n\n"}
                  <span className="text-purple-400">remote:</span>{" "}
                  <span className="font-bold text-white">
                    BuildBox Builder detected.
                  </span>
                  {"\n"}
                  <span className="text-purple-400">remote:</span> Building...
                  {"\n"}
                  <span className="text-purple-400">remote:</span> [1/3]
                  Resolving packages...
                  {"\n"}
                  <span className="text-purple-400">remote:</span> [2/3]
                  Fetching packages...
                  {"\n"}
                  <span className="text-purple-400">remote:</span> [3/3] Linking
                  dependencies...
                  {"\n"}
                  <span className="text-purple-400">remote:</span> Build
                  completed in 4.2s.
                  {"\n"}
                  <span className="text-purple-400">remote:</span> Deploying to
                  Edge Network...
                  {"\n\n"}
                  <span className="text-green-400">remote:</span>{" "}
                  <span className="font-bold text-white">
                    Deployment Successful!
                  </span>{" "}
                  🚀{"\n"}
                  <span className="text-green-400">remote:</span> Preview:{" "}
                  <span className="underline text-blue-400">
                    https://my-app-git-main.buildbox.app
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 font-heading">
              PRICING
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Start for free. Scale when you need to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 border backdrop-blur-sm transition-all duration-300 ${plan.highlighted
                  ? "bg-primary/5 border-primary/50 shadow-[0_0_30px_rgba(0,180,216,0.1)] scale-105 z-10"
                  : "bg-card/20 border-white/10 hover:border-white/20"
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 font-heading">
                  {plan.name}
                </h3>
                <p className="text-white/50 mb-8 text-sm">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold font-heading">
                    ${plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-white/30 ml-2">/mo</span>
                  )}
                </div>
                <Button
                  className={`w-full mb-8 h-12 font-bold ${plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                >
                  CHOOSE {plan.name.toUpperCase()}
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary/20 via-primary/5 to-transparent p-12 lg:p-24 border border-primary/20 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-5xl sm:text-6xl font-black mb-8 font-heading">
              READY TO LAUNCH?
            </h2>
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-bold text-xl px-12 h-16 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Start For Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */} {/* Use existing Footer or refactor it as well but sticking to plan */}
      <footer className="border-t border-white/10 py-16 px-6 bg-card/20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold text-xl">BUILDBOX</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The modern continuous deployment platform for developers who ship fast.
            </p>
          </div>
          {/* Simple footer links for now */}
          <div className="col-span-1">
            <h4 className="font-bold mb-4 font-heading">PRODUCT</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold mb-4 font-heading">COMPANY</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold mb-4 font-heading">LEGAL</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-sm">
          © 2024 BuildBox Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
