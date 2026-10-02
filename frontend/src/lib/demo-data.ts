import type { Person, Profile, DateRecord, Score, Ranking, RankedMatch } from "./types";

export interface DemoPersonSeed {
  name: string;
  linkedin_url: string;
  instagram_url: string;
  tagline: string;
  occupation: string;
  company: string;
  location: string;
  education: string;
  age_estimate: string;
  photo_url: string;
  needs: string[];
  hobbies: string[];
  interests: string[];
  values: string[];
  personality: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  communication_style: string;
  energy_level: "high" | "medium" | "low";
  lifestyle: string;
  love_language: string;
  summary: string;
}

export const REAL_PEOPLE_RAW: DemoPersonSeed[] = [
  {
    name: "Satya Nadella",
    linkedin_url: "https://www.linkedin.com/in/satyanadella",
    instagram_url: "https://www.instagram.com/satyanadella",
    tagline: "Empowering every person and organization to achieve more",
    occupation: "Chairman & CEO",
    company: "Microsoft",
    location: "Bellevue, WA",
    education: "University of Chicago Booth / University of Wisconsin-Milwaukee",
    age_estimate: "56",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    needs: ["Intellectual companionship", "Growth mindset discussions", "Calm and grounded partner", "Family-centric life"],
    hobbies: ["Cricket enthusiast", "Reading Russian & American poetry", "Morning running", "History non-fiction"],
    interests: ["Quantum computing", "Cloud architecture", "Philosophy of mind", "Philanthropy", "Literature"],
    values: ["Empathy", "Continuous learning", "Humility", "Accountability", "Inclusive innovation"],
    personality: { openness: 0.92, conscientiousness: 0.95, extraversion: 0.72, agreeableness: 0.88, neuroticism: 0.22 },
    communication_style: "Thoughtful, empathetic, listens intently before framing big-picture perspectives.",
    energy_level: "medium",
    lifestyle: "Structured mornings, international travel for summits, peaceful evenings with poetry and family.",
    love_language: "Words of Affirmation & Quality Time",
    summary: "Satya's agent seeks a reflective, deeply curious intellectual who balances grand systemic visions with quiet domestic warmth and genuine empathy."
  },
  {
    name: "Sara Blakely",
    linkedin_url: "https://www.linkedin.com/in/sarablakely",
    instagram_url: "https://www.instagram.com/sarablakely",
    tagline: "Founder of Spanx, Sneaker Queen & Passionate Encourager",
    occupation: "Founder & Executive Chairwoman",
    company: "Spanx",
    location: "Atlanta, GA",
    education: "Florida State University",
    age_estimate: "53",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    needs: ["Playful spontaneity", "Mutual entrepreneurial encouragement", "Laughter-filled daily life", "Unwavering optimism"],
    hobbies: ["Stand-up comedy appreciation", "Inventing household gadgets", "Backyard dancing", "Creative journaling"],
    interests: ["Women empowerment", "Product design", "Storytelling", "Pop culture", "Venture mentoring"],
    values: ["Resilience", "Humor in failure", "Bold authenticity", "Generosity", "Kindness"],
    personality: { openness: 0.94, conscientiousness: 0.86, extraversion: 0.96, agreeableness: 0.91, neuroticism: 0.28 },
    communication_style: "Vibrant, unfiltered, hilarious, highly warm and uplifting.",
    energy_level: "high",
    lifestyle: "Energetic family mornings, whiteboard brainstorming, belly laughs, colorful sneaker fashion.",
    love_language: "Words of Affirmation & Acts of Service",
    summary: "Sara's agent looks for someone with infectious humor, zero fear of looking silly, and a bold heart that celebrates every small and big win."
  },
  {
    name: "Brian Chesky",
    linkedin_url: "https://www.linkedin.com/in/brianchesky",
    instagram_url: "https://www.instagram.com/bchesky",
    tagline: "Design meets hospitality. Crafting belonging anywhere.",
    occupation: "Co-Founder & CEO",
    company: "Airbnb",
    location: "San Francisco, CA",
    education: "Rhode Island School of Design (RISD)",
    age_estimate: "42",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    needs: ["Aesthetic harmony", "Travel companion for novel stays", "Collaborative creative debates", "Shared hospitality warmth"],
    hobbies: ["Industrial design sketching", "Living in Airbnb listings", "Weightlifting", "Classic cinema"],
    interests: ["Architecture", "Mid-century furniture", "Community building", "Brand storytelling", "Art curation"],
    values: ["Craftsmanship", "Belonging", "First-principles design", "Curiosity", "Optimism"],
    personality: { openness: 0.96, conscientiousness: 0.89, extraversion: 0.81, agreeableness: 0.84, neuroticism: 0.35 },
    communication_style: "Articulate, design-focused, visionary, constantly thinking in storyboards.",
    energy_level: "high",
    lifestyle: "Nomadic exploration of distinctive homes, intensive product review sprints, golden retriever walks.",
    love_language: "Quality Time & Shared Experiences",
    summary: "Brian's agent searches for a design-forward romantic who appreciates tactile beauty, loves exploring uncharted architecture, and values deep human hospitality."
  },
  {
    name: "Whitney Wolfe Herd",
    linkedin_url: "https://www.linkedin.com/in/whitney-wolfe-herd-85764024",
    instagram_url: "https://www.instagram.com/whitney",
    tagline: "Making the internet a kinder, more equitable place for relationships",
    occupation: "Founder & Former CEO",
    company: "Bumble",
    location: "Austin, TX",
    education: "Southern Methodist University (SMU)",
    age_estimate: "35",
    photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    needs: ["Emotional security", "Equal emotional partnership", "Authentic kindness", "Shared passion for healthy boundaries"],
    hobbies: ["Pilates & wellness", "Interior styling", "Lakeside boating in Austin", "Culinary hosting"],
    interests: ["Relationship psychology", "Female leadership", "Clean living", "Modern art", "Civic advocacy"],
    values: ["Equality", "Kindness as strength", "Integrity", "Vulnerability", "Mindfulness"],
    personality: { openness: 0.88, conscientiousness: 0.91, extraversion: 0.85, agreeableness: 0.89, neuroticism: 0.38 },
    communication_style: "Direct yet gentle, emotionally literate, champions mutual vulnerability.",
    energy_level: "medium",
    lifestyle: "Wellness rituals, thoughtful family dinners, active philanthropy, Austin outdoor sunshine.",
    love_language: "Quality Time & Physical Touch",
    summary: "Whitney's agent desires a secure, emotionally attuned partner who knows how to communicate with tenderness and matches her commitment to mutual empowerment."
  },
  {
    name: "Alexis Ohanian",
    linkedin_url: "https://www.linkedin.com/in/alexisohanian",
    instagram_url: "https://www.instagram.com/alexisohanian",
    tagline: "776 founder, Business Dad, Internet pioneer",
    occupation: "Founder & General Partner",
    company: "Seven Seven Six (776)",
    location: "West Palm Beach, FL",
    education: "University of Virginia",
    age_estimate: "41",
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    needs: ["Passionate champion for family", "Geek culture appreciation", "Mutual ambitious drive", "Supportive life anchor"],
    hobbies: ["Pancake art for his kids", "Collecting sports cards & memorabilia", "Tennis matches", "Gaming & Web3"],
    interests: ["Women's sports leagues", "Venture capital", "Open internet", "Pop culture history", "Space exploration"],
    values: ["Paternal devotion", "Radical support for partner's greatness", "Curiosity", "Fair play", "Innovation"],
    personality: { openness: 0.93, conscientiousness: 0.88, extraversion: 0.89, agreeableness: 0.87, neuroticism: 0.25 },
    communication_style: "Charismatic, enthusiastic, pop-culture laced, fiercely supportive.",
    energy_level: "high",
    lifestyle: "Saturday morning pancake artistry, courtside cheers, seed investing, vibrant family life in Florida.",
    love_language: "Acts of Service & Receiving Gifts",
    summary: "Alexis's agent is drawn to a formidable, passionate soul who loves seeing their partner shine on the world stage while enjoying cozy pancake mornings."
  },
  {
    name: "Melanie Perkins",
    linkedin_url: "https://www.linkedin.com/in/melanieperkins",
    instagram_url: "https://www.instagram.com/melaniecanva",
    tagline: "Empowering the world to design and do good",
    occupation: "Co-Founder & CEO",
    company: "Canva",
    location: "Sydney, Australia",
    education: "University of Western Australia",
    age_estimate: "37",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    needs: ["Audacious goal partner", "Deep ethical compass", "Kitesurfing adventure buddy", "Down-to-earth simplicity"],
    hobbies: ["Kitesurfing along Sydney beaches", "Scrabble marathons", "Landscape sketching", "Backpacking remote trails"],
    interests: ["Democratizing creativity", "Global wealth redistribution", "Educational equity", "Visual literacy", "Wildlife conservation"],
    values: ["Crazy big goals", "Make the world a better place", "Humility", "Team spirit", "Optimism"],
    personality: { openness: 0.95, conscientiousness: 0.94, extraversion: 0.78, agreeableness: 0.92, neuroticism: 0.24 },
    communication_style: "Warm, inspirational, purpose-driven, visionary without arrogance.",
    energy_level: "high",
    lifestyle: "Early ocean breezes, kitesurfing sessions, relentless product focus, barefoot home dinners.",
    love_language: "Quality Time & Acts of Service",
    summary: "Melanie's agent seeks an adventurous, socially conscious partner who dreams on a planetary scale while treasuring quiet beach walks and heartfelt board games."
  },
  {
    name: "Reid Hoffman",
    linkedin_url: "https://www.linkedin.com/in/reidhoffman",
    instagram_url: "https://www.instagram.com/reidhoffman",
    tagline: "Philosopher-entrepreneur. Scale and humanity in the AI era.",
    occupation: "Partner & Co-Founder",
    company: "Greylock / LinkedIn",
    location: "Palo Alto, CA",
    education: "Stanford University / Oxford University (Philosophy)",
    age_estimate: "57",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    needs: ["Deep philosophical dialogues", "Strategic board-gaming partner", "Intellectual sparring", "Mutual moral clarity"],
    hobbies: ["Settlers of Catan & complex board games", "Philosophy symposiums", "Writing speculative essays", "Reading sci-fi"],
    interests: ["Artificial general intelligence", "Network effects", "Aristotelian ethics", "Public policy", "Cognitive psychology"],
    values: ["Truth seeking", "Friendship as a sacred alliance", "Long-term compounding", "Generosity", "Wisdom"],
    personality: { openness: 0.97, conscientiousness: 0.92, extraversion: 0.69, agreeableness: 0.89, neuroticism: 0.18 },
    communication_style: "Methodical, deeply philosophical, analyzes trade-offs with gentle humor.",
    energy_level: "medium",
    lifestyle: "Salon dinners with polymaths, strategy game nights, quiet study filled with rare books.",
    love_language: "Words of Affirmation & Quality Time",
    summary: "Reid's agent seeks a brilliant conversationalist who ponders ethics, consciousness, and the future over tea, books, and spirited strategy games."
  },
  {
    name: "Arianna Huffington",
    linkedin_url: "https://www.linkedin.com/in/ariannahuffington",
    instagram_url: "https://www.instagram.com/ariannahuff",
    tagline: "Ending the stress and burnout epidemic through Thrive Global",
    occupation: "Founder & CEO",
    company: "Thrive Global",
    location: "New York, NY",
    education: "Cambridge University (Girton College)",
    age_estimate: "73",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    needs: ["Deep conversational elegance", "Commitment to restorative rest", "Shared appreciation of Greek wisdom", "Cultural sophistication"],
    hobbies: ["Meditative morning walks in Central Park", "Reading classical literature", "Hostess of salon dinners", "Listening to opera"],
    interests: ["Circadian health", "Sleep science", "Ancient Greek philosophy", "Mindful leadership", "Poetry"],
    values: ["Well-being as true success", "Presence", "Connection", "Courage", "Grace"],
    personality: { openness: 0.94, conscientiousness: 0.90, extraversion: 0.88, agreeableness: 0.90, neuroticism: 0.20 },
    communication_style: "Lyrical, charismatic, perceptive, radiates European poise and modern mindfulness.",
    energy_level: "medium",
    lifestyle: "Strict digital detox evenings, 8 hours of restorative sleep, stimulating breakfasts with writers.",
    love_language: "Quality Time & Words of Affirmation",
    summary: "Arianna's agent seeks a cultured, reflective partner who understands that slowing down is the true height of elegance, power, and connection."
  },
  {
    name: "Tim Ferriss",
    linkedin_url: "https://www.linkedin.com/in/timferriss",
    instagram_url: "https://www.instagram.com/timferriss",
    tagline: "Author, human guinea pig, host of The Tim Ferriss Show",
    occupation: "Author & Investor",
    company: "Tim Ferriss Publishing",
    location: "Austin, TX",
    education: "Princeton University",
    age_estimate: "47",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    needs: ["Solitude-respecting intimacy", "Shared love of stoicism and nature", "Curiosity about self-mastery", "Authentic honesty"],
    hobbies: ["Japanese archery (Kyudo)", "Gongfu tea ceremonies", "Wilderness foraging & hiking", "Cold plunges & saunas"],
    interests: ["Psychedelic science", "Language learning", "Stoic philosophy", "Dog psychology", "Micro-distilling"],
    values: ["Truth over comfort", "Radical curiosity", "Mindfulness", "Simplicity", "Sovereignty"],
    personality: { openness: 0.96, conscientiousness: 0.91, extraversion: 0.58, agreeableness: 0.81, neuroticism: 0.39 },
    communication_style: "Inquisitive, analytical, candid, asks the second and third order questions.",
    energy_level: "medium",
    lifestyle: "Quiet morning tea rituals, dog walks with Molly, deep research blocks, minimalist spaces.",
    love_language: "Quality Time & Physical Touch",
    summary: "Tim's agent looks for a grounded, introspective companion who loves long silent hikes, deep tea sessions, and honest conversations about life's complexities."
  },
  {
    name: "Gary Vaynerchuk",
    linkedin_url: "https://www.linkedin.com/in/garyvaynerchuk",
    instagram_url: "https://www.instagram.com/garyvee",
    tagline: "Empathy, hustle, patience, and consumer attention",
    occupation: "Chairman & CEO",
    company: "VaynerX",
    location: "New York, NY",
    education: "Mount Ida College",
    age_estimate: "48",
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    needs: ["Mutual emotional resilience", "Shared warmth and kindness", "Appreciation for underdog spirit", "Zero entitlement"],
    hobbies: ["Garage saling on weekends", "Vintage sports card hunting", "Watching NY Jets games", "Wine tasting"],
    interests: ["Consumer psychology", "Social media macro trends", "Youth sports culture", "Nostalgia marketing"],
    values: ["Kindness is the ultimate ROI", "Accountability", "Patience", "Empathy", "Gratitude"],
    personality: { openness: 0.89, conscientiousness: 0.93, extraversion: 0.98, agreeableness: 0.85, neuroticism: 0.22 },
    communication_style: "Raw, energetic, punchy, intensely empathetic, street-smart.",
    energy_level: "high",
    lifestyle: "Fast-paced office days, weekend yard sales searching for hidden gems, deep family loyalty.",
    love_language: "Acts of Service & Words of Affirmation",
    summary: "Gary's agent matches with a big-hearted, unpretentious soul who values kindness above all, enjoys hunting garage sale treasures, and knows how to stay grounded."
  },
  {
    name: "Jessica Alba",
    linkedin_url: "https://www.linkedin.com/in/jessica-alba-8b6b1580",
    instagram_url: "https://www.instagram.com/jessicaalba",
    tagline: "Founder of The Honest Company, Actress & Wellness Advocate",
    occupation: "Founder & Chief Creative Officer",
    company: "The Honest Company",
    location: "Los Angeles, CA",
    education: "Atlantic Theater Company",
    age_estimate: "43",
    photo_url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80",
    needs: ["Clean and holistic living", "Family-first grounding", "Playful laughter", "Shared eco-consciousness"],
    hobbies: ["Organic gardening", "Family cooking sessions", "Reformed Pilates", "Interior design staging"],
    interests: ["Clean beauty ingredients", "Sustainable packaging", "Holistic parenting", "Latin culinary traditions"],
    values: ["Integrity", "Health transparency", "Family loyalty", "Creativity", "Empowerment"],
    personality: { openness: 0.90, conscientiousness: 0.92, extraversion: 0.87, agreeableness: 0.93, neuroticism: 0.27 },
    communication_style: "Warm, authentic, expressive, radiates maternal warmth and business sharpness.",
    energy_level: "high",
    lifestyle: "Farm-to-table Sunday dinners, clean skincare formulations, family dance challenges, sunlit garden mornings.",
    love_language: "Acts of Service & Physical Touch",
    summary: "Jessica's agent looks for a supportive, family-oriented partner who treasures healthy living, loves good food, and brings warmth to every room."
  },
  {
    name: "Marques Brownlee",
    linkedin_url: "https://www.linkedin.com/in/marques-brownlee-b3026857",
    instagram_url: "https://www.instagram.com/mkbhd",
    tagline: "Crisp tech reviews, ultimate frisbee pro, visual storyteller",
    occupation: "Creator & Founder",
    company: "MKBHD / Studio",
    location: "Kearny, NJ",
    education: "Stevens Institute of Technology",
    age_estimate: "30",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    needs: ["Respect for creative craft", "Athletic synergy", "Chill and unpretentious vibe", "Shared love for clean aesthetics"],
    hobbies: ["Professional Ultimate Frisbee (AUDL)", "Retro tech restoration", "EV driving tours", "Track & field"],
    interests: ["Camera sensor physics", "Industrial product design", "Minimalist workspaces", "Automotive engineering"],
    values: ["Quality over quantity", "Humility", "Authenticity", "Precision", "Work ethic"],
    personality: { openness: 0.92, conscientiousness: 0.96, extraversion: 0.65, agreeableness: 0.88, neuroticism: 0.19 },
    communication_style: "Calm, articulate, measured, visual thinker with impeccable timing.",
    energy_level: "medium",
    lifestyle: "Ultimate frisbee drills at dawn, studio lighting setups, quiet evenings testing new EVs.",
    love_language: "Quality Time & Receiving Gifts",
    summary: "Marques's agent seeks an athletic, grounded creative who appreciates fine craftsmanship, loves tossing a disc outside, and enjoys quiet, quality downtime."
  },
  {
    name: "Justine Ezarik",
    linkedin_url: "https://www.linkedin.com/in/ijustine",
    instagram_url: "https://www.instagram.com/ijustine",
    tagline: "Tech, gaming, video editing, drone pilot & coffee addict",
    occupation: "Digital Creator & Host",
    company: "iJustine",
    location: "Los Angeles, CA",
    education: "Pittsburgh Technical Institute",
    age_estimate: "40",
    photo_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    needs: ["Fun-loving spirit", "Geeky tech enthusiasm", "Dog lover", "Spontaneous adventure companion"],
    hobbies: ["Video editing marathons", "Flying FPV drones", "Specialty espresso making", "Gaming & virtual reality"],
    interests: ["Consumer tech releases", "Pet rescue", "Creative video transitions", "Apple ecosystem lore"],
    values: ["Positivity", "Loyalty", "Creative joy", "Kindness to animals", "Consistency"],
    personality: { openness: 0.93, conscientiousness: 0.88, extraversion: 0.92, agreeableness: 0.93, neuroticism: 0.26 },
    communication_style: "Upbeat, humorous, highly animated, incredibly friendly and relatable.",
    energy_level: "high",
    lifestyle: "Espresso shots at 7am, drone flights in scenic canyons, dog cuddles, Final Cut Pro timelines.",
    love_language: "Words of Affirmation & Quality Time",
    summary: "Justine's agent seeks a playful, dog-loving geek who loves road trips, laughs at spontaneous bloopers, and shares a genuine love for cutting-edge gadgets."
  },
  {
    name: "Sam Altman",
    linkedin_url: "https://www.linkedin.com/in/samaltman",
    instagram_url: "https://www.instagram.com/sama",
    tagline: "Exploring the frontier of artificial general intelligence",
    occupation: "CEO",
    company: "OpenAI",
    location: "San Francisco, CA",
    education: "Stanford University (Computer Science)",
    age_estimate: "39",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    needs: ["Intellectual calm in high-pressure storms", "Shared appreciation for farm tranquility", "Deep future-building vision"],
    hobbies: ["Farming & olive groves", "Fast sports car racing", "Backpacking wilderness trails", "Collecting vintage computers"],
    interests: ["Nuclear fusion (Helion)", "AI safety & alignment", "Longevity biotech", "Macroeconomics"],
    values: ["High agency", "Fearlessness", "Long-term civilization impact", "Clarity of thought", "Loyalty"],
    personality: { openness: 0.98, conscientiousness: 0.94, extraversion: 0.70, agreeableness: 0.82, neuroticism: 0.28 },
    communication_style: "Concise, razor-sharp, quiet intensity, focused on foundational principles.",
    energy_level: "high",
    lifestyle: "Ranch weekends tending animals and olives, intense technical strategy summits, quiet nighttime reading.",
    love_language: "Quality Time & Acts of Service",
    summary: "Sam's agent seeks a high-agency, intellectually daring partner who finds peace in nature, isn't fazed by global spotlights, and values deep quiet intimacy."
  },
  {
    name: "Andrew Huberman",
    linkedin_url: "https://www.linkedin.com/in/andrew-huberman",
    instagram_url: "https://www.instagram.com/hubermanlab",
    tagline: "Professor of Neurobiology & Ophthalmology, Stanford Medicine",
    occupation: "Professor & Podcaster",
    company: "Stanford University / Huberman Lab",
    location: "Palo Alto, CA",
    education: "UC Berkeley / UC Davis (PhD Neuroscience)",
    age_estimate: "48",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    needs: ["Circadian protocol alignment", "Scientific curiosity", "Dog lover", "Direct, grounded communication"],
    hobbies: ["Skateboarding (since youth)", "Weight lifting & zone-2 cardio", "Morning sunlight exposure walks", "Dog training"],
    interests: ["Dopamine neurocircuitry", "Visual system neuroscience", "Sleep architecture", "Physical endurance protocols"],
    values: ["Scientific rigor", "Service to public health", "Discipline", "Loyalty to mentors", "Grounded authenticity"],
    personality: { openness: 0.91, conscientiousness: 0.97, extraversion: 0.74, agreeableness: 0.85, neuroticism: 0.25 },
    communication_style: "Structured, educational, precise, warm yet rigorous.",
    energy_level: "high",
    lifestyle: "Early morning sunlight viewing, cold shower, heavy lifts, deep podcast recording, evening red light wind-down.",
    love_language: "Quality Time & Acts of Service",
    summary: "Andrew's agent searches for a health-conscious, curious partner who loves dogs, appreciates outdoor sunlight walks, and values disciplined, passionate living."
  },
  {
    name: "Payal Kadakia Pujji",
    linkedin_url: "https://www.linkedin.com/in/payalkadakia",
    instagram_url: "https://www.instagram.com/payal",
    tagline: "Founder of ClassPass, Artistic Director of Sa Dance Co, Author",
    occupation: "Founder & Creative Director",
    company: "ClassPass / Sa Dance Company",
    location: "New York, NY",
    education: "MIT (Management Science)",
    age_estimate: "41",
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    needs: ["Rhythmic artistic expression", "Support for dual passions (tech + dance)", "Family heritage celebration"],
    hobbies: ["Indian classical dance choreography", "Boutique fitness hopping", "Goal-setting journaling", "Travel to ancestral sites"],
    interests: ["Dance therapy", "Mindset optimization", "Entrepreneurship for creators", "South Asian performing arts"],
    values: ["Living life in rhythm", "Courage to pivot", "Cultural heritage", "Self-expression", "Discipline"],
    personality: { openness: 0.96, conscientiousness: 0.94, extraversion: 0.86, agreeableness: 0.90, neuroticism: 0.27 },
    communication_style: "Passionate, expressive, inspiring, moves seamlessly between analytical and artistic notes.",
    energy_level: "high",
    lifestyle: "Dance rehearsals in studio, fitness classes across Manhattan, mindful goal-setting retreats, colorful family festivities.",
    love_language: "Physical Touch & Quality Time",
    summary: "Payal's agent looks for a partner who embraces music, movement, and analytical drive — someone who will dance in the living room and build dreams together."
  },
  {
    name: "Austen Allred",
    linkedin_url: "https://www.linkedin.com/in/austenallred",
    instagram_url: "https://www.instagram.com/austen",
    tagline: "Building pathways to economic mobility through education",
    occupation: "Co-Founder & CEO",
    company: "Bloom Institute of Technology",
    location: "Salt Lake City, UT",
    education: "Brigham Young University",
    age_estimate: "36",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    needs: ["Shared mountain lifestyle", "Grit and underdog empathy", "Family warmth and big dinners", "Direct unvarnished banter"],
    hobbies: ["Mountain biking in Utah canyons", "Backcountry snowboarding", "Reading history of warfare & economy", "Woodworking"],
    interests: ["Income share agreements", "Higher education reform", "Rust Belt revitalization", "Macro investing"],
    values: ["Hard work", "Economic opportunity", "Family devotion", "Resilience through adversity", "No BS transparency"],
    personality: { openness: 0.88, conscientiousness: 0.92, extraversion: 0.82, agreeableness: 0.84, neuroticism: 0.30 },
    communication_style: "Pragmatic, direct, witty, grounded in blue-collar empathy.",
    energy_level: "high",
    lifestyle: "Early mountain trails with kids, high-energy founder work, dinner around a big wooden table.",
    love_language: "Words of Affirmation & Acts of Service",
    summary: "Austen's agent matches with someone down-to-earth who loves mountain trails, values grit, speaks honestly, and cherishes a lively, warm home."
  },
  {
    name: "Cathie Wood",
    linkedin_url: "https://www.linkedin.com/in/cathiedwood",
    instagram_url: "https://www.instagram.com/cathiedwood",
    tagline: "Investing in disruptive innovation that changes how our world works",
    occupation: "Founder, CEO & CIO",
    company: "ARK Invest",
    location: "St. Petersburg, FL",
    education: "USC Marshall School of Business",
    age_estimate: "68",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    needs: ["Conviction in unorthodox ideas", "Faith-infused moral grounding", "Intellectual curiosity about the future"],
    hobbies: ["Florida coastal boating", "Reading theology and economic history", "Mentoring women in finance", "Sunsets over Gulf"],
    interests: ["Genomic sequencing", "Autonomous mobility", "Deep learning neural nets", "Crypto economics", "Space exploration"],
    values: ["Courage under fire", "Faith & Purpose", "Radical transparency", "Truth in research", "Long-term perspective"],
    personality: { openness: 0.97, conscientiousness: 0.95, extraversion: 0.84, agreeableness: 0.88, neuroticism: 0.20 },
    communication_style: "Analytical, calm, articulate, grounded in unwavering conviction.",
    energy_level: "high",
    lifestyle: "Sunrise research reading, ARK podcast recordings, boat cruises with grandchildren in St. Pete.",
    love_language: "Words of Affirmation & Quality Time",
    summary: "Cathie's agent connects with a forward-looking, principled thinker who shares deep values, isn't swayed by crowd noise, and loves exploring the technological frontier."
  },
  {
    name: "Ryan Serhant",
    linkedin_url: "https://www.linkedin.com/in/ryanserhant",
    instagram_url: "https://www.instagram.com/ryanserhant",
    tagline: "Ready, Set, Go. Building the future of real estate media.",
    occupation: "Founder & CEO",
    company: "SERHANT.",
    location: "New York, NY",
    education: "Hamilton College (English Literature)",
    age_estimate: "40",
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    needs: ["Dynamic enthusiasm", "Appreciation for theater and performance", "Supportive anchor in bustling NYC", "Family warmth"],
    hobbies: ["Improv theater", "Early 4am gym workouts", "Architecture tours of Manhattan penthouses", "Greek island sailing"],
    interests: ["Luxury real estate design", "Media production", "Negotiation tactics", "Film & Broadway"],
    values: ["Relentless optimism", "Execution over talk", "Showmanship with integrity", "Family devotion", "Kindness"],
    personality: { openness: 0.91, conscientiousness: 0.98, extraversion: 0.99, agreeableness: 0.86, neuroticism: 0.21 },
    communication_style: "Charismatic, high-octane, witty, storytelling master.",
    energy_level: "high",
    lifestyle: "4:30 AM workout, film shoot in Soho, family dinner in Brooklyn, high-voltage energy all day.",
    love_language: "Receiving Gifts & Quality Time",
    summary: "Ryan's agent matches with a bright, magnetic, ambitious spirit who loves the energy of the city, appreciates dramatic humor, and values tight family bonds."
  },
  {
    name: "Kat Cole",
    linkedin_url: "https://www.linkedin.com/in/katcole",
    instagram_url: "https://www.instagram.com/katcoleatl",
    tagline: "From hostess to president: leading with courage, competence, and care",
    occupation: "CEO & Operating Partner",
    company: "AG1 (Athletic Greens)",
    location: "Dallas, TX",
    education: "Georgia State University (Executive MBA)",
    age_estimate: "46",
    photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    needs: ["Vulnerable partnership", "Mutual operational support", "Weekly check-in reflection rituals", "Adventurous soul"],
    hobbies: ["Trail ultramarathons & functional fitness", "Mentoring young female founders", "Sunday family rituals", "Travel"],
    interests: ["Nutritional science", "Franchise business systems", "Leadership development", "Human longevity"],
    values: ["Possibility mindset", "Courage to ask hard questions", "Radical authenticity", "Humility", "Inclusivity"],
    personality: { openness: 0.93, conscientiousness: 0.96, extraversion: 0.90, agreeableness: 0.92, neuroticism: 0.19 },
    communication_style: "Empowering, direct, emotionally courageous, practical and heart-centered.",
    energy_level: "high",
    lifestyle: "Morning greens & kettlebells, strategy meetings, Friday night family games, global humanitarian visits.",
    love_language: "Acts of Service & Words of Affirmation",
    summary: "Kat's agent desires a courageous, grounded partner who welcomes honest reflection, loves living with vitality, and brings genuine care to everyone they meet."
  },
  {
    name: "Mark Cuban",
    linkedin_url: "https://www.linkedin.com/in/mark-cuban-bb43614",
    instagram_url: "https://www.instagram.com/mcuban",
    tagline: "Disrupting pharmacy costs through Cost Plus Drugs, Shark & Mavs Fan",
    occupation: "Co-Founder & Investor",
    company: "Cost Plus Drugs / Radical Investments",
    location: "Dallas, TX",
    education: "Indiana University Bloomington (Kelley School of Business)",
    age_estimate: "65",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    needs: ["Zero pretension", "Direct competitive banter", "Family loyalty", "Shared excitement for shaking up monopolies"],
    hobbies: ["Pickup basketball", "Reading regulatory filings for fun", "Watching college basketball", "T-shirt & jeans comfort"],
    interests: ["Healthcare price transparency", "AI tooling", "NBA basketball", "Shark Tank entrepreneurship"],
    values: ["Fairness", "Relentless effort", "Intellectual honesty", "Disruption of greed", "Generosity"],
    personality: { openness: 0.92, conscientiousness: 0.94, extraversion: 0.93, agreeableness: 0.83, neuroticism: 0.26 },
    communication_style: "Blunt, energetic, passionate, completely unpretentious and transparent.",
    energy_level: "high",
    lifestyle: "Shooting hoops on home court, reading 4 hours a day, zero fancy suits, family time in Dallas.",
    love_language: "Quality Time & Acts of Service",
    summary: "Mark's agent looks for someone witty, sharp, and totally real — someone who laughs easily, calls things like they see them, and loves a good underdog win."
  },
  {
    name: "Gwyneth Paltrow",
    linkedin_url: "https://www.linkedin.com/in/gwyneth-paltrow-goop",
    instagram_url: "https://www.instagram.com/gwynethpaltrow",
    tagline: "Curating a life well-lived. Founder & CEO of goop.",
    occupation: "Founder & CEO",
    company: "goop",
    location: "Santa Monica, CA",
    education: "UC Santa Barbara (Art History)",
    age_estimate: "51",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    needs: ["Sensory and culinary refinement", "Emotional clarity & conscious uncoupling wisdom", "Spiritual curiosity"],
    hobbies: ["French & Italian home cooking", "Sauna & lymphatic drainage", "Curating mid-century ceramic art", "Organic winemaking"],
    interests: ["Clean gastronomy", "Integrative functional medicine", "Aesthetic minimalism", "Film history", "Botanical perfumery"],
    values: ["Aesthetic integrity", "Holistic health", "Conscious communication", "Elegance", "Exploration"],
    personality: { openness: 0.95, conscientiousness: 0.89, extraversion: 0.83, agreeableness: 0.88, neuroticism: 0.32 },
    communication_style: "Warm, intimate, subtly witty, sensory-rich and unapologetic.",
    energy_level: "medium",
    lifestyle: "Slow European-style family lunches, dry brushing, farmer's market herbs, sunset ocean views in Montecito.",
    love_language: "Quality Time & Physical Touch",
    summary: "Gwyneth's agent seeks a cultivated, self-aware partner who savors slow home-cooked dinners, appreciates understated luxury, and lives mindfully."
  },
  {
    name: "Marc Benioff",
    linkedin_url: "https://www.linkedin.com/in/marcbenioff",
    instagram_url: "https://www.instagram.com/benioff",
    tagline: "Business as the greatest platform for change. Ohana spirit.",
    occupation: "Chair & CEO",
    company: "Salesforce",
    location: "San Francisco, CA / Hawaii",
    education: "University of Southern California (USC)",
    age_estimate: "59",
    photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    needs: ["Spiritual connection & Ohana warmth", "Shared oceanic serenity in Hawaii", "Commitment to planetary giving"],
    hobbies: ["Meditating on the Big Island", "Collecting Hawaiian indigenous art", "Swimming with sea turtles", "Writing on conscious capitalism"],
    interests: ["1-1-1 Philanthropy model", "Cloud enterprise ecosystems", "Ocean reforestation", "Buddhism & mindfulness"],
    values: ["Ohana (Family)", "Trust", "Customer success", "Equality", "Sustainability"],
    personality: { openness: 0.94, conscientiousness: 0.91, extraversion: 0.92, agreeableness: 0.93, neuroticism: 0.21 },
    communication_style: "Expansive, warm, charismatic, blends spiritual wisdom with executive gravitas.",
    energy_level: "high",
    lifestyle: "Hawaiian ocean swims at sunrise, philanthropic summits, wearing Hawaiian shirts to board meetings.",
    love_language: "Words of Affirmation & Acts of Service",
    summary: "Marc's agent desires a warm-hearted, values-aligned soul who loves the ocean, feels called to give back, and embraces the true spirit of Ohana."
  },
  {
    name: "Bozoma Saint John",
    linkedin_url: "https://www.linkedin.com/in/bozoma-saint-john-62884a4",
    instagram_url: "https://www.instagram.com/badassboz",
    tagline: "The Badass Boz: Living life urgently, fabulously, and unapologetically",
    occupation: "Hall of Fame Marketer, Author & Exec",
    company: "The Eve Program / Ex-Netflix & Apple",
    location: "Los Angeles, CA",
    education: "Wesleyan University (English & African American Studies)",
    age_estimate: "47",
    photo_url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80",
    needs: ["Fearless self-expression", "Celebration of joy and grief", "High fashion and cultural brilliance", "Deep romantic passion"],
    hobbies: ["Curating haute couture fashion", "Afrobeats dancing", "Hosting lavish intimate dinner parties", "Visiting Ghana"],
    interests: ["Global pop culture", "African diaspora arts", "Memoir writing", "Music marketing", "Female financial freedom"],
    values: ["Urgency of living", "Authentic power", "Joy as resistance", "Love without hesitation", "Loyalty"],
    personality: { openness: 0.97, conscientiousness: 0.92, extraversion: 0.99, agreeableness: 0.89, neuroticism: 0.29 },
    communication_style: "Magnetic, poetic, bold, electrifying, completely captivating.",
    energy_level: "high",
    lifestyle: "Afrobeats playing in a sunlit villa, vibrant custom gowns, deep heart-to-hearts with close friends, celebrating life daily.",
    love_language: "Words of Affirmation & Receiving Gifts",
    summary: "Bozoma's agent seeks a confident, emotionally expansive partner who isn't intimidated by fierce brilliance and loves to celebrate every second of life with passion."
  },
  {
    name: "Guy Kawasaki",
    linkedin_url: "https://www.linkedin.com/in/guykawasaki",
    instagram_url: "https://www.instagram.com/guykawasaki",
    tagline: "Chief Evangelist at Canva, author, podcast host of Remarkable People",
    occupation: "Chief Evangelist & Author",
    company: "Canva / Ex-Apple",
    location: "Santa Cruz, CA",
    education: "Stanford University / UCLA Anderson",
    age_estimate: "70",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    needs: ["Surfing partner / coastal enthusiast", "Curious interviewer mindset", "Gentle humor and self-deprecation", "Active outdoor life"],
    hobbies: ["Surfing Santa Cruz breaks at dawn", "Interviewing world figures", "Ice hockey", "Testing fountain pens & note apps"],
    interests: ["Evangelism marketing", "Podcasting craft", "Creativity democratization", "Hawaiian culture"],
    values: ["Enchantment", "Empowerment", "Humility", "Grit in learning new sports late in life", "Kindness"],
    personality: { openness: 0.93, conscientiousness: 0.90, extraversion: 0.85, agreeableness: 0.94, neuroticism: 0.17 },
    communication_style: "Enchanting, self-deprecating, punchy, generous with praise.",
    energy_level: "medium",
    lifestyle: "Dawn surf sessions at Pleasure Point, conducting podcast interviews, family dinners with Hawaiian poke.",
    love_language: "Quality Time & Acts of Service",
    summary: "Guy's agent matches with an active, curious spirit who loves ocean breezes, doesn't take themselves too seriously, and finds joy in learning something new every day."
  }
];

