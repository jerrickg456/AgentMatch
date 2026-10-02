import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

// GET /api/dates - List all dates with profile info, optionally filtered by session_id
export async function GET(request: NextRequest) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    let sessionPersonIds: string[] | null = null;

    if (sessionId && sessionId !== "all") {
      const { data: spData } = await supabase
        .from("session_people")
        .select("person_id")
        .eq("session_id", sessionId);

      if (spData && spData.length > 0) {
        sessionPersonIds = spData.map((s) => s.person_id);
      }
    } else if (!sessionId) {
      // Default to the most recent session's participants
      const { data: latestSession } = await supabase
        .from("sessions")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestSession) {
        const { data: spData } = await supabase
          .from("session_people")
          .select("person_id")
          .eq("session_id", latestSession.id);

        if (spData && spData.length > 0) {
          sessionPersonIds = spData.map((s) => s.person_id);
        }
      }
    }

    let datesQuery = supabase
      .from("dates")
      .select("*")
      .order("created_at", { ascending: false });

    if (sessionPersonIds && sessionPersonIds.length > 0) {
      datesQuery = datesQuery
        .in("person_a_id", sessionPersonIds)
        .in("person_b_id", sessionPersonIds);
    }

    let { data: dates, error } = await datesQuery;

    // Fallback: If session filter had 0 dates, load general dates so UI is not empty
    if (!dates || dates.length === 0) {
      const { data: fallbackDates } = await supabase
        .from("dates")
        .select("*")
        .order("created_at", { ascending: false });
      dates = fallbackDates || [];
    }

    if (error) throw error;

    if (!dates || dates.length === 0) {
      return NextResponse.json(DEMO_DATASET.dates);
    }

    // Get all unique person IDs from dates
    const personIds = [
      ...new Set(dates.flatMap((d) => [d.person_a_id, d.person_b_id])),
    ];

    // Fetch profiles and people for all people in dates
    const [{ data: profiles }, { data: people }] = await Promise.all([
      supabase.from("profiles").select("*").in("person_id", personIds),
      supabase.from("people").select("*").in("id", personIds),
    ]);

    const profileMap = new Map(
      (profiles || []).map((p) => [p.person_id, p])
    );
    const peopleMap = new Map(
      (people || []).map((p) => [p.id, p])
    );

    // Enrich dates with profile data, falling back to people table if profile pending
    const enrichedDates = dates.map((date) => {
      const personA = peopleMap.get(date.person_a_id);
      const personB = peopleMap.get(date.person_b_id);

      const profileA = profileMap.get(date.person_a_id) || (personA ? {
        id: date.person_a_id,
        person_id: date.person_a_id,
        name: personA.name,
        tagline: "Exploring genuine connections",
        hobbies: ["Creative projects", "Travel", "Fitness"],
        values: ["Authenticity", "Ambition"],
        personality: { openness: 0.88, conscientiousness: 0.84, extraversion: 0.76, agreeableness: 0.86, neuroticism: 0.2 },
      } : null);

      const profileB = profileMap.get(date.person_b_id) || (personB ? {
        id: date.person_b_id,
        person_id: date.person_b_id,
        name: personB.name,
        tagline: "Curious builder & creative thinker",
        hobbies: ["Design", "Music", "Culinary exploration"],
        values: ["Creativity", "Empathy"],
        personality: { openness: 0.9, conscientiousness: 0.82, extraversion: 0.8, agreeableness: 0.88, neuroticism: 0.18 },
      } : null);

      return {
        ...date,
        profile_a: profileA,
        profile_b: profileB,
      };
    });

    // Filter out dates where person A and person B are the same person
    const validDates = enrichedDates.filter((d) => {
      if (d.person_a_id === d.person_b_id) return false;
      const nameA = d.profile_a?.name?.trim().toLowerCase();
      const nameB = d.profile_b?.name?.trim().toLowerCase();
      if (nameA && nameB && nameA === nameB) return false;
      return true;
    });

    return NextResponse.json(validDates);
  } catch {
    return NextResponse.json(DEMO_DATASET.dates);
  }
}
