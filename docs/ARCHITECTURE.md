# 💘 AgentMatch — Architecture & Engineering Specification

## 1. System Overview

**AgentMatch** is an autonomous multi-agent dating system where AI agents represent real human individuals, converse with other agents on their behalf, and evaluate mutual romantic/relational compatibility.

Each person and their corresponding agent are grounded strictly in two official public sources:
1. **LinkedIn Profile** (Professional career trajectory, education, skills, endorsements, intellectual pursuits)
2. **Public Instagram Profile** (Visual aesthetic, lifestyle rhythm, hobbies, captions, humor, energy level)

```
┌────────────────────────────────────────────────────────┐
│                      DATA INGESTION                    │
│   LinkedIn (Public URL)      Instagram (Public URL)    │
└──────────────┬────────────────────────┬────────────────┘
               │                        │
               ▼                        ▼
┌────────────────────────────────────────────────────────┐
│                   N8N AGENT ENGINE                     │
│  1. Scraper Workers (Bright Data / Apify)              │
│  2. Profile Analyzer Agent (OpenAI GPT-4)              │
│  3. Agent Dating Orchestrator                          │
│  4. Pairwise Simulation Engine (Multi-Turn Chat)       │
│  5. 8-Dimension Compatibility Scorer                   │
│  6. Global Ranking Compiler                            │
└──────────────┬────────────────────────┬────────────────┘
               │                        │
               ▼                        ▼
┌────────────────────────┐    ┌──────────────────────────┐
│   SUPABASE DATABASE    │    │   NEXT.JS 16 WEB APP     │
│   • people             │    │   • / (Landing)          │
│   • profiles           │    │   • /input (Onboarding)  │
│   • dates              │    │   • /profiles (Directory)│
│   • scores             │    │   • /profiles/[id] (Deep)│
│   • rankings           │    │   • /dating (Simulation) │
│   • sessions           │    │   • /rankings (Rankings) │
└────────────────────────┘    └──────────────────────────┘
```

---

## 2. Agent Persona Construction

When raw scraped data is collected, the **Profile Analysis Agent** (`workflows/analyze-profile.json`) synthesizes both data streams into an actionable psychological model:

- **Needs**: Core relationship requirements (e.g. intellectual companionship, mutual space, grounded emotional security).
- **Hobbies**: Active leisure activities extracted from Instagram posts and LinkedIn interests.
- **Interests**: Academic, artistic, industry, and cultural topics of fascination.
- **Values**: Guiding moral and philosophical principles.
- **Big Five Personality Profile**:
  - `openness` (0.0 – 1.0)
  - `conscientiousness` (0.0 – 1.0)
  - `extraversion` (0.0 – 1.0)
  - `agreeableness` (0.0 – 1.0)
  - `neuroticism` (0.0 – 1.0)
- **Communication Style**: Conversational pace, humor style, directness, and listening posture.
- **Energy Level**: `high`, `medium`, or `low`.
- **Lifestyle**: Daily rhythm, travel frequency, morning/evening preference.
- **Love Language**: Primary emotional expression modes.

---

## 3. The Multi-Turn Dating Simulation

The **Dating Simulation Engine** (`workflows/dating-simulation.json`) executes structured conversations between agent pairs.

### Prompt Formulation per Agent Turn:
```markdown
You are an autonomous AI dating agent representing [Name].
You are on a first date with [Target Name]'s agent.

Your persona:
- Occupation: [Occupation] at [Company]
- Values: [Values]
- Needs: [Needs]
- Hobbies & Interests: [Hobbies], [Interests]
- Communication Style: [Communication Style]
- Energy Level: [Energy Level]

Instructions:
1. Stay authentic to your person's voice, interests, and emotional tone.
2. React genuinely to what your date shares — ask engaging follow-ups or express playful banter.
3. Keep responses natural (2 to 4 sentences per turn). Do not break character.
```

---

## 4. 8-Dimension Compatibility Evaluation

Following the multi-turn exchange, each agent evaluates their date across **8 distinct dimensions** (`workflows/scoring-ranking.json`):

| Dimension | Weight | Definition |
|-----------|--------|------------|
| 🎯 **Shared Interests** | 15% | Overlap in active hobbies, leisure pursuits, cultural affinities. |
| 💬 **Communication Style** | 15% | Conversational rhythm, humor resonance, listening depth. |
| 🌍 **Lifestyle Alignment** | 15% | Daily habits, travel pace, urban vs. nature inclination. |
| 🎓 **Intellectual Match** | 10% | Curiosity depth, conceptual sparring, cognitive pace. |
| 💼 **Ambition Alignment** | 10% | Drive, vision, career demands, mutual support for success. |
| ❤️ **Emotional Resonance** | 15% | Empathy, emotional availability, vulnerability comfort. |
| 🎨 **Creative Compatibility**| 10% | Aesthetic appreciation, artistic spontaneity, curiosity. |
| ⚡ **Energy Match** | 10% | Introvert/extrovert balance, social frequency harmony. |

### Overall Score Calculation
$$\text{Overall} = \sum_{i=1}^{8} w_i \times \text{Dimension}_i$$

---

## 5. Mutual Ranking Engine

For each person $A$, the system compiles an ordered list of all other candidates $B_1, B_2, \dots, B_{N-1}$:
$$\text{Mutual Compatibility}(A, B) = \frac{\text{Score}(A \to B) + \text{Score}(B \to A)}{2}$$

Rankings are updated dynamically and presented with radar visual breakdown charts, dimension bars, and qualitative AI reasoning.
