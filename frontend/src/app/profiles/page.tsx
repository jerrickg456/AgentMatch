"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Briefcase,
  Sparkles,
  Search,
  Loader2,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const res = await fetch("/api/profiles");
      if (res.ok) {
        const data = await res.json();
        setProfiles(data);
      }
    } catch {
      // Will show empty state
    } finally {
      setLoading(false);
    }
  }

  const filtered = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.occupation || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-pink)]/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-[var(--color-accent-pink)]" />
          </div>
          <h1 className="text-3xl font-bold">Profiles</h1>
          <span className="ml-2 px-3 py-1 rounded-full bg-[var(--color-bg-card)] text-sm text-[var(--color-text-muted)]">
            {profiles.length} people
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] text-lg">
          AI-analyzed dating profiles built from LinkedIn and Instagram data.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl pl-12 pr-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/50 transition-all"
            placeholder="Search by name, occupation, or location..."
          />
        </div>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-purple)] animate-spin mb-4" />
          <p className="text-[var(--color-text-muted)]">Loading profiles...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && profiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-card)] flex items-center justify-center mb-6">
            <UserCircle2 className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No profiles yet</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
            Add people with their LinkedIn and Instagram links to see AI-generated dating profiles.
          </p>
          <Link
            href="/input"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            Add People
          </Link>
        </motion.div>
      )}

      {/* Profile Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/profiles/${profile.person_id}`}>
                <div className="glass-card rounded-2xl overflow-hidden hover:bg-[var(--color-bg-card-hover)] transition-all duration-300 group cursor-pointer">
                  {/* Photo / Avatar */}
                  <div className="relative h-48 bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-[var(--color-accent-pink)]/20 flex items-center justify-center">
                    {profile.photo_url ? (
                      <img
                        src={profile.photo_url}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-3xl font-bold">
                        {profile.name.charAt(0)}
                      </div>
                    )}
                    {/* Energy level badge */}
                    {profile.energy_level && (
                      <div className={cn(
                        "absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium",
                        profile.energy_level === "high" && "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)]",
                        profile.energy_level === "medium" && "bg-[var(--color-accent-amber)]/20 text-[var(--color-accent-amber)]",
                        profile.energy_level === "low" && "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]",
                      )}>
                        ⚡ {profile.energy_level}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--color-accent-purple)] transition-colors">
                      {profile.name}
                    </h3>
                    {profile.tagline && (
                      <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                        {profile.tagline}
                      </p>
                    )}

                    <div className="flex flex-col gap-1.5 text-xs text-[var(--color-text-muted)]">
                      {profile.occupation && (
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span className="truncate">{profile.occupation}</span>
                        </div>
                      )}
                      {profile.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Interests pills */}
                    {profile.interests && profile.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {profile.interests.slice(0, 4).map((interest) => (
                          <span
                            key={interest}
                            className="px-2.5 py-1 rounded-full bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)] text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                        {profile.interests.length > 4 && (
                          <span className="px-2.5 py-1 rounded-full bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] text-xs">
                            +{profile.interests.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
