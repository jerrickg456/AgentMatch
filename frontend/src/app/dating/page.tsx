"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleHeart,
  Loader2,
  Play,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { DateRecord } from "@/lib/types";

function DatingContent() {
  const searchParams = useSearchParams();
  const urlSessionId = searchParams.get("session_id");

  const [sessionId, setSessionId] = useState<string>(urlSessionId || "");
  const [sessions, setSessions] = useState<{ id: string; name: string; created_at: string; total_dates: number }[]>([]);
  const [dates, setDates] = useState<DateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<DateRecord | null>(null);

  // Chat scroll management - 100% manual user scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [isSimulating, setIsSimulating] = useState(false);
  const isSimulatingRef = useRef(false);

  // Load sessions list
  useEffect(() => {
    async function loadSessions() {
      try {
        const res = await fetch("/api/sessions");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setSessions(data);
            if (!sessionId && data.length > 0) {
              setSessionId(data[0].id);
            }
          }
        }
      } catch {
        // Silent
      }
    }
    loadSessions();
  }, []);

  // Poll for date updates every 3 seconds
  useEffect(() => {
    fetchDates();
    const interval = setInterval(fetchDates, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  async function fetchDates() {
    try {
      const url = sessionId
        ? `/api/dates?session_id=${encodeURIComponent(sessionId)}`
        : "/api/dates";

      const res = await fetch(url);
      if (res.ok) {
        const data: DateRecord[] = await res.json();
        setDates(data);

        // Keep current selected date or pick first
        setSelectedDate((prev) => {
          if (!prev && data.length > 0) return data[0];
          if (prev) {
            const found = data.find((d) => d.id === prev.id);
            return found || data[0] || null;
          }
          return null;
        });

        // If there is a pending date in this session, trigger simulation for THAT specific date
        const pending = data.find((d) => d.status === "pending");
        if (pending && !isSimulatingRef.current) {
          triggerNextSimulation(pending.id);
        }
      }
    } catch {
      // Silent
    } finally {
      setLoading(false);
    }
  }

  async function triggerNextSimulation(dateId?: string) {
    if (isSimulatingRef.current) return;
    isSimulatingRef.current = true;
    setIsSimulating(true);

    try {
      await fetch("/api/dates/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          dateId
            ? { date_id: dateId }
            : sessionId
            ? { session_id: sessionId }
            : { all: true }
        ),
      });

      await fetchDates();
    } catch {
      // Ignore
    } finally {
      isSimulatingRef.current = false;
      setIsSimulating(false);
    }
  }

  const completedDates = dates.filter((d) => d.status === "completed");
  const activeDates = dates.filter((d) => d.status === "in_progress");
  const pendingDates = dates.filter((d) => d.status === "pending");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-pink)]/10 flex items-center justify-center">
                <MessageCircleHeart className="w-5 h-5 text-[var(--color-accent-pink)]" />
              </div>
              <h1 className="text-3xl font-bold">Agent Dating</h1>
            </div>
            <p className="text-[var(--color-text-secondary)] text-base">
              Autonomous AI agent dates generated from real LinkedIn & Instagram backgrounds.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Session Selector */}
            {sessions.length > 0 && (
              <div className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">Session:</span>
                <select
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  className="bg-transparent text-[var(--color-text-primary)] font-medium outline-none cursor-pointer"
                >
                  <option value="" className="bg-[var(--color-bg-primary)]">Latest Session</option>
                  {sessions.map((s, idx) => (
                    <option key={s.id} value={s.id} className="bg-[var(--color-bg-primary)]">
                      {s.name || `Session #${idx + 1}`} ({s.total_dates} dates)
                    </option>
                  ))}
                  <option value="all" className="bg-[var(--color-bg-primary)]">All Dating History</option>
                </select>
              </div>
            )}

            {pendingDates.length > 0 && (
              <button
                onClick={() => triggerNextSimulation(pendingDates[0]?.id)}
                disabled={isSimulating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white font-semibold text-xs hover:scale-105 transition-all glow-pink disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Simulating Date...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Simulate Date ({pendingDates.length} pending)
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="glass-card rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-green)]/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-green)]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{completedDates.length}</div>
            <div className="text-xs text-[var(--color-text-muted)]">Completed</div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-purple)]/10 flex items-center justify-center">
            <Play className="w-4 h-4 text-[var(--color-accent-purple)]" />
          </div>
          <div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {activeDates.length}
              {activeDates.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] pulse-dot" />
              )}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">In Progress</div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-card-hover)] flex items-center justify-center">
            <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
          </div>
          <div>
            <div className="text-2xl font-bold">{pendingDates.length}</div>
            <div className="text-xs text-[var(--color-text-muted)]">Pending</div>
          </div>
        </div>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-purple)] animate-spin mb-4" />
          <p className="text-[var(--color-text-muted)]">Loading dates...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && dates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-card)] flex items-center justify-center mb-6">
            <MessageCircleHeart className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No dates in this session</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
            Add 2 or more people to start a personalized agent dating session.
          </p>
          <Link
            href="/input"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:scale-105 transition-transform"
          >
            <Users className="w-4 h-4" />
            Add People
          </Link>
        </motion.div>
      )}

      {/* Main layout: Date List + Chat View */}
      {!loading && dates.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Date list sidebar */}
          <div className="lg:col-span-2 space-y-3 max-h-[72vh] overflow-y-auto pr-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2 px-1">
              Active Combinations ({dates.length})
            </div>
            {dates.map((date, index) => (
              <motion.button
                key={date.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "w-full text-left glass-card rounded-xl p-4 transition-all duration-200",
                  selectedDate?.id === date.id
                    ? "border-[var(--color-accent-purple)]/50 bg-[var(--color-accent-purple)]/10 ring-1 ring-[var(--color-accent-purple)]/30"
                    : "hover:bg-[var(--color-bg-card-hover)]"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold ring-2 ring-[var(--color-bg-card)]">
                        {date.profile_a?.name?.charAt(0) || "A"}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[var(--color-accent-cyan)] flex items-center justify-center text-white text-xs font-bold ring-2 ring-[var(--color-bg-card)]">
                        {date.profile_b?.name?.charAt(0) || "B"}
                      </div>
                    </div>
                    <div className="text-sm font-medium truncate max-w-[160px]">
                      {date.profile_a?.name || "Person A"}{" "}
                      <span className="text-[var(--color-text-muted)]">×</span>{" "}
                      {date.profile_b?.name || "Person B"}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      date.status === "completed" && "bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)]",
                      date.status === "in_progress" && "bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]",
                      date.status === "pending" && "bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]",
                      date.status === "error" && "bg-red-500/10 text-red-400"
                    )}
                  >
                    {date.status === "in_progress" && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current pulse-dot mr-1" />
                    )}
                    {date.status}
                  </div>
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {date.turn_count || date.messages?.length || 0} turns · {date.messages?.length || 0} messages
                </div>
              </motion.button>
            ))}
          </div>

          {/* Chat view */}
          <div className="lg:col-span-3">
            {selectedDate ? (
              <motion.div
                key={selectedDate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl overflow-hidden relative flex flex-col"
              >
                {/* Chat header */}
                <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg-card)]/50">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold ring-2 ring-[var(--color-bg-card)]">
                        {selectedDate.profile_a?.name?.charAt(0) || "A"}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-accent-cyan)] flex items-center justify-center text-white text-sm font-bold ring-2 ring-[var(--color-bg-card)]">
                        {selectedDate.profile_b?.name?.charAt(0) || "B"}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">
                        {selectedDate.profile_a?.name || "Person A"}{" "}
                        <span className="text-[var(--color-accent-pink)]">💘</span>{" "}
                        {selectedDate.profile_b?.name || "Person B"}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {selectedDate.status === "in_progress" ? (
                          <span className="flex items-center gap-1 text-[var(--color-accent-green)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] pulse-dot" />
                            Date in progress...
                          </span>
                        ) : selectedDate.status === "completed" ? (
                          <span className="text-[var(--color-accent-green)]">Date completed</span>
                        ) : (
                          "Waiting to start"
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedDate.status === "pending" && (
                    <button
                      onClick={() => triggerNextSimulation(selectedDate.id)}
                      disabled={isSimulating}
                      className="px-3 py-1.5 rounded-lg gradient-bg text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      Start This Date
                    </button>
                  )}
                </div>

                {/* Messages scroll container (100% manual scroll) */}
                <div
                  ref={chatContainerRef}
                  className="p-5 h-[580px] max-h-[70vh] overflow-y-auto space-y-4 relative"
                >
                  <AnimatePresence>
                    {selectedDate.messages && selectedDate.messages.length > 0 ? (
                      selectedDate.messages.map((msg, idx) => {
                        const isA = msg.role === "person_a";
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className={cn(
                              "flex gap-3",
                              !isA && "flex-row-reverse"
                            )}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md",
                                isA ? "gradient-bg" : "bg-[var(--color-accent-cyan)]"
                              )}
                            >
                              {msg.name?.charAt(0) || (isA ? "A" : "B")}
                            </div>
                            <div
                              className={cn(
                                "max-w-[78%] p-3.5 text-sm leading-relaxed rounded-2xl shadow-sm",
                                isA
                                  ? "chat-bubble-left bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                                  : "chat-bubble-right bg-[var(--color-accent-purple)]/15 border border-[var(--color-accent-purple)]/30 text-[var(--color-text-primary)]"
                              )}
                            >
                              <div
                                className="text-xs font-semibold mb-1"
                                style={{
                                  color: isA
                                    ? "var(--color-accent-pink)"
                                    : "var(--color-accent-cyan)",
                                }}
                              >
                                {msg.name}
                              </div>
                              {msg.content}
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-[var(--color-text-muted)] text-sm">
                        <MessageCircleHeart className="w-8 h-8 mb-2 opacity-40" />
                        Simulation waiting to start... Click &quot;Start This Date&quot; to begin dialogue.
                      </div>
                    )}
                  </AnimatePresence>

                  {selectedDate.status === "in_progress" && (
                    <div className="flex items-center gap-2 py-2">
                      <Loader2 className="w-4 h-4 text-[var(--color-accent-purple)] animate-spin" />
                      <span className="text-xs text-[var(--color-text-muted)]">
                        Agent is generating authentic response...
                      </span>
                    </div>
                  )}
                </div>

                {/* Date summary footer */}
                {selectedDate.status === "completed" && (
                  <div className="p-3.5 border-t border-[var(--color-border)] bg-[var(--color-accent-green)]/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-accent-green)] font-medium">
                      <Sparkles className="w-4 h-4" />
                      Date completed — {selectedDate.messages?.length || 0} messages exchanged
                    </div>
                    <Link
                      href="/rankings"
                      className="text-xs font-semibold text-[var(--color-accent-cyan)] hover:underline inline-flex items-center gap-1"
                    >
                      View Compatibility Score <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="glass-card rounded-2xl flex flex-col items-center justify-center py-24 text-center">
                <MessageCircleHeart className="w-12 h-12 text-[var(--color-text-muted)] mb-4" />
                <p className="text-[var(--color-text-secondary)]">
                  Select a date from the list to view the conversation
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigate to rankings */}
      {completedDates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold text-lg hover:scale-105 transition-transform glow-pink"
          >
            View Compatibility Rankings
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default function DatingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-purple)] animate-spin" />
        </div>
      }
    >
      <DatingContent />
    </Suspense>
  );
}
