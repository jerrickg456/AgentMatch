export interface ScrapedPersonData {
  full_name?: string;
  headline?: string;
  location?: string;
  about?: string;
  education?: Array<{ schoolName: string; degree?: string; fieldOfStudy?: string }>;
  skills?: string[];
  experiences?: Array<{ title: string; companyName?: string; description?: string }>;
  photo_url?: string;
  instagram_bio?: string;
  instagram_posts?: string[];
  raw?: any;
}

export async function scrapeLinkedInProfile(linkedinUrl: string): Promise<ScrapedPersonData | null> {
  const token = process.env.APIFY_API_TOKEN || "";
  if (!token || !linkedinUrl) return null;

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/harvestapi~linkedin-profile-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queries: [linkedinUrl] }),
      }
    );

    if (!res.ok) return null;

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) return null;

    const data = items[0];
    const skills = Array.isArray(data.topSkills) && data.topSkills.length > 0
      ? data.topSkills
      : Array.isArray(data.skills)
      ? data.skills.map((s: any) => (typeof s === "string" ? s : s.name)).filter(Boolean)
      : [];

    const education = Array.isArray(data.education) && data.education.length > 0
      ? data.education
      : Array.isArray(data.profileTopEducation)
      ? data.profileTopEducation
      : [];

    return {
      full_name: `${data.firstName || ""} ${data.lastName || ""}`.trim() || undefined,
      headline: data.headline || undefined,
      location: data.location?.parsed?.text || data.location?.linkedinText || undefined,
      about: data.about || data.summary || undefined,
      skills: skills.slice(0, 15),
      education: education.map((e: any) => ({
        schoolName: e.schoolName || "",
        degree: e.degree || "",
        fieldOfStudy: e.fieldOfStudy || "",
      })),
      experiences: (data.experience || []).map((exp: any) => ({
        title: exp.title || "",
        companyName: exp.companyName || "",
        description: exp.description || "",
      })),
      photo_url: data.photo || data.profilePicture?.url || undefined,
      raw: data,
    };
  } catch (err) {
    console.error("Error scraping LinkedIn via Apify:", err);
    return null;
  }
}

export async function scrapeInstagramProfile(instagramUrl: string): Promise<Partial<ScrapedPersonData> | null> {
  const token = process.env.APIFY_API_TOKEN || "";
  if (!token || !instagramUrl) return null;

  // Extract username from URL or raw handle
  const cleanUrl = instagramUrl.trim().replace(/^@/, "");
  const match = cleanUrl.match(/(?:instagram\.com\/)?([a-zA-Z0-9._]+)/);
  const username = match ? match[1] : cleanUrl;

  if (!username || username === "dfh" || username === "jgfhj" || username.length < 2) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username] }),
      }
    );

    if (!res.ok) return null;

    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) return null;

    const data = items[0];
    const captions = Array.isArray(data.latestPosts)
      ? data.latestPosts.map((p: any) => p.caption).filter(Boolean).slice(0, 5)
      : [];

    return {
      full_name: data.fullName || undefined,
      instagram_bio: data.biography || undefined,
      instagram_posts: captions,
      photo_url: data.profilePicUrlHD || data.profilePicUrl || undefined,
    };
  } catch (err) {
    console.error("Error scraping Instagram via Apify:", err);
    return null;
  }
}

// Combined scraper that handles LinkedIn only, Instagram only, or both
export async function scrapePerson(linkedinUrl?: string, instagramUrl?: string): Promise<ScrapedPersonData | null> {
  const [linkedinData, instagramData] = await Promise.all([
    linkedinUrl ? scrapeLinkedInProfile(linkedinUrl) : Promise.resolve(null),
    instagramUrl ? scrapeInstagramProfile(instagramUrl) : Promise.resolve(null),
  ]);

  if (!linkedinData && !instagramData) {
    return null;
  }

  return {
    full_name: linkedinData?.full_name || instagramData?.full_name || undefined,
    headline: linkedinData?.headline || undefined,
    location: linkedinData?.location || undefined,
    about: linkedinData?.about || undefined,
    education: linkedinData?.education || [],
    skills: linkedinData?.skills || [],
    experiences: linkedinData?.experiences || [],
    photo_url: linkedinData?.photo_url || instagramData?.photo_url || undefined,
    instagram_bio: instagramData?.instagram_bio || undefined,
    instagram_posts: instagramData?.instagram_posts || [],
    raw: {
      linkedin: linkedinData?.raw,
      instagram: instagramData,
    },
  };
}
