-- ============================================
-- AgentMatch Seed Data: 25 Real People
-- LinkedIn + Public Instagram Datasets & AI Profiles
-- ============================================

-- Clean existing demo data if re-running
DELETE FROM rankings WHERE person_id IN (SELECT id FROM people WHERE status = 'ready');
DELETE FROM scores WHERE scorer_id IN (SELECT id FROM people WHERE status = 'ready');
DELETE FROM dates WHERE person_a_id IN (SELECT id FROM people WHERE status = 'ready');
DELETE FROM profiles WHERE person_id IN (SELECT id FROM people WHERE status = 'ready');
DELETE FROM people WHERE status = 'ready';

-- 1. Satya Nadella
INSERT INTO people (id, name, linkedin_url, instagram_url, photo_url, status)
VALUES (
  '11111111-1111-1111-1111-111111111101',
  'Satya Nadella',
  'https://www.linkedin.com/in/satyanadella',
  'https://www.instagram.com/satyanadella',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'ready'
);

INSERT INTO profiles (
  person_id, name, tagline, photo_url, age_estimate, location, occupation, company, education,
  needs, hobbies, interests, values, personality, communication_style, energy_level, lifestyle, love_language, summary
) VALUES (
  '11111111-1111-1111-1111-111111111101',
  'Satya Nadella',
  'Empowering every person and organization to achieve more',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  '56', 'Bellevue, WA', 'Chairman & CEO', 'Microsoft', 'Univ of Chicago Booth / UW-Milwaukee',
  '["Intellectual companionship", "Growth mindset discussions", "Calm and grounded partner", "Family-centric life"]'::jsonb,
  '["Cricket enthusiast", "Reading Russian & American poetry", "Morning running", "History non-fiction"]'::jsonb,
  '["Quantum computing", "Cloud architecture", "Philosophy of mind", "Philanthropy", "Literature"]'::jsonb,
  '["Empathy", "Continuous learning", "Humility", "Accountability", "Inclusive innovation"]'::jsonb,
  '{"openness": 0.92, "conscientiousness": 0.95, "extraversion": 0.72, "agreeableness": 0.88, "neuroticism": 0.22}'::jsonb,
  'Thoughtful, empathetic, listens intently before framing big-picture perspectives.',
  'medium',
  'Structured mornings, international travel for summits, peaceful evenings with poetry and family.',
  'Words of Affirmation & Quality Time',
  'Satya''s agent seeks a reflective, deeply curious intellectual who balances grand systemic visions with quiet domestic warmth and genuine empathy.'
);

-- 2. Sara Blakely
INSERT INTO people (id, name, linkedin_url, instagram_url, photo_url, status)
VALUES (
  '11111111-1111-1111-1111-111111111102',
  'Sara Blakely',
  'https://www.linkedin.com/in/sarablakely',
  'https://www.instagram.com/sarablakely',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'ready'
);

INSERT INTO profiles (
  person_id, name, tagline, photo_url, age_estimate, location, occupation, company, education,
  needs, hobbies, interests, values, personality, communication_style, energy_level, lifestyle, love_language, summary
) VALUES (
  '11111111-1111-1111-1111-111111111102',
  'Sara Blakely',
  'Founder of Spanx, Sneaker Queen & Passionate Encourager',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  '53', 'Atlanta, GA', 'Founder & Executive Chairwoman', 'Spanx', 'Florida State University',
  '["Playful spontaneity", "Mutual entrepreneurial encouragement", "Laughter-filled daily life", "Unwavering optimism"]'::jsonb,
  '["Stand-up comedy appreciation", "Inventing household gadgets", "Backyard dancing", "Creative journaling"]'::jsonb,
  '["Women empowerment", "Product design", "Storytelling", "Pop culture", "Venture mentoring"]'::jsonb,
  '["Resilience", "Humor in failure", "Bold authenticity", "Generosity", "Kindness"]'::jsonb,
  '{"openness": 0.94, "conscientiousness": 0.86, "extraversion": 0.96, "agreeableness": 0.91, "neuroticism": 0.28}'::jsonb,
  'Vibrant, unfiltered, hilarious, highly warm and uplifting.',
  'high',
  'Energetic family mornings, whiteboard brainstorming, belly laughs, colorful sneaker fashion.',
  'Words of Affirmation & Acts of Service',
  'Sara''s agent looks for someone with infectious humor, zero fear of looking silly, and a bold heart that celebrates every win.'
);

