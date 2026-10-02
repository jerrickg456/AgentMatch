"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  Medal,
  ChevronDown,
  Loader2,
  Users,
  Sparkles,
  Heart,
  ArrowRight,
  MessageCircleHeart,
} from "lucide-react";
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
import { COMPATIBILITY_DIMENSIONS } from "@/lib/types";
import type { Profile, Ranking, RankedMatch, Score } from "@/lib/types";

export default function RankingsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<RankedMatch | null>(null);
  const [matchScores, setMatchScores] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [profilesRes, rankingsRes] = await Promise.all([
        fetch("/api/profiles"),
        fetch("/api/rankings"),
      ]);
      if (profilesRes.ok) {
        const profilesData = await profilesRes.json();
        setProfiles(profilesData);
        if (profilesData.length > 0) {
          setSelectedPerson(profilesData[0].person_id);
        }
      }
      if (rankingsRes.ok) {
        const rankingsData = await rankingsRes.json();
        setRankings(rankingsData);
      }
    } catch {
      // Silent
    } finally {
      setLoading(false);
    }
  }

  async function fetchScores(personId: string, matchId: string) {
    try {
      const res = await fetch(`/api/scores?scorer=${personId}&target=${matchId}`);
      if (res.ok) {
        const data = await res.json();
        setMatchScores(data);
      }
    } catch {
      // Silent
    }
  }

  const currentRanking = rankings.find((r) => r.person_id === selectedPerson);
  const currentProfile = profiles.find((p) => p.person_id === selectedPerson);

  const handleMatchClick = (match: RankedMatch) => {
    setSelectedMatch(match);
    if (selectedPerson) {
      fetchScores(selectedPerson, match.person_id);
    }
  };

  const scoreData = matchScores
    ? COMPATIBILITY_DIMENSIONS.map((dim) => ({
        dimension: dim.emoji + " " + dim.label,
        score: Math.round(((matchScores as unknown as Record<string, unknown>)[dim.key] as number || 0) * 10),
        fullMark: 100,
      }))
    : [];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-[var(--color-accent-amber)]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-sm font-bold text-[var(--color-text-muted)]">#{rank}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "var(--color-accent-green)";
    if (score >= 6) return "var(--color-accent-cyan)";
    if (score >= 4) return "var(--color-accent-amber)";
    return "var(--color-accent-pink)";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-amber)]/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[var(--color-accent-amber)]" />
          </div>
          <h1 className="text-3xl font-bold">Rankings</h1>
        </div>
        <p className="text-[var(--color-text-secondary)] text-lg">
          See who matches best with each person, ranked by mutual compatibility.
        </p>
      </motion.div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-purple)] animate-spin mb-4" />
          <p className="text-[var(--color-text-muted)]">Loading rankings...</p>
        </div>
      )}

      {!loading && rankings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-card)] flex items-center justify-center mb-6">
            <Trophy className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No rankings yet</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
            Rankings are generated after all agents finish dating. Start a dating session first.
          </p>
          <Link
            href="/dating"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:scale-105 transition-transform"
          >
            <MessageCircleHeart className="w-4 h-4" />
            Go to Dating
          </Link>
        </motion.div>
      )}

      {!loading && rankings.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Person selector + Ranked list */}
          <div className="lg:col-span-2 space-y-6">
            {/* Person selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:bg-[var(--color-bg-card-hover)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                    {currentProfile?.name?.charAt(0) || "?"}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">
                      {currentProfile?.name || "Select a person"}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {currentRanking
                        ? `${currentRanking.ranked_matches.length} matches ranked`
                        : "Choose who to view rankings for"}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[var(--color-text-muted)] transition-transform",
                    dropdownOpen && "rotate-180"
                  )}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-20 max-h-60 overflow-y-auto">
                  {profiles.map((profile) => (
                    <button
                      key={profile.person_id}
                      onClick={() => {
                        setSelectedPerson(profile.person_id);
                        setSelectedMatch(null);
                        setMatchScores(null);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--color-bg-card-hover)] transition-colors",
                        selectedPerson === profile.person_id && "bg-[var(--color-accent-purple)]/5"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold">
                        {profile.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{profile.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">
                          {profile.occupation || profile.tagline || ""}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ranked matches list */}
            {currentRanking && (
              <div className="space-y-3">
                {currentRanking.ranked_matches.map((match, index) => (
                  <motion.button
                    key={match.person_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleMatchClick(match)}
                    className={cn(
                      "w-full text-left glass-card rounded-xl p-4 transition-all duration-200",
                      selectedMatch?.person_id === match.person_id
                        ? "border-[var(--color-accent-purple)]/50 bg-[var(--color-accent-purple)]/5"
                        : "hover:bg-[var(--color-bg-card-hover)]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-primary)] flex items-center justify-center">
                        {getRankIcon(match.rank)}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent-cyan)] flex items-center justify-center text-white font-bold">
                        {match.name?.charAt(0) || "?"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{match.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)] truncate">
                          {match.occupation || match.tagline || ""}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div
                          className="text-xl font-bold"
                          style={{ color: getScoreColor(match.mutual_score) }}
                        >
                          {match.mutual_score.toFixed(1)}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)]">
                          mutual score
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                    </div>

                    {/* Score bars */}
                    <div className="flex gap-4 mt-3 ml-14">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[var(--color-text-muted)]">My interest</span>
                          <span style={{ color: getScoreColor(match.my_score) }}>
                            {match.my_score.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${match.my_score * 10}%`,
                              backgroundColor: getScoreColor(match.my_score),
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[var(--color-text-muted)]">Their interest</span>
                          <span style={{ color: getScoreColor(match.their_score) }}>
                            {match.their_score.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${match.their_score * 10}%`,
                              backgroundColor: getScoreColor(match.their_score),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Score detail */}
          <div className="lg:col-span-1">
            {selectedMatch && matchScores ? (
              <motion.div
                key={selectedMatch.person_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-2xl p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-cyan)] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {selectedMatch.name?.charAt(0)}
                  </div>
                  <h3 className="text-lg font-semibold">{selectedMatch.name}</h3>
                  <div className="text-sm text-[var(--color-text-muted)]">
                    Rank #{selectedMatch.rank}
                  </div>
                  <div
                    className="text-3xl font-bold mt-2"
                    style={{ color: getScoreColor(selectedMatch.mutual_score) }}
                  >
                    {selectedMatch.mutual_score.toFixed(1)}
                    <span className="text-sm text-[var(--color-text-muted)]"> /10</span>
                  </div>
                </div>

                {/* Radar chart */}
                {scoreData.length > 0 && (
                  <div className="h-56 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={scoreData}>
                        <PolarGrid stroke="#27272a" />
                        <PolarAngleAxis
                          dataKey="dimension"
                          tick={{ fill: "#71717a", fontSize: 10 }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Score"
                          dataKey="score"
                          stroke="#a855f7"
                          fill="#a855f7"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Dimension breakdown */}
                <div className="space-y-3">
                  {COMPATIBILITY_DIMENSIONS.map((dim) => {
                    const value = ((matchScores as unknown as Record<string, unknown>)[dim.key] as number) || 0;
                    return (
                      <div key={dim.key}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[var(--color-text-secondary)]">
                            {dim.emoji} {dim.label}
                          </span>
                          <span style={{ color: getScoreColor(value) }}>
                            {value.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--color-bg-primary)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${value * 10}%`,
                              backgroundColor: getScoreColor(value),
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reasoning */}
                {selectedMatch.reasoning && (
                  <div className="mt-6 p-4 rounded-xl bg-[var(--color-bg-primary)]">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-accent-purple)] mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI Reasoning
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {selectedMatch.reasoning}
                    </p>
                  </div>
                )}

                {/* View profiles link */}
                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/profiles/${selectedPerson}`}
                    className="flex-1 text-center px-3 py-2 rounded-xl bg-[var(--color-accent-pink)]/10 text-[var(--color-accent-pink)] text-sm font-medium hover:bg-[var(--color-accent-pink)]/20 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 inline mr-1" />
                    {currentProfile?.name?.split(" ")[0]}
                  </Link>
                  <Link
                    href={`/profiles/${selectedMatch.person_id}`}
                    className="flex-1 text-center px-3 py-2 rounded-xl bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)] text-sm font-medium hover:bg-[var(--color-accent-cyan)]/20 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 inline mr-1" />
                    {selectedMatch.name?.split(" ")[0]}
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="glass-card rounded-2xl flex flex-col items-center justify-center py-16 text-center sticky top-24">
                <Trophy className="w-10 h-10 text-[var(--color-text-muted)] mb-4" />
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Select a match to see detailed compatibility breakdown
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