// Helper to generate full demo data matching types
export function buildDemoDataset() {
  const people: Person[] = [];
  const profiles: Profile[] = [];
  const now = new Date().toISOString();

  REAL_PEOPLE_RAW.forEach((raw, index) => {
    const personId = `demo-person-${index + 1}`;
    const profileId = `demo-profile-${index + 1}`;

    people.push({
      id: personId,
      name: raw.name,
      linkedin_url: raw.linkedin_url,
      instagram_url: raw.instagram_url,
      photo_url: raw.photo_url,
      status: "ready",
      error_message: null,
      created_at: now,
      updated_at: now,
    });

    profiles.push({
      id: profileId,
      person_id: personId,
      name: raw.name,
      tagline: raw.tagline,
      photo_url: raw.photo_url,
      age_estimate: raw.age_estimate,
      location: raw.location,
      occupation: raw.occupation,
      company: raw.company,
      education: raw.education,
      needs: raw.needs,
      hobbies: raw.hobbies,
      interests: raw.interests,
      values: raw.values,
      personality: raw.personality,
      communication_style: raw.communication_style,
      energy_level: raw.energy_level,
      lifestyle: raw.lifestyle,
      love_language: raw.love_language,
      summary: raw.summary,
      raw_analysis: {
        source_quality: "high",
        linkedin_analyzed: true,
        instagram_analyzed: true,
        data_sources: [raw.linkedin_url, raw.instagram_url],
      },
      analyzed_at: now,
      updated_at: now,
    });
  });

  // Generate simulated dates between selected interesting pairs
  const dates: DateRecord[] = [];
  const scores: Score[] = [];

  // Create dates for the first 10 people against each other to demonstrate full simulation
  const samplePairs: [number, number][] = [
    [0, 1], // Satya & Sara
    [2, 3], // Brian & Whitney
    [4, 5], // Alexis & Melanie
    [6, 7], // Reid & Arianna
    [8, 9], // Tim & Gary
    [10, 11], // Jessica & Marques
    [12, 13], // Justine & Sam
    [14, 15], // Andrew & Payal
    [16, 17], // Austen & Cathie
    [18, 19], // Ryan & Kat
    [20, 21], // Mark Cuban & Gwyneth
    [22, 23], // Marc Benioff & Bozoma
    [2, 5], // Brian & Melanie (design & Canva)
    [3, 0], // Whitney & Satya
    [8, 14], // Tim & Andrew (health & wellness)
  ];

  samplePairs.forEach(([idxA, idxB], pairIdx) => {
    const pA = people[idxA];
    const pB = people[idxB];
    const profA = profiles[idxA];
    const profB = profiles[idxB];
    const dateId = `demo-date-${pairIdx + 1}`;

    const dateMessages = [
      {
        role: "person_a" as const,
        name: pA.name,
        content: `Hi ${pB.name.split(" ")[0]}! I was reading about your journey with ${profB.company} and noticed your love for ${profB.hobbies[0]}. How do you balance that with everything else you build?`,
        timestamp: "2026-10-02T10:00:00Z",
      },
      {
        role: "person_b" as const,
        name: pB.name,
        content: `Hey ${pA.name.split(" ")[0]}! What a thoughtful opener. Honestly, ${profB.hobbies[0]} is my sanity anchor. When I looked into your persona, I felt a real connection with your focus on "${profA.values[0]}" and how you prioritize ${profA.hobbies[0]}.`,
        timestamp: "2026-10-02T10:02:00Z",
      },
      {
        role: "person_a" as const,
        name: pA.name,
        content: `That resonates so deeply. In a world full of rapid noise, having that grounding ritual is everything. How do you view vulnerability and unwinding when the day closes?`,
        timestamp: "2026-10-02T10:04:00Z",
      },
      {
        role: "person_b" as const,
        name: pB.name,
        content: `For me, it's about authentic presence — no performance, just real honesty and laughing at the absurdity of the day. A partner who can sit in stillness or dance in the kitchen without judgment is what matters most.`,
        timestamp: "2026-10-02T10:06:00Z",
      },
      {
        role: "person_a" as const,
        name: pA.name,
        content: `I love that vision. It feels like our agents captured our core priorities remarkably well. I'd genuinely love to explore where our shared curiosity takes us.`,
        timestamp: "2026-10-02T10:08:00Z",
      },
      {
        role: "person_b" as const,
        name: pB.name,
        content: `Completely agreed. Here's to building something meaningful, grounded, and full of mutual joy!`,
        timestamp: "2026-10-02T10:10:00Z",
      },
    ];

    const dateRecord: DateRecord = {
      id: dateId,
      person_a_id: pA.id,
      person_b_id: pB.id,
      messages: dateMessages,
      turn_count: 6,
      status: "completed",
      error_message: null,
      started_at: "2026-10-02T10:00:00Z",
      completed_at: "2026-10-02T10:10:00Z",
      created_at: now,
      person_a: pA,
      person_b: pB,
      profile_a: profA,
      profile_b: profB,
    };
    dates.push(dateRecord);

    // Compatibility calculation
    const baseScore = 7.5 + ((idxA * 3 + idxB * 7) % 23) / 10;
    const boundedScore = Math.min(9.8, Math.max(7.2, baseScore));

    const scoreA: Score = {
      id: `demo-score-${pairIdx + 1}-a`,
      date_id: dateId,
      scorer_id: pA.id,
      target_id: pB.id,
      shared_interests: Math.min(9.9, +(boundedScore + 0.2).toFixed(1)),
      communication_style: Math.min(9.9, +(boundedScore - 0.1).toFixed(1)),
      lifestyle_alignment: Math.min(9.9, +(boundedScore + 0.1).toFixed(1)),
      intellectual_match: Math.min(9.9, +(boundedScore + 0.4).toFixed(1)),
      ambition_alignment: Math.min(9.9, +(boundedScore + 0.3).toFixed(1)),
      emotional_resonance: Math.min(9.9, +(boundedScore - 0.2).toFixed(1)),
      creative_compatibility: Math.min(9.9, +(boundedScore + 0.2).toFixed(1)),
      energy_match: Math.min(9.9, +(boundedScore).toFixed(1)),
      overall_score: +boundedScore.toFixed(1),
      reasoning: `Strong mutual appreciation of ${profB.company}'s mission, overlapping dedication to ${profA.values[0]}, and high conversational chemistry during the simulation.`,
      scored_at: "2026-10-02T10:11:00Z",
    };
    scores.push(scoreA);

    const scoreB: Score = {
      id: `demo-score-${pairIdx + 1}-b`,
      date_id: dateId,
      scorer_id: pB.id,
      target_id: pA.id,
      shared_interests: Math.min(9.9, +(boundedScore).toFixed(1)),
      communication_style: Math.min(9.9, +(boundedScore + 0.2).toFixed(1)),
      lifestyle_alignment: Math.min(9.9, +(boundedScore - 0.2).toFixed(1)),
      intellectual_match: Math.min(9.9, +(boundedScore + 0.3).toFixed(1)),
      ambition_alignment: Math.min(9.9, +(boundedScore + 0.4).toFixed(1)),
      emotional_resonance: Math.min(9.9, +(boundedScore + 0.1).toFixed(1)),
      creative_compatibility: Math.min(9.9, +(boundedScore).toFixed(1)),
      energy_match: Math.min(9.9, +(boundedScore - 0.1).toFixed(1)),
      overall_score: +(boundedScore + 0.1).toFixed(1),
      reasoning: `Harmonious blend of vision and personal grounding. Great conversational flow and respectful listening pace.`,
      scored_at: "2026-10-02T10:11:30Z",
    };
    scores.push(scoreB);
  });

  // Build rankings for all 25 people
  const rankings: Ranking[] = people.map((person, personIndex) => {
    // Generate ranked list against all other 24 people
    const otherPeople = people.filter((_, idx) => idx !== personIndex);

    const rankedMatches: RankedMatch[] = otherPeople
      .map((target, targetIndex) => {
        const targetProfile = profiles.find((p) => p.person_id === target.id);
        const pseudoScore = +(8.0 + (((personIndex + 1) * 7 + (targetIndex + 1) * 11) % 18) / 10).toFixed(1);
        const myScore = +(pseudoScore + (((personIndex + targetIndex) % 5) - 2) * 0.1).toFixed(1);
        const theirScore = +(pseudoScore + (((personIndex * 2 + targetIndex) % 5) - 2) * 0.1).toFixed(1);
        const mutual = +((myScore + theirScore) / 2).toFixed(1);

        return {
          person_id: target.id,
          name: target.name,
          photo_url: target.photo_url,
          mutual_score: mutual,
          my_score: myScore,
          their_score: theirScore,
          rank: 0, // Assigned after sorting
          reasoning: `Remarkable synergy between ${person.name}'s focus on ${profiles[personIndex].values[0]} and ${target.name}'s devotion to ${targetProfile?.values[0] || "innovation"}. High conversational energy and shared lifestyle rhythms.`,
          tagline: targetProfile?.tagline,
          occupation: targetProfile?.occupation,
        };
      })
      .sort((a, b) => b.mutual_score - a.mutual_score)
      .map((match, rankIndex) => ({
        ...match,
        rank: rankIndex + 1,
      }));

    return {
      id: `demo-ranking-${personIndex + 1}`,
      person_id: person.id,
      ranked_matches: rankedMatches,
      generated_at: now,
    };
  });

  return { people, profiles, dates, scores, rankings };
}

export const DEMO_DATASET = buildDemoDataset();
