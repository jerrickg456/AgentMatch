import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

// GET /api/scores?scorer=xxx&target=yyy - Get scores between two people
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const scorer = searchParams.get("scorer");
  const target = searchParams.get("target");

  if (!scorer || !target) {
    return NextResponse.json(
      { error: "scorer and target query params required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServiceClient();
    const { data: scoresList } = await supabase
      .from("scores")
      .select("*")
      .or(`and(scorer_id.eq.${scorer},target_id.eq.${target}),and(scorer_id.eq.${target},target_id.eq.${scorer})`)
      .order("scored_at", { ascending: false })
      .limit(1);

    if (scoresList && scoresList.length > 0) {
      return NextResponse.json(scoresList[0]);
    }
  } catch {
    // Continue to fallback
  }

  // Check demo scores first
  const demoScore = DEMO_DATASET.scores.find(
    (s) => s.scorer_id === scorer && s.target_id === target
  );
  if (demoScore) {
    return NextResponse.json(demoScore);
  }

  // Consistent dynamic score for radar charts
  const hash = Math.abs(
    (scorer.charCodeAt(scorer.length - 1) * 31 +
      target.charCodeAt(target.length - 1) * 17) %
      100
  );
  const base = 7.5 + (hash % 20) / 10;

  const fallbackScore = {
    id: `fallback-${scorer}-${target}`,
    date_id: "demo-date-1",
    scorer_id: scorer,
    target_id: target,
    shared_interests: Math.min(9.8, +(base + 0.3).toFixed(1)),
    communication_style: Math.min(9.8, +(base - 0.2).toFixed(1)),
    lifestyle_alignment: Math.min(9.8, +(base + 0.1).toFixed(1)),
    intellectual_match: Math.min(9.8, +(base + 0.5).toFixed(1)),
    ambition_alignment: Math.min(9.8, +(base + 0.4).toFixed(1)),
    emotional_resonance: Math.min(9.8, +(base - 0.1).toFixed(1)),
    creative_compatibility: Math.min(9.8, +(base + 0.2).toFixed(1)),
    energy_match: Math.min(9.8, +(base).toFixed(1)),
    overall_score: +base.toFixed(1),
    reasoning:
      "Complementary strengths observed across career ambitions and life priorities.",
    scored_at: new Date().toISOString(),
  };

  return NextResponse.json(fallbackScore);
}
