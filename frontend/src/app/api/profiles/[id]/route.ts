import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

// GET /api/profiles/[id] - Get a single profile by person_id
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("person_id", id)
      .single();

    if (!error && data) {
      return NextResponse.json(data);
    }
  } catch {
    // Continue to fallback
  }

  // Fallback to demo profile by person_id or id
  const demoProfile =
    DEMO_DATASET.profiles.find((p) => p.person_id === id || p.id === id) ||
    DEMO_DATASET.profiles[0];

  if (demoProfile) {
    return NextResponse.json(demoProfile);
  }

  return NextResponse.json({ error: "Profile not found" }, { status: 404 });
}
