"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Sparkles,
  Loader2,
  Zap,
  MessageCircle,
  Palette,
} from "lucide-react";
import { Linkedin, Instagram } from "@/components/icons";
import Link from "next/link";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

const PERSONALITY_LABELS: Record<string, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  neuroticism: "Neuroticism",
};

const ENERGY_CONFIG = {
  high: { color: "var(--color-accent-green)", icon: "⚡", label: "High Energy" },
  medium: { color: "var(--color-accent-amber)", icon: "🔄", label: "Medium Energy" },
  low: { color: "var(--color-accent-cyan)", icon: "🧘", label: "Low Energy" },
};

export default function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  async function fetchProfile() {
    try {
      const res = await fetch(`/api/profiles/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch {
      // Will show error state
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[var(--color-accent-purple)] animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          This person hasn&apos;t been analyzed yet.
        </p>
        <Link href="/profiles" className="text-[var(--color-accent-purple)] hover:underline">
          ← Back to profiles
        </Link>
      </div>
    );
  }

  const personalityData = profile.personality
    ? Object.entries(profile.personality).map(([key, value]) => ({
        trait: PERSONALITY_LABELS[key] || key,
        value: Math.round((value as number) * 100),
        fullMark: 100,
      }))
    : [];

  const energyConfig = profile.energy_level
    ? ENERGY_CONFIG[profile.energy_level]
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href="/profiles"
        className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to profiles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Photo & Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="glass-card rounded-2xl overflow-hidden sticky top-24">
            {/* Photo */}
            <div className="relative h-64 bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-[var(--color-accent-pink)]/20 flex items-center justify-center">
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center text-white text-4xl font-bold">
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
              {profile.tagline && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {profile.tagline}
                </p>
              )}

              <div className="space-y-3 text-sm">
                {profile.occupation && (
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <Briefcase className="w-4 h-4 text-[var(--color-text-muted)]" />
                    {profile.occupation}
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <Briefcase className="w-4 h-4 text-[var(--color-text-muted)]" />
                    {profile.company}
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />
                    {profile.location}
                  </div>
                )}
                {profile.education && (
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <GraduationCap className="w-4 h-4 text-[var(--color-text-muted)]" />
                    {profile.education}
                  </div>
                )}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {energyConfig && (
                  <div className="p-3 rounded-xl bg-[var(--color-bg-primary)]">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">Energy</div>
                    <div className="flex items-center gap-1.5" style={{ color: energyConfig.color }}>
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">{energyConfig.label}</span>
                    </div>
                  </div>
                )}
                {profile.communication_style && (
                  <div className="p-3 rounded-xl bg-[var(--color-bg-primary)]">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">Style</div>
                    <div className="flex items-center gap-1.5 text-[var(--color-accent-cyan)]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium truncate">{profile.communication_style}</span>
                    </div>
                  </div>
                )}
                {profile.love_language && (
                  <div className="p-3 rounded-xl bg-[var(--color-bg-primary)] col-span-2">
                    <div className="text-xs text-[var(--color-text-muted)] mb-1">Love Language</div>
                    <div className="flex items-center gap-1.5 text-[var(--color-accent-pink)]">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">{profile.love_language}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Source links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077B5]/10 text-[#0077B5] text-sm font-medium hover:bg-[#0077B5]/20 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E4405F]/10 text-[#E4405F] text-sm font-medium hover:bg-[#E4405F]/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Summary */}
          {profile.summary && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Sparkles className="w-5 h-5 text-[var(--color-accent-purple)]" />
                AI Analysis Summary
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {profile.summary}
              </p>
            </div>
          )}

          {/* Personality Radar */}
          {personalityData.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-6">
                <Palette className="w-5 h-5 text-[var(--color-accent-cyan)]" />
                Personality Profile (Big Five)
              </h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={personalityData}>
                    <PolarGrid stroke="#27272a" />
                    <PolarAngleAxis
                      dataKey="trait"
                      tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="Personality"
                      dataKey="value"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Needs */}
          {profile.needs && profile.needs.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Heart className="w-5 h-5 text-[var(--color-accent-pink)]" />
                Needs in a Partner
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.needs.map((need) => (
                  <div
                    key={need}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-accent-pink)]/5 border border-[var(--color-accent-pink)]/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-pink)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{need}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies & Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profile.hobbies && profile.hobbies.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">🎯 Hobbies</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="px-3 py-1.5 rounded-full bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] text-sm"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.interests && profile.interests.length > 0 && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">💡 Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-full bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Values */}
          {profile.values && profile.values.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">🌟 Core Values</h2>
              <div className="flex flex-wrap gap-2">
                {profile.values.map((value) => (
                  <span
                    key={value}
                    className="px-3 py-1.5 rounded-full bg-[var(--color-accent-amber)]/10 text-[var(--color-accent-amber)] text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lifestyle */}
          {profile.lifestyle && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">🌍 Lifestyle</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {profile.lifestyle}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
