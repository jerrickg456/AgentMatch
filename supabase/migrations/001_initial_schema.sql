-- AgentMatch Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLE: people
-- Core table storing each person and their links
-- ============================================
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  instagram_url TEXT NOT NULL,
  photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scraping', 'scraped', 'analyzing', 'analyzed', 'ready', 'error')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: scraped_data
-- Raw data from LinkedIn and Instagram
-- ============================================
CREATE TABLE scraped_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK (source IN ('linkedin', 'instagram')),
  raw_data JSONB NOT NULL,
  scraped_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_scraped_data_person ON scraped_data(person_id);
CREATE INDEX idx_scraped_data_source ON scraped_data(source);

-- ============================================
-- TABLE: profiles
-- AI-generated dating profiles
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  photo_url TEXT,
  age_estimate TEXT,
  location TEXT,
  occupation TEXT,
  company TEXT,
  education TEXT,

  -- Core dating profile fields
  needs JSONB DEFAULT '[]'::jsonb,
  hobbies JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  values JSONB DEFAULT '[]'::jsonb,

  -- Personality analysis
  personality JSONB DEFAULT '{}'::jsonb,
  -- Expected: { openness, conscientiousness, extraversion, agreeableness, neuroticism } each 0-1

  -- Behavioral traits
  communication_style TEXT,
  energy_level TEXT CHECK (energy_level IN ('high', 'medium', 'low')),
  lifestyle TEXT,
  love_language TEXT,

  -- Summary
  summary TEXT,
  raw_analysis JSONB,

  analyzed_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_profiles_person ON profiles(person_id);

-- ============================================
-- TABLE: dates
-- Dating conversations between agent pairs
-- ============================================
CREATE TABLE dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_a_id UUID REFERENCES people(id) ON DELETE CASCADE,
  person_b_id UUID REFERENCES people(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  -- Each message: { role: "person_a" | "person_b", name: string, content: string, timestamp: string }
  turn_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'error')),
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Prevent duplicate dates between same pair
  CONSTRAINT unique_date_pair UNIQUE (person_a_id, person_b_id)
);

CREATE INDEX idx_dates_status ON dates(status);
CREATE INDEX idx_dates_person_a ON dates(person_a_id);
CREATE INDEX idx_dates_person_b ON dates(person_b_id);

-- ============================================
-- TABLE: scores
-- Compatibility scores from each date
-- ============================================
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date_id UUID REFERENCES dates(id) ON DELETE CASCADE,
  scorer_id UUID REFERENCES people(id) ON DELETE CASCADE,
  target_id UUID REFERENCES people(id) ON DELETE CASCADE,

  -- 8 compatibility dimensions (0.0 - 10.0)
  shared_interests FLOAT DEFAULT 0,
  communication_style FLOAT DEFAULT 0,
  lifestyle_alignment FLOAT DEFAULT 0,
  intellectual_match FLOAT DEFAULT 0,
  ambition_alignment FLOAT DEFAULT 0,
  emotional_resonance FLOAT DEFAULT 0,
  creative_compatibility FLOAT DEFAULT 0,
  energy_match FLOAT DEFAULT 0,

  -- Weighted overall
  overall_score FLOAT DEFAULT 0,
  reasoning TEXT,

  scored_at TIMESTAMPTZ DEFAULT now(),

  -- One score per person per date
  CONSTRAINT unique_score_per_date UNIQUE (date_id, scorer_id)
);

CREATE INDEX idx_scores_scorer ON scores(scorer_id);
CREATE INDEX idx_scores_target ON scores(target_id);
CREATE INDEX idx_scores_date ON scores(date_id);

-- ============================================
-- TABLE: rankings
-- Aggregated rankings per person
-- ============================================
CREATE TABLE rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(id) ON DELETE CASCADE UNIQUE,
  ranked_matches JSONB DEFAULT '[]'::jsonb,
  -- Each match: { person_id, name, photo_url, mutual_score, my_score, their_score, rank, reasoning }
  generated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_rankings_person ON rankings(person_id);

-- ============================================
-- TABLE: sessions
-- Track dating simulation sessions
-- ============================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT DEFAULT 'Dating Session',
  total_people INTEGER DEFAULT 0,
  total_dates INTEGER DEFAULT 0,
  completed_dates INTEGER DEFAULT 0,
  status TEXT DEFAULT 'setup' CHECK (status IN ('setup', 'scraping', 'analyzing', 'dating', 'scoring', 'completed', 'error')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Link people to sessions
CREATE TABLE session_people (
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  person_id UUID REFERENCES people(id) ON DELETE CASCADE,
  PRIMARY KEY (session_id, person_id)
);

-- ============================================
-- FUNCTION: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_people_updated
  BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (public read for demo)
-- ============================================
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_data ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access (for demo site with publishable key)
CREATE POLICY "Public full access" ON people FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON dates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON rankings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON session_people FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access" ON scraped_data FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Enable Realtime for live dating view
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE dates;
ALTER PUBLICATION supabase_realtime ADD TABLE sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE scores;
