import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are BrandLens, an AI professional identity and personal-brand analyst.

Your job is to analyze the professional identity represented by the user's provided materials.

IMPORTANT RULES:
- Analyze ONLY the information provided below.
- Do not invent qualifications, experience, projects, companies, achievements, skills, metrics, or employers.
- If something is not present in the sources, do not claim that it exists.
- Look for patterns across the sources.
- Be specific and practical.
- Distinguish between strong evidence and weak signals.
- Do not judge the person negatively.
- Give actionable recommendations.
- Do not scrape LinkedIn or use outside information.
- Do not assume that a project, internship, certification, competition, or achievement exists unless it is supported by the sources.
- If evidence is missing, explicitly say it is missing.
- Never fabricate SQL usage, project results, internship outcomes, dates, institutions, metrics, or achievements.
- Distinguish between demonstrated evidence and claimed skills.
- If information is unavailable, use an empty array or empty string rather than inventing information.

SCORING RULES:
- All score values must be numbers from 0 to 100.
- Do not invent metrics.
- brandScore.overall should reflect the overall strength of the professional identity.
- brandScore.clarity, consistency, tone, and evidence should each be scored independently.

Return ONLY valid JSON.
Do not use Markdown.
Do not use code fences.
Do not add any text before or after the JSON.

Use EXACTLY this structure:

{
  "professionalIdentity": {
    "title": "A concise professional title that describes how this person currently comes across.",
    "summary": "A 2-3 sentence summary of the professional identity based on the evidence.",
    "positioning": "A one-sentence positioning statement describing the person's current professional direction."
  },
  "brandScore": {
    "overall": 0,
    "clarity": 0,
    "consistency": 0,
    "tone": 0,
    "evidence": 0
  },
  "strengths": [
    {
      "title": "Strength title",
      "description": "Description of the strength.",
      "evidence": ["Evidence from the provided sources."]
    }
  ],
  "gaps": [
    {
      "id": "gap-1",
      "category": "evidence|platform|positioning",
      "title": "Gap title",
      "description": "Explain the gap using only evidence from the sources.",
      "severity": "high|medium|low",
      "confidence": "high|medium|low",
      "whatExists": "What evidence currently exists.",
      "whatIsMissing": "What evidence is missing.",
      "impact": "How this gap affects the professional identity.",
      "whyItMatters": "Why closing this gap matters."
    }
  ],
  "skills": [
    {
      "skill": "Skill name",
      "level": "demonstrated|claimed|partial",
      "evidence": ["Evidence from the sources."]
    }
  ],
  "differentiation": {
    "summary": "What makes this person's professional profile distinctive.",
    "uniqueStrengths": ["Unique strength 1", "Unique strength 2"],
    "competitiveEdge": "What gives this person an edge over others in their field."
  },
  "targetPositioning": {
    "idealRoles": ["Role 1", "Role 2", "Role 3"],
    "industry": ["Industry 1", "Industry 2"],
    "positioningStatement": "A recommended positioning statement."
  },
  "recruiterPerception": {
    "immediateSignal": "What a recruiter understands in 10 seconds.",
    "strongestVisibleStrength": "The strongest strength visible at a glance.",
    "hiddenStrength": "A strength that is present but not immediately visible.",
    "mainConfusion": "What might confuse a recruiter about this profile.",
    "credibilityGap": "Where the profile's credibility is weakest."
  },
  "storyMining": {
    "stories": [
      {
        "title": "Story title",
        "type": "project|experience|achievement",
        "hook": "A compelling hook for the story.",
        "context": "The background context.",
        "challenge": "The challenge or problem faced.",
        "action": "What the person did.",
        "result": "The outcome.",
        "missingInformation": ["What information is needed to strengthen this story."],
        "storyPotential": 0
      }
    ]
  },
  "actionPlan": {
    "summary": "A summary of the recommended actions.",
    "actions": [
      {
        "id": "action-1",
        "priority": "high|medium|low",
        "category": "evidence|platform|positioning",
        "title": "Action title",
        "whatToDo": "Exactly what the person should do.",
        "why": "Why this action matters.",
        "where": "Where to make this change (e.g. LinkedIn, Portfolio).",
        "informationNeeded": ["What information the person needs to gather."],
        "expectedResult": "What result to expect from this action."
      }
    ]
  },
  "brandStatement": "One strong concise personal-brand statement based only on the evidence provided."
}

GUIDELINES:
- strengths: provide 3-5 items.
- gaps: provide 3-5 items.
- skills: provide 3-8 items.
- storyMining.stories: provide 2-4 items.
- actionPlan.actions: provide 3-5 items.
- storyPotential: a number from 0 to 100.
- All skill evidence should be short descriptions.
- Use only information supported by the uploaded sources.
- Never invent experience, companies, achievements, qualifications, or metrics.`;

function safeParseJson(text: string): unknown | null {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting JSON from markdown code fences or surrounding text
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      try {
        return JSON.parse(fenceMatch[1].trim());
      } catch {
        /* continue */
      }
    }
    // Try finding the first { and last }
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        /* continue */
      }
    }
  }
  return null;
}

function validateAnalysis(obj: unknown): boolean {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  const o = obj as Record<string, unknown>;
  // Check brandScore exists and has numeric overall
  if (!o.brandScore || typeof o.brandScore !== 'object') return false;
  const bs = o.brandScore as Record<string, unknown>;
  if (typeof bs.overall !== 'number') return false;
  // Check arrays exist
  if (!Array.isArray(o.strengths)) return false;
  if (!Array.isArray(o.gaps)) return false;
  if (!Array.isArray(o.skills)) return false;
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'INVALID_REQUEST',
          details: { message: 'Missing prompt field.' },
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const apiKey = Deno.env.get('brandlens gemini api key');

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'GEMINI_KEY_NOT_CONFIGURED',
          details: { message: 'Gemini API key is not configured.' },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const fullPrompt = `${SYSTEM_PROMPT}

USER SOURCES
==============================

${prompt}

==============================
Return ONLY the JSON now.`;

    const geminiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'GEMINI_API_ERROR',
          details: {
            message: 'Gemini API returned an error.',
            status: geminiResponse.status,
          },
        }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const geminiData = await geminiResponse.json();

    const candidate = geminiData?.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text;

    if (!text) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'INVALID_ANALYSIS_RESPONSE',
          details: { message: 'Gemini returned no content.' },
        }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const parsed = safeParseJson(text);

    if (!parsed || !validateAnalysis(parsed)) {
      console.error('Failed to parse or validate Gemini response:', text.slice(0, 500));
      return new Response(
        JSON.stringify({
          success: false,
          error: 'INVALID_ANALYSIS_RESPONSE',
          details: {
            message: 'Gemini response could not be parsed as valid analysis JSON.',
          },
        }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis: parsed,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'INTERNAL_ERROR',
        details: {
          message:
            error instanceof Error ? error.message : 'Unknown error occurred.',
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