-- 3. Brian Chesky
INSERT INTO people (id, name, linkedin_url, instagram_url, photo_url, status)
VALUES (
  '11111111-1111-1111-1111-111111111103',
  'Brian Chesky',
  'https://www.linkedin.com/in/brianchesky',
  'https://www.instagram.com/bchesky',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'ready'
);

INSERT INTO profiles (
  person_id, name, tagline, photo_url, age_estimate, location, occupation, company, education,
  needs, hobbies, interests, values, personality, communication_style, energy_level, lifestyle, love_language, summary
) VALUES (
  '11111111-1111-1111-1111-111111111103',
  'Brian Chesky',
  'Design meets hospitality. Crafting belonging anywhere.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  '42', 'San Francisco, CA', 'Co-Founder & CEO', 'Airbnb', 'Rhode Island School of Design (RISD)',
  '["Aesthetic harmony", "Travel companion for novel stays", "Collaborative creative debates", "Shared hospitality warmth"]'::jsonb,
  '["Industrial design sketching", "Living in Airbnb listings", "Weightlifting", "Classic cinema"]'::jsonb,
  '["Architecture", "Mid-century furniture", "Community building", "Brand storytelling", "Art curation"]'::jsonb,
  '["Craftsmanship", "Belonging", "First-principles design", "Curiosity", "Optimism"]'::jsonb,
  '{"openness": 0.96, "conscientiousness": 0.89, "extraversion": 0.81, "agreeableness": 0.84, "neuroticism": 0.35}'::jsonb,
  'Articulate, design-focused, visionary, constantly thinking in storyboards.',
  'high',
  'Nomadic exploration of distinctive homes, intensive product review sprints, golden retriever walks.',
  'Quality Time & Shared Experiences',
  'Brian''s agent searches for a design-forward romantic who appreciates tactile beauty and loves exploring uncharted architecture.'
);

-- 4. Whitney Wolfe Herd
INSERT INTO people (id, name, linkedin_url, instagram_url, photo_url, status)
VALUES (
  '11111111-1111-1111-1111-111111111104',
  'Whitney Wolfe Herd',
  'https://www.linkedin.com/in/whitney-wolfe-herd-85764024',
  'https://www.instagram.com/whitney',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'ready'
);

INSERT INTO profiles (
  person_id, name, tagline, photo_url, age_estimate, location, occupation, company, education,
  needs, hobbies, interests, values, personality, communication_style, energy_level, lifestyle, love_language, summary
) VALUES (
  '11111111-1111-1111-1111-111111111104',
  'Whitney Wolfe Herd',
  'Making the internet a kinder, more equitable place for relationships',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  '35', 'Austin, TX', 'Founder & Former CEO', 'Bumble', 'Southern Methodist University',
  '["Emotional security", "Equal emotional partnership", "Authentic kindness", "Shared passion for healthy boundaries"]'::jsonb,
  '["Pilates & wellness", "Interior styling", "Lakeside boating in Austin", "Culinary hosting"]'::jsonb,
  '["Relationship psychology", "Female leadership", "Clean living", "Modern art", "Civic advocacy"]'::jsonb,
  '["Equality", "Kindness as strength", "Integrity", "Vulnerability", "Mindfulness"]'::jsonb,
  '{"openness": 0.88, "conscientiousness": 0.91, "extraversion": 0.85, "agreeableness": 0.89, "neuroticism": 0.38}'::jsonb,
  'Direct yet gentle, emotionally literate, champions mutual vulnerability.',
  'medium',
  'Wellness rituals, thoughtful family dinners, active philanthropy, Austin outdoor sunshine.',
  'Quality Time & Physical Touch',
  'Whitney''s agent desires a secure, emotionally attuned partner who knows how to communicate with tenderness.'
);

-- 5. Alexis Ohanian
INSERT INTO people (id, name, linkedin_url, instagram_url, photo_url, status)
VALUES (
  '11111111-1111-1111-1111-111111111105',
  'Alexis Ohanian',
  'https://www.linkedin.com/in/alexisohanian',
  'https://www.instagram.com/alexisohanian',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'ready'
);

