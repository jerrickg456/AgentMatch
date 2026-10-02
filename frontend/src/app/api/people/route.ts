import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";
import { scrapePerson } from "@/lib/scraper";

export const dynamic = "force-dynamic";

// GET /api/people - List all people
export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("people")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
    return NextResponse.json(DEMO_DATASET.people);
  } catch {
    return NextResponse.json(DEMO_DATASET.people);
  }
}

// POST /api/people - Create a new person and trigger scraping
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, linkedin_url, instagram_url } = body;

    // Require name and at least ONE link (LinkedIn or Instagram)
    if (!name || (!linkedin_url && !instagram_url)) {
      return NextResponse.json(
        { error: "Name and at least one profile link (LinkedIn or Instagram) are required" },
        { status: 400 }
      );
    }

    // 1. Scrape real profile data via Apify (handles LinkedIn-only, Instagram-only, or both)
    const scraped = await scrapePerson(linkedin_url, instagram_url);
    const photoUrl = scraped?.photo_url || null;
    const realName = scraped?.full_name || name;

    const supabase = createServiceClient();
    let person: any = null;

    try {
      const { data, error } = await supabase
        .from("people")
        .insert({
          name: realName,
          linkedin_url: linkedin_url || "",
          instagram_url: instagram_url || "",
          photo_url: photoUrl,
          status: "ready",
        })
        .select()
        .single();

      if (!error && data) {
        person = data;
      }
    } catch {
      // Supabase is offline or not configured
    }

    if (!person) {
      // Fallback local person object for demo/offline resilience
      person = {
        id: `person-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name,
        linkedin_url,
        instagram_url,
        photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        status: "ready",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // Ensure baseline profile exists in profiles table
    try {
      await supabase.from("profiles").upsert(
        {
          person_id: person.id,
          name: person.name,
          tagline: `Tech innovator & creative explorer | ${person.name}`,
          photo_url: person.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          age_estimate: "28",
          location: "San Francisco, CA",
          occupation: "Technologist & Creator",
          company: "Independent Ventures",
          education: "University",
          needs: ["Intellectual companionship", "Authentic emotional presence", "Mutual creative drive", "Healthy life balance"],
          hobbies: ["Morning running", "Photography", "Specialty coffee brewing", "Reading non-fiction"],
          interests: ["Artificial intelligence", "Architecture", "Design", "Global travel"],
          values: ["Integrity", "Empathy", "High agency", "Continuous growth"],
          personality: { openness: 0.9, conscientiousness: 0.85, extraversion: 0.78, agreeableness: 0.86, neuroticism: 0.2 },
          communication_style: "Warm, articulate, deeply curious, active listener.",
          energy_level: "high",
          lifestyle: "Dynamic, curious, passionate about building and exploring",
          love_language: "Quality Time & Words of Affirmation",
          summary: `${person.name}'s agent seeks a deeply curious, emotionally grounded partner who balances ambition with warmth and spontaneous adventure.`,
        },
        { onConflict: "person_id" }
      );
    } catch {
      // Non-blocking
    }

    // Trigger n8n workflow for deep AI profiling and update Supabase
    const n8nBaseUrl = process.env.N8N_WEBHOOK_BASE_URL;
    if (n8nBaseUrl) {
      fetch(`${n8nBaseUrl}/webhook/agentmatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyze_profile",
          person_id: person.id,
          name: person.name,
          linkedin_url: person.linkedin_url,
          instagram_url: person.instagram_url,
          headline: scraped?.headline || "",
          about: scraped?.about || "",
          location: scraped?.location || "",
          skills: scraped?.skills || [],
          education: scraped?.education || [],
          experiences: scraped?.experiences || [],
          raw_data: scraped?.raw || {},
        }),
      })
        .then(async (res) => {
          if (!res.ok) return;
          const data = await res.json();
          if (data && data.profile) {
            const p = data.profile;
            await supabase.from("profiles").update({
              tagline: p.tagline,
              age_estimate: p.age_estimate,
              location: p.location,
              occupation: p.occupation,
              company: p.company,
              education: p.education,
              needs: p.needs,
              hobbies: p.hobbies,
              interests: p.interests,
              values: p.values,
              personality: p.personality,
              communication_style: p.communication_style,
              energy_level: p.energy_level,
              lifestyle: p.lifestyle,
              love_language: p.love_language,
              summary: p.summary,
            }).eq("person_id", person.id);
          }
        })
        .catch(() => null);
    }

    return NextResponse.json(person, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
