"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Brain,
  MessageCircleHeart,
  Trophy,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { Linkedin, Instagram } from "@/components/icons";

const STEPS = [
  {
    icon: Linkedin,
    title: "Paste Links",
    description: "Add a LinkedIn URL and a public Instagram URL for each person.",
    color: "var(--color-accent-cyan)",
  },
  {
    icon: Brain,
    title: "AI Analyzes",
    description: "An AI agent reads both profiles — needs, hobbies, interests, personality.",
    color: "var(--color-accent-purple)",
  },
  {
    icon: MessageCircleHeart,
    title: "Agents Date",
    description: "Each person's agent has multi-turn conversations with every other agent.",
    color: "var(--color-accent-pink)",
  },
  {
    icon: Trophy,
    title: "See Rankings",
    description: "Get a ranked list of best matches for every person based on compatibility.",
    color: "var(--color-accent-amber)",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Deep Persona Analysis",
    description:
      "AI reads LinkedIn career data and Instagram lifestyle posts to build a complete dating persona — not just surface-level matching.",
  },
  {
    icon: MessageCircleHeart,
    title: "Real Dating Conversations",
    description:
      "Agents have 5-8 turn dating conversations, asking questions, sharing stories, and gauging chemistry — just like a real first date.",
  },
  {
    icon: Zap,
    title: "8-Dimension Scoring",
    description:
      "Compatibility is scored across shared interests, communication style, lifestyle, intellect, ambition, emotion, creativity, and energy.",
  },
  {
    icon: Shield,
    title: "Public Data Only",
    description:
      "We only use publicly available LinkedIn and Instagram profiles. No private data, no logins, no scraping behind walls.",
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent-purple)]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--color-accent-pink)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[var(--color-accent-cyan)]/8 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Agentic Dating
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-[var(--color-text-primary)]">
              Your AI Agent
            </span>
            <span className="block gradient-text">Dates For You</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed">
            Paste a LinkedIn & Instagram. An AI agent reads your persona, then dates other
            agents on your behalf — finding your best match through real conversations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/input"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg transition-all duration-300 hover:scale-105 glow-pink"
            >
              Start Matching
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/profiles"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-lg hover:bg-[var(--color-bg-card)] transition-all duration-300"
            >
              View Demo Profiles
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16">
            {[
              { value: "25+", label: "Real People" },
              { value: "300+", label: "AI Dates" },
              { value: "8", label: "Compatibility Dimensions" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
            Four steps from LinkedIn & Instagram to your ranked matches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative glass-card rounded-2xl p-6 hover:bg-[var(--color-bg-card-hover)] transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow (except last) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--color-border-light)]">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Not Just Matching.{" "}
            <span className="gradient-text">Dating.</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
            Your agents don&apos;t just compare profiles. They go on real dates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 hover:bg-[var(--color-bg-card-hover)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-purple)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--color-accent-purple)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl gradient-bg p-12 sm:p-16 text-center"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10">
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6 animate-float" fill="currentColor" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to let your agent date?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">
              Add real people, watch AI agents date, and discover who truly matches.
            </p>
            <Link
              href="/input"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--color-bg-primary)] font-semibold text-lg hover:bg-white/90 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[var(--color-accent-pink)]" fill="currentColor" />
            <span className="text-sm text-[var(--color-text-muted)]">
              AgentMatch — AI agents that date on your behalf
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <a href="https://github.com/jerrickg456/AgentMatch" target="_blank" rel="noopener" className="hover:text-[var(--color-text-primary)] transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
