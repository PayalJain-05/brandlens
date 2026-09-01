import type {
  Analysis,
  BrandJourneyPoint,
  BrandScore,
  Gap,
  PlatformPresence,
  Project,
  ProfessionalProfile,
  ProfessionalSource,
  Story,
  Strength,
  Attention,
  User,
} from '@/types';

export const mockUser: User = {
  id: 'u_payal',
  name: 'Payal Jain',
  role: 'Data Science Student',
  email: 'payal.jain@example.com',
  avatarInitials: 'PJ',
  headline: 'Data Science Student | Python • SQL • Power BI',
  about:
    'Data Science student focused on turning messy data into clear, useful insight. I enjoy building dashboards, finding patterns, and telling stories with numbers.',
  location: 'Bengaluru, India',
};

export const mockProfile: ProfessionalProfile = {
  userId: 'u_payal',
  headline: 'Data Science Student | Python • SQL • Power BI',
  about:
    'Data Science student focused on turning messy data into clear, useful insight. I enjoy building dashboards, finding patterns, and telling stories with numbers.',
  skills: ['Python', 'SQL', 'Power BI', 'Pandas', 'Machine Learning', 'Statistics', 'Data Visualization', 'Excel'],
  experience: [
    {
      id: 'e1',
      role: 'Analytics Intern',
      org: 'Northstar Retail',
      period: 'Jun 2024 — Aug 2024',
      summary:
        'Built sales dashboards in Power BI, identified a 12% margin opportunity across three product lines, and presented findings to the category team.',
    },
    {
      id: 'e2',
      role: 'Data Science Project Lead',
      org: 'University Capstone',
      period: 'Jan 2024 — May 2024',
      summary:
        'Led a team of three analysing student AI-usage data; delivered an interactive dashboard and a shortlist of adoption patterns.',
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'M.Sc. Data Science',
      school: 'Indian Institute of Science Education & Research',
      period: '2023 — 2025',
    },
    {
      id: 'ed2',
      degree: 'B.Sc. Statistics',
      school: 'St. Xavier’s College',
      period: '2020 — 2023',
    },
  ],
  certifications: [
    { id: 'c1', name: 'Microsoft Power BI Data Analyst (PL-300)', issuer: 'Microsoft', year: '2024' },
    { id: 'c2', name: 'Google Data Analytics Certificate', issuer: 'Google', year: '2023' },
  ],
};

export const mockSources: ProfessionalSource[] = [
  { id: 's1', type: 'resume', name: 'Payal_Resume.pdf', status: 'processed', size: '184 KB', addedAt: 'Aug 02, 2025' },
  { id: 's2', type: 'portfolio', name: 'Payal_Portfolio.pdf', status: 'processed', size: '1.2 MB', addedAt: 'Aug 02, 2025' },
  { id: 's3', type: 'projects', name: 'Nike_Sales_Analysis.docx', status: 'processed', size: '96 KB', addedAt: 'Aug 02, 2025' },
];

export const mockBrandScore: BrandScore = {
  overall: 78,
  previousOverall: 66,
  delta: 12,
  insight: 'Your technical profile is strong. Your story needs more consistency.',
  metrics: [
    { key: 'clarity', label: 'Clarity', score: 82, description: 'How clearly your direction comes across.' },
    { key: 'consistency', label: 'Consistency', score: 76, description: 'How aligned your platforms are with each other.' },
    { key: 'tone', label: 'Tone', score: 71, description: 'How your professional voice reads.' },
    { key: 'evidence', label: 'Evidence', score: 83, description: 'How well your claims are backed by proof.' },
  ],
};

export const mockStrengths: Strength[] = [
  {
    id: 'st1',
    title: 'Strong technical foundation',
    detail: 'Python, SQL and Power BI appear consistently across your profile.',
  },
  {
    id: 'st2',
    title: 'Clear analytical positioning',
    detail: 'Your headline and experience consistently point toward data analysis and insight work.',
  },
];

export const mockAttentions: Attention[] = [
  {
    id: 'at1',
    title: 'Your project evidence is weaker than your skill claims.',
    detail:
      'Your profiles mention several technical skills, but fewer examples demonstrate those skills.',
  },
];

export const mockPlatformPresence: PlatformPresence[] = [
  { skill: 'Python', resume: true, linkedin: true, portfolio: false },
  { skill: 'SQL', resume: true, linkedin: true, portfolio: true },
  { skill: 'Power BI', resume: true, linkedin: true, portfolio: 'partial' },
  { skill: 'Projects', resume: true, linkedin: false, portfolio: false },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Nike Sales & Product Strategy Analysis',
    category: 'Business Analytics',
    tools: ['Power BI', 'SQL', 'Excel'],
    description:
      'Analysed Nike sales data to surface product and regional performance, then built an interactive dashboard to guide category strategy.',
    storyStatus: 'mined',
    storyId: 'st1',
  },
  {
    id: 'p2',
    title: 'AI Usage Analytics Dashboard',
    category: 'Data Visualization',
    tools: ['Power BI', 'Python', 'Pandas'],
    description:
      'Explored how students across disciplines use AI tools, then visualised adoption patterns in an interactive dashboard.',
    storyStatus: 'mined',
    storyId: 'st2',
  },
  {
    id: 'p3',
    title: 'Global Health Data Analysis',
    category: 'Public Health Analytics',
    tools: ['Python', 'Pandas', 'Matplotlib'],
    description:
      'Investigated global health indicators to compare outcomes across regions and identify long-running trends.',
    storyStatus: 'unmined',
  },
];

