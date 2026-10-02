import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// POST /api/sessions - Create a new dating session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, person_ids } = body;

    const supabase = createServiceClient();

    let people: any[] = [];
    if (Array.isArray(person_ids) && person_ids.length >= 2) {
      const uniqueIds = Array.from(new Set(person_ids));
      const { data } = await supabase
        .from("people")
        .select("id")
        .in("id", uniqueIds);
      people = data || [];
    } else {
      // Only pair the 2 most recent people by default, not the entire database
      const { data } = await supabase
        .from("people")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(2);
      people = data || [];
    }

    if (!people || people.length < 2) {
      return NextResponse.json({ error: "At least 2 people are required" }, { status: 400 });
    }

    // Calculate total dates (N choose 2)
    const totalDates = (people.length * (people.length - 1)) / 2;

    // Create session
    const { data: session, error } = await supabase
      .from("sessions")
      .insert({
        name: name || "Dating Session",
        total_people: people.length,
        total_dates: totalDates,
        status: "dating",
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Link people to session
    const sessionPeople = people.map((p) => ({
      session_id: session.id,
      person_id: p.id,
    }));

    await supabase.from("session_people").insert(sessionPeople);

    // Generate all unique pairs and create date records
    const dateRecords = [];
    for (let i = 0; i < people.length; i++) {
      for (let j = i + 1; j < people.length; j++) {
        if (people[i].id !== people[j].id) {
          dateRecords.push({
            person_a_id: people[i].id,
            person_b_id: people[j].id,
            status: "pending",
          });
        }
      }
    }

    // Upsert date records in batches
    const batchSize = 50;
    for (let i = 0; i < dateRecords.length; i += batchSize) {
      const batch = dateRecords.slice(i, i + batchSize);
      await supabase.from("dates").upsert(batch, { onConflict: "person_a_id,person_b_id" });
    }

    // Auto-trigger simulation strictly for the dates created in THIS session
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    fetch(`${appUrl}/api/dates/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: session.id }),
    }).catch(() => null);

    return NextResponse.json(session, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

// GET /api/sessions - List sessions
export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
