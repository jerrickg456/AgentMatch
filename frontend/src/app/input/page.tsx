"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Camera,
  Plus,
  Trash2,
  Play,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  Sparkles,
  Upload,
} from "lucide-react";
import { Linkedin, Instagram } from "@/components/icons";
import { cn } from "@/lib/utils";
import { REAL_PEOPLE_RAW } from "@/lib/demo-data";

interface PersonInput {
  id: string;
  name: string;
  linkedin_url: string;
  instagram_url: string;
  status: "idle" | "processing" | "done" | "error";
  error?: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Pre-built 25 real people with verified LinkedIn and public Instagram
const SAMPLE_PEOPLE: Omit<PersonInput, "id" | "status">[] = REAL_PEOPLE_RAW.map((p) => ({
  name: p.name,
  linkedin_url: p.linkedin_url,
  instagram_url: p.instagram_url,
}));

export default function InputPage() {
  const router = useRouter();
  const [people, setPeople] = useState<PersonInput[]>([
    { id: generateId(), name: "", linkedin_url: "", instagram_url: "", status: "idle" },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionName, setSessionName] = useState("Dating Session");

  const addPerson = () => {
    setPeople((prev) => [
      ...prev,
      { id: generateId(), name: "", linkedin_url: "", instagram_url: "", status: "idle" },
    ]);
  };

  const removePerson = (id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePerson = (id: string, field: keyof PersonInput, value: string) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const loadSamples = () => {
    const sampleEntries: PersonInput[] = SAMPLE_PEOPLE.map((s) => ({
      ...s,
      id: generateId(),
      status: "idle" as const,
    }));
    setPeople((prev) => [...prev.filter((p) => p.name || p.linkedin_url || p.instagram_url), ...sampleEntries]);
  };

  const validPeople = people.filter(
    (p) => p.name && (p.linkedin_url || p.instagram_url)
  );

  const handleStartSession = async () => {
    if (validPeople.length < 2) return;
    setIsProcessing(true);

    const createdPeopleIds: string[] = [];

    // Process each person sequentially
    for (const person of validPeople) {
      setPeople((prev) =>
        prev.map((p) =>
          p.id === person.id ? { ...p, status: "processing" } : p
        )
      );

      try {
        // Call the API to create the person and trigger scraping
        const res = await fetch("/api/people", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: person.name,
            linkedin_url: person.linkedin_url,
            instagram_url: person.instagram_url,
          }),
        });

        if (!res.ok) throw new Error("Failed to create person");
        const data = await res.json();
        if (data && data.id) {
          createdPeopleIds.push(data.id);
        }

        setPeople((prev) =>
          prev.map((p) =>
            p.id === person.id ? { ...p, status: "done" } : p
          )
        );
      } catch (err) {
        setPeople((prev) =>
          prev.map((p) =>
            p.id === person.id
              ? { ...p, status: "error", error: (err as Error).message }
              : p
          )
        );
      }
    }

    // After all people are added, start the dating session strictly for the added people
    let targetUrl = "/dating";
    try {
      const sessRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sessionName,
          person_ids: createdPeopleIds,
        }),
      });
      if (sessRes.ok) {
        const sessData = await sessRes.json();
        if (sessData && sessData.id) {
          targetUrl = `/dating?session_id=${sessData.id}`;
        }
      }
    } catch {
      // Session creation is non-blocking
    }

    setIsProcessing(false);

    // Smoothly route to dating console for this exact session
    setTimeout(() => {
      router.push(targetUrl);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--color-accent-cyan)]" />
          </div>
          <h1 className="text-3xl font-bold">Add People</h1>
        </div>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Add LinkedIn, public Instagram, or both for each person. You need at least 2 people to start dating.
        </p>
      </motion.div>

      {/* Session Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8"
      >
        <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
          Session Name
        </label>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/50 focus:border-[var(--color-accent-purple)] transition-all"
          placeholder="Give this dating session a name..."
        />
      </motion.div>

      {/* People List */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {people.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "glass-card rounded-2xl p-6 transition-all duration-300",
                person.status === "done" && "border-[var(--color-accent-green)]/30",
                person.status === "error" && "border-red-500/30",
                person.status === "processing" && "border-[var(--color-accent-purple)]/30"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Number badge */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] flex items-center justify-center text-sm font-medium text-[var(--color-text-muted)]">
                  {index + 1}
                </div>

                {/* Form fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) => updatePerson(person.id, "name", e.target.value)}
                      disabled={person.status !== "idle"}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)]/50 disabled:opacity-50 transition-all"
                      placeholder="Full name..."
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
                      <Linkedin className="w-3 h-3" />
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={person.linkedin_url}
                      onChange={(e) => updatePerson(person.id, "linkedin_url", e.target.value)}
                      disabled={person.status !== "idle"}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-cyan)]/50 disabled:opacity-50 transition-all"
                      placeholder="https://linkedin.com/in/... (or leave blank if IG)"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
                      <Instagram className="w-3 h-3" />
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={person.instagram_url}
                      onChange={(e) => updatePerson(person.id, "instagram_url", e.target.value)}
                      disabled={person.status !== "idle"}
                      className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-pink)]/50 disabled:opacity-50 transition-all"
                      placeholder="https://instagram.com/... (or leave blank if LI)"
                    />
                  </div>
                </div>

                {/* Status / Delete */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  {person.status === "processing" && (
                    <Loader2 className="w-5 h-5 text-[var(--color-accent-purple)] animate-spin" />
                  )}
                  {person.status === "done" && (
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-green)]" />
                  )}
                  {person.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                  {person.status === "idle" && people.length > 1 && (
                    <button
                      onClick={() => removePerson(person.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Error message */}
              {person.error && (
                <div className="mt-3 ml-12 text-sm text-red-400">
                  {person.error}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          onClick={addPerson}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-dashed border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)]/5 transition-all duration-300 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Another Person
        </button>

        <button
          onClick={loadSamples}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/5 transition-all duration-300 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          Load 25 Real People
        </button>

        <div className="flex-1" />

        {/* People count */}
        <div className="text-sm text-[var(--color-text-muted)]">
          {validPeople.length} valid {validPeople.length === 1 ? "person" : "people"}
          {validPeople.length < 2 && " (need at least 2)"}
        </div>

        <button
          onClick={handleStartSession}
          disabled={isProcessing || validPeople.length < 2}
          className={cn(
            "flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            validPeople.length >= 2
              ? "gradient-bg hover:scale-105 glow-pink"
              : "bg-[var(--color-bg-card)] text-[var(--color-text-muted)]"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Dating Session
            </>
          )}
        </button>
      </div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 glass-card rounded-2xl p-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-amber)]/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[var(--color-accent-amber)]" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <ol className="text-sm text-[var(--color-text-secondary)] space-y-2 list-decimal list-inside">
              <li>Enter each person&apos;s name, LinkedIn URL, and public Instagram URL</li>
              <li>Click &quot;Start Dating Session&quot; — AI scrapes both profiles for each person</li>
              <li>An AI agent analyzes the data and builds a dating persona</li>
              <li>Every agent dates every other agent in multi-turn conversations</li>
              <li>Agents score compatibility and generate ranked matches</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