export const mockStories: Story[] = [
  {
    id: 'st1',
    projectId: 'p1',
    projectTitle: 'Nike Sales & Product Strategy Analysis',
    category: 'Business Analytics',
    original: 'Created a Power BI dashboard to analyse Nike sales.',
    problem: 'Category leads lacked a single view of which products and regions were driving sales.',
    action: 'Modelled sales data in SQL and built an interactive Power BI dashboard breaking performance down by product, region and channel.',
    insight: 'A small group of products carried most of the margin, while two regions were quietly underperforming.',
    impact: 'Gave the category team a clear view of where to focus, turning scattered sales data into a strategy conversation.',
    strongerStory:
      'Turned scattered Nike sales data into a category-strategy dashboard that surfaced a small set of high-margin products and two underperforming regions.',
    status: 'mined',
  },
  {
    id: 'st2',
    projectId: 'p2',
    projectTitle: 'AI Usage Analytics Dashboard',
    category: 'Data Visualization',
    original: 'Created a Power BI dashboard to analyze AI usage.',
    problem: 'Students were using AI differently across disciplines.',
    action: 'Analysed usage patterns and built an interactive Power BI dashboard.',
    insight: 'Identified patterns in AI adoption and usage.',
    impact: 'Turned scattered usage data into a clearer picture of student behaviour.',
    strongerStory:
      'Turned scattered AI usage data into actionable insights through an interactive Power BI dashboard.',
    status: 'mined',
  },
];

export const mockGaps: Gap[] = [
  {
    id: 'g1',
    index: '01',
    title: 'Python needs stronger evidence',
    category: 'evidence',
    priority: 'high',
    explanation:
      'Your resume and LinkedIn mention Python, but your portfolio doesn’t demonstrate it clearly.',
    recommendation: 'Add one Python project with measurable outcomes.',
  },
  {
    id: 'g2',
    index: '02',
    title: 'Power BI appears on two platforms but not in projects',
    category: 'platform',
    priority: 'medium',
    explanation:
      'Power BI is listed on your resume and LinkedIn, but only partially reflected in your portfolio.',
    recommendation: 'Link at least one Power BI dashboard with a short write-up.',
  },
  {
    id: 'g3',
    index: '03',
    title: 'Project evidence missing on LinkedIn',
    category: 'platform',
    priority: 'medium',
    explanation:
      'Your projects appear on your resume and portfolio, but are not surfaced on LinkedIn.',
    recommendation: 'Add a Featured project and a short post for your strongest work.',
  },
  {
    id: 'g4',
    index: '04',
    title: 'Headline doesn’t lead with your direction',
    category: 'positioning',
    priority: 'low',
    explanation:
      'Your LinkedIn headline lists tools first, which softens your Data Science focus.',
    recommendation: 'Lead with your direction, then support it with tools.',
  },
];

export const mockActionItems = [
  {
    id: 'a1',
    index: '01',
    title: 'Strengthen Python evidence',
    priority: 'high' as const,
    why: 'Your profile claims Python expertise, but supporting project evidence is limited.',
    doThis: 'Add one Python project to your portfolio and LinkedIn.',
    effort: '1–2 hours',
    completed: false,
  },
  {
    id: 'a2',
    index: '02',
    title: 'Improve LinkedIn positioning',
    priority: 'medium' as const,
    why: 'Your headline doesn’t clearly communicate your Data Science focus.',
    doThis: 'Rewrite your headline around your strongest skills and direction.',
    effort: '15 minutes',
    completed: false,
  },
  {
    id: 'a3',
    index: '03',
    title: 'Connect project evidence',
    priority: 'medium' as const,
    why: 'Several skills appear on your resume but aren’t supported by visible project evidence.',
    doThis: 'Link your strongest projects on LinkedIn and add short write-ups to your portfolio.',
    effort: '30 minutes',
    completed: false,
  },
];

export const mockBrandJourney: BrandJourneyPoint[] = [
  { label: 'Product Analyst Profile', score: 65, date: 'Jun 2025' },
  { label: 'Analytics Internship', score: 72, date: 'Jul 2025' },
  { label: 'Data Scientist Profile', score: 78, date: 'Aug 2025' },
];

export const mockAnalysis: Analysis = {
  id: 'an_1',
  createdAt: 'Aug 02, 2025',
  status: 'complete',
  sources: mockSources,
  brandScore: mockBrandScore,
  stages: [
    { id: 's1', label: 'Reading your profile', status: 'done' },
    { id: 's2', label: 'Understanding your experience', status: 'done' },
    { id: 's3', label: 'Comparing your professional presence', status: 'done' },
    { id: 's4', label: 'Finding your strengths', status: 'done' },
    { id: 's5', label: 'Looking for gaps', status: 'done' },
    { id: 's6', label: 'Building your recommendations', status: 'done' },
  ],
};

export const analysisStageLabels = [
  'Reading your profile',
  'Understanding your experience',
  'Comparing your professional presence',
  'Finding your strengths',
  'Looking for gaps',
  'Building your recommendations',
];
