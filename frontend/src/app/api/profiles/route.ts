import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { DEMO_DATASET } from "@/lib/demo-data";

export const dynamic = "force-dynamic";

// GET /api/profiles - List all profiles
export async function GET() {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("analyzed_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json(data);
    }
    // Fallback to rich pre-built profiles
    return NextResponse.json(DEMO_DATASET.profiles);
  } catch {
    return NextResponse.json(DEMO_DATASET.profiles);
  }
}
