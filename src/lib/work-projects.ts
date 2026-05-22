export type MetaRow = { label: string; value: string; link?: boolean };
export type FeatureItem = { title: string; body: string };
export type Plate = {
  device: "raw" | "figure" | "phone" | "tablet" | "laptop" | "desktop";
  caption: string;
  aspect?: number;
};

export type WorkProject = {
  slug: string;
  plate: string;
  year: string;
  medium: string;
  title: string;
  purpose: string;
  work: string | string[];
  results: string | string[];
  features?: string[];
  featuresCompact?: FeatureItem[];
  plates?: Plate[];
  confidential?: string;
  meta: MetaRow[];
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: "jungle",
    plate: "I",
    year: "2025",
    medium: "engineering · ai · founding role",
    title: "Founding Full Stack Engineer @ Jungle AI",
    purpose:
      "Students cramming dense lecture slides, PDFs, and recorded lectures needed a faster way to turn raw material into active recall — flashcards, quizzes, and feedback that actually stick — instead of re-reading.",
    work: [
      "Gamified progress visuals — animated tree-growth feature with live feedback, plus a monthly streak tracker that visualises days studied and questions answered.",
      "Smarter content engine — an AI feature that clarifies user mistakes, paired with K-means clustering for high-quality concept matching in vector embedding space.",
      "Performance & cross-platform reach — leaderboard with Intersection Observer + Firebase indexing (80% faster load) and a desktop Electron app with push notifications on iOS/Android.",
    ],
    results: [
      "+40% engagement and 3× revenue from the tree-growth + live-feedback features.",
      "+25% feature usage from AI mistake-clarification and –30% testing time from K-means clustering.",
      "1M users across desktop + mobile; featured in Forbes 30 Under 30, 2026 (Education).",
    ],
    plates: [
      { device: "phone", caption: "Streak calendar + tree-growth feedback after a session" },
    ],
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Founding Full Stack Engineer" },
      { label: "Press", value: "Forbes 30U30 ↗", link: true },
    ],
  },
  {
    slug: "manager",
    plate: "II",
    year: "2025",
    medium: "side project · holiday game",
    title: "Hit Your Manager! 🎄🎮",
    purpose:
      "A lot of friends have been stressed at work lately, so I built a lighthearted holiday de-stress game. Since so much of work life is outside our control, the idea was to transform stress into something playful and creative.",
    work:
      "Pick an object and throw it at a manager. (Sadly, no — you can't upload your real manager's face… yet 😂)",
    results:
      "My managers Julian Alvarez 🚀 and David Glass fully endorsed this. They laughed so hard when playing.",
    plates: [
      { device: "raw", caption: "Title screen — pick a manager, pick an object", aspect: 16 / 10 },
    ],
    meta: [
      { label: "Year", value: "2025" },
      { label: "Type", value: "Side project · Holiday game" },
      { label: "Play", value: "Live demo ↗", link: true },
    ],
  },
  {
    slug: "email",
    plate: "III",
    year: "2024",
    medium: "software · ml · side project",
    title: "AI Auto Email Follow Up",
    purpose:
      "Following up on job applications was a tedious yet important task. To address this, we implemented an automated system that sends follow-up emails after three days if no response is received.",
    work:
      "If an email you sent to recruiters or outreach hasn't been responded to for three days, GPT will generate a follow-up draft based on your past conversation for you.",
    results: "Over 60 people signed up and the demo received 40,000+ views.",
    features: [
      "An email label to filter recruiters vs non-recruiters.",
      "For labeled emails that haven't been replied to for three days, a GPT drafts a follow-up email based on your prior conversation.",
      "The draft sends to your inbox to remind you to follow up, and you can customize it before sending.",
    ],
    featuresCompact: [
      { title: "Label", body: "Distinguishes recruiters from everyone else." },
      { title: "3-day nudge", body: "A GPT drafts a follow-up rooted in the thread." },
      { title: "Inbox draft", body: "Lands as a reminder — refine and send." },
    ],
    plates: [
      {
        device: "raw",
        caption:
          "Gmail thread view, with the new label and recent labelled threads",
        aspect: 16 / 10,
      },
    ],
    meta: [
      { label: "Year", value: "2024" },
      { label: "Type", value: "Solo side project" },
      { label: "Demo", value: "40K+ views ↗", link: true },
    ],
  },
  {
    slug: "minerva",
    plate: "IV",
    year: "2023",
    medium: "research · nlp · school project",
    title: "How English Fluency Affects Grading at Minerva",
    purpose:
      "My school, Minerva, comprises non-English native students from 40+ countries. If a classmate speaks like Shakespeare, but I speak simply like a kindergartener — will the professor bias their grading?",
    work:
      "This project examines the potential bias in students' grades due to English fluency through NLP analysis. Using topic modelling, clustering, hypothesis testing, and neural-network analyses, I investigated the influence of word choice, readability, and language sophistication on professors' evaluations of student knowledge.",
    results:
      "Positive and significant grade-fluency correlations across all colleges — least significant for the Computer Science college.",
    plates: [
      {
        device: "figure",
        caption: "Methodology — flowchart of the analytical pipeline",
        aspect: 16 / 10,
      },
    ],
    meta: [
      { label: "Year", value: "2023" },
      { label: "Type", value: "School research · Minerva" },
      { label: "Paper", value: "Methodology ↗", link: true },
    ],
  },
  {
    slug: "learn",
    plate: "V",
    year: "2024",
    medium: "engineering · ai · founding role",
    title: "Founding AI Engineer @ Learn.xyz",
    purpose:
      "The content and image quality of mini courses generated by AI had been low. The job: raise the floor across 60K+ courses without slowing the team down.",
    work: [
      "Deployed the entire backend pipeline, integrating Firebase and GCP, leveraging asynchronous processing, content moderation, and error handling.",
      "Engineered a real-time Slack integration on top of the Firebase backend, enabling the internal team to moderate and delete unethical content.",
      "Integrated vector embeddings on Pinecone using Retrieval-Augmented Generation to enhance content quality, and optimised the LLM.",
    ],
    results: [
      "Ensured the quality of 60K AI-generated courses.",
      "Cut course-creation time by 75%.",
      "Closed a $3M seed.",
    ],
    plates: [
      { device: "phone", caption: "Course intro screen — generated cover art and title" },
    ],
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Founding AI Engineer" },
      { label: "Live", value: "learn.xyz ↗", link: true },
    ],
  },
  {
    slug: "meta",
    plate: "VI",
    year: "2022–23",
    medium: "data science · meta",
    title: "Data Science @ Meta",
    purpose:
      "The Metaverse needed clean data representations to build on. Numerous duplicate, fuzzy records existed across upstream systems.",
    work:
      "Built a deduplication data pipeline using the Levenshtein algorithm and subsampling for tractable scoring.",
    results: "Accelerated runtime by 20×. Mark Zuckerberg is happy. 😉",
    confidential: "Nothing to show — it's NDA.",
    meta: [
      { label: "Year", value: "2022" },
      { label: "Role", value: "Data Scientist" },
      { label: "Status", value: "Confidential" },
    ],
  },
];

export function getProject(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug);
}