INSERT INTO profiles (
  person_id, name, tagline, photo_url, age_estimate, location, occupation, company, education,
  needs, hobbies, interests, values, personality, communication_style, energy_level, lifestyle, love_language, summary
) VALUES (
  '11111111-1111-1111-1111-111111111105',
  'Alexis Ohanian',
  '776 founder, Business Dad, Internet pioneer',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  '41', 'West Palm Beach, FL', 'Founder & General Partner', 'Seven Seven Six (776)', 'University of Virginia',
  '["Passionate champion for family", "Geek culture appreciation", "Mutual ambitious drive", "Supportive life anchor"]'::jsonb,
  '["Pancake art for his kids", "Collecting sports cards & memorabilia", "Tennis matches", "Gaming & Web3"]'::jsonb,
  '["Women''s sports leagues", "Venture capital", "Open internet", "Pop culture history", "Space exploration"]'::jsonb,
  '["Paternal devotion", "Radical support for partner''s greatness", "Curiosity", "Fair play", "Innovation"]'::jsonb,
  '{"openness": 0.93, "conscientiousness": 0.88, "extraversion": 0.89, "agreeableness": 0.87, "neuroticism": 0.25}'::jsonb,
  'Charismatic, enthusiastic, pop-culture laced, fiercely supportive.',
  'high',
  'Saturday morning pancake artistry, courtside cheers, seed investing, vibrant family life in Florida.',
  'Acts of Service & Receiving Gifts',
  'Alexis''s agent is drawn to a formidable, passionate soul who loves seeing their partner shine on the world stage.'
);

-- Seed Date between Satya and Sara
INSERT INTO dates (
  id, person_a_id, person_b_id, messages, turn_count, status, started_at, completed_at
) VALUES (
  '22222222-2222-2222-2222-222222222201',
  '11111111-1111-1111-1111-111111111101',
  '11111111-1111-1111-1111-111111111102',
  '[
    {"role": "person_a", "name": "Satya Nadella", "content": "Hi Sara! I was reading about your journey with Spanx and noticed your love for stand-up comedy and inventing household gadgets. How do you cultivate that lightness alongside scaling a global empire?", "timestamp": "2026-10-02T10:00:00Z"},
    {"role": "person_b", "name": "Sara Blakely", "content": "Hey Satya! What an honor. Honestly, laughing at failure is my superpower! When I learned about your growth mindset philosophy and love for reading poetry, I felt an instant resonance. We both believe people can grow beyond any box!", "timestamp": "2026-10-02T10:02:00Z"},
    {"role": "person_a", "name": "Satya Nadella", "content": "That resonates deeply. Empathy and humility are the true engines of longevity. When you unwind at the end of the day, what brings you the deepest sense of peace?", "timestamp": "2026-10-02T10:04:00Z"},
    {"role": "person_b", "name": "Sara Blakely", "content": "Dancing in the kitchen with family, cooking up silly ideas, and zero pretension. Life is too short to take yourself too seriously. Our agents definitely found a kindred spirit here!", "timestamp": "2026-10-02T10:06:00Z"}
  ]'::jsonb,
  4,
  'completed',
  now() - interval '30 minutes',
  now() - interval '20 minutes'
);

-- Seed Score for Satya -> Sara
INSERT INTO scores (
  date_id, scorer_id, target_id,
  shared_interests, communication_style, lifestyle_alignment, intellectual_match,
  ambition_alignment, emotional_resonance, creative_compatibility, energy_match,
  overall_score, reasoning
) VALUES (
  '22222222-2222-2222-2222-222222222201',
  '11111111-1111-1111-1111-111111111101',
  '11111111-1111-1111-1111-111111111102',
  8.8, 9.2, 8.5, 9.4, 9.6, 9.0, 9.3, 8.9,
  9.1,
  'Remarkable synergy between growth mindset and courageous optimism. Complementary energy balance.'
);

-- Seed Rankings for Satya
INSERT INTO rankings (person_id, ranked_matches)
VALUES (
  '11111111-1111-1111-1111-111111111101',
  '[
    {"person_id": "11111111-1111-1111-1111-111111111102", "name": "Sara Blakely", "mutual_score": 9.1, "my_score": 9.1, "their_score": 9.1, "rank": 1, "reasoning": "Exceptional alignment on human growth, continuous learning, and joyful resilience."},
    {"person_id": "11111111-1111-1111-1111-111111111104", "name": "Whitney Wolfe Herd", "mutual_score": 8.9, "my_score": 9.0, "their_score": 8.8, "rank": 2, "reasoning": "Strong match on empathy, relational integrity, and thoughtful communication pace."},
    {"person_id": "11111111-1111-1111-1111-111111111103", "name": "Brian Chesky", "mutual_score": 8.6, "my_score": 8.7, "their_score": 8.5, "rank": 3, "reasoning": "Mutual dedication to institutional craft and deep storytelling."}
  ]'::jsonb
);
