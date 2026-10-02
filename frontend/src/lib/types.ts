// ============================================
// AgentMatch Type Definitions
// ============================================

export interface Person {
  id: string;
  name: string;
  linkedin_url: string;
  instagram_url: string;
  photo_url: string | null;
  status: "pending" | "scraping" | "scraped" | "analyzing" | "analyzed" | "ready" | "error";
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScrapedData {
  id: string;
  person_id: string;
  source: "linkedin" | "instagram";
  raw_data: Record<string, unknown>;
  scraped_at: string;
}

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface Profile {
  id: string;
  person_id: string;
  name: string;
  tagline: string | null;
  photo_url: string | null;
  age_estimate: string | null;
  location: string | null;
  occupation: string | null;
  company: string | null;
  education: string | null;
  needs: string[];
  hobbies: string[];
  interests: string[];
  values: string[];
  personality: PersonalityTraits;
  communication_style: string | null;
  energy_level: "high" | "medium" | "low" | null;
  lifestyle: string | null;
  love_language: string | null;
  summary: string | null;
  raw_analysis: Record<string, unknown> | null;
  analyzed_at: string;
  updated_at: string;
}

export interface DateMessage {
  role: "person_a" | "person_b";
  name: string;
  content: string;
  timestamp: string;
}

export interface DateRecord {
  id: string;
  person_a_id: string;
  person_b_id: string;
  messages: DateMessage[];
  turn_count: number;
  status: "pending" | "in_progress" | "completed" | "error";
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  // Joined data
  person_a?: Person;
  person_b?: Person;
  profile_a?: Profile;
  profile_b?: Profile;
}

export interface Score {
  id: string;
  date_id: string;
  scorer_id: string;
  target_id: string;
  shared_interests: number;
  communication_style: number;
  lifestyle_alignment: number;
  intellectual_match: number;
  ambition_alignment: number;
  emotional_resonance: number;
  creative_compatibility: number;
  energy_match: number;
  overall_score: number;
  reasoning: string | null;
  scored_at: string;
}

export interface RankedMatch {
  person_id: string;
  name: string;
  photo_url: string | null;
  mutual_score: number;
  my_score: number;
  their_score: number;
  rank: number;
  reasoning: string | null;
  tagline?: string | null;
  occupation?: string | null;
}

export interface Ranking {
  id: string;
  person_id: string;
  ranked_matches: RankedMatch[];
  generated_at: string;
}

export interface Session {
  id: string;
  name: string;
  total_people: number;
  total_dates: number;
  completed_dates: number;
  status: "setup" | "scraping" | "analyzing" | "dating" | "scoring" | "completed" | "error";
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

// Compatibility dimension labels
export const COMPATIBILITY_DIMENSIONS = [
  { key: "shared_interests", label: "Shared Interests", emoji: "🎯", weight: 0.15 },
  { key: "communication_style", label: "Communication", emoji: "💬", weight: 0.15 },
  { key: "lifestyle_alignment", label: "Lifestyle", emoji: "🌍", weight: 0.15 },
  { key: "intellectual_match", label: "Intellectual", emoji: "🎓", weight: 0.10 },
  { key: "ambition_alignment", label: "Ambition", emoji: "💼", weight: 0.10 },
  { key: "emotional_resonance", label: "Emotional", emoji: "❤️", weight: 0.15 },
  { key: "creative_compatibility", label: "Creative", emoji: "🎨", weight: 0.10 },
  { key: "energy_match", label: "Energy", emoji: "⚡", weight: 0.10 },
] as const;

export type CompatibilityDimension = typeof COMPATIBILITY_DIMENSIONS[number]["key"];
