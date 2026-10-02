import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";
import type { Ranking, RankedMatch } from "@/lib/types";

export const dynamic = "force-dynamic";

// GET /api/rankings - List all rankings grouped by person
export async function GET() {
  try {
    const supabase = createServiceClient();

    // 1. Fetch scores, profiles, and people
    const [{ data: scores }, { data: profiles }, { data: people }] = await Promise.all([
      supabase.from("scores").select("*"),
      supabase.from("profiles").select("*"),
      supabase.from("people").select("*"),
    ]);

    if (!scores || scores.length === 0) {
      return NextResponse.json(DEMO_DATASET.rankings);
    }

    const profileMap = new Map((profiles || []).map((p) => [p.person_id, p]));
    const peopleMap = new Map((people || []).map((p) => [p.id, p]));

    // 2. Group scores by person
    const personMatchesMap = new Map<string, Array<{ targetId: string; score: number; reasoning: string }>>();

    for (const s of scores) {
      if (!personMatchesMap.has(s.scorer_id)) {
        personMatchesMap.set(s.scorer_id, []);
      }
      personMatchesMap.get(s.scorer_id)!.push({
        targetId: s.target_id,
        score: Number(s.overall_score) || 8.5,
        reasoning: s.reasoning || "High conversational synergy.",
      });

      // Symmetrical match score
      if (!personMatchesMap.has(s.target_id)) {
        personMatchesMap.set(s.target_id, []);
      }
      personMatchesMap.get(s.target_id)!.push({
        targetId: s.scorer_id,
        score: Number(s.overall_score) || 8.5,
        reasoning: s.reasoning || "Mutual appreciation and aligned lifestyle.",
      });
    }

    // 3. Build Ranking list for each person
    const rankings: Ranking[] = [];

    for (const [personId, matches] of personMatchesMap.entries()) {
      // Sort matches descending by score
      matches.sort((a, b) => b.score - a.score);

      const rankedMatches: RankedMatch[] = matches.map((m, idx) => {
        const targetProfile = profileMap.get(m.targetId);
        const targetPerson = peopleMap.get(m.targetId);
        const name = targetProfile?.name || targetPerson?.name || "Matched Agent";

        return {
          person_id: m.targetId,
          name: name,
          photo_url: targetProfile?.photo_url || targetPerson?.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          mutual_score: m.score,
          my_score: m.score,
          their_score: m.score,
          rank: idx + 1,
          reasoning: m.reasoning,
          tagline: targetProfile?.tagline || "Creative builder & explorer",
          occupation: targetProfile?.occupation || "Creator",
        };
      });

      rankings.push({
        id: `rank-${personId}`,
        person_id: personId,
        ranked_matches: rankedMatches,
        generated_at: new Date().toISOString(),
      });
    }

    if (rankings.length > 0) {
      return NextResponse.json(rankings);
    }

    return NextResponse.json(DEMO_DATASET.rankings);
  } catch {
    return NextResponse.json(DEMO_DATASET.rankings);
  }
}
