import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  Sparkles, Wind, BookOpen, Moon, Brain, Heart, Play, Pause,
  Menu, X, ArrowRight, Check, Quote, Star, Facebook, Twitter,
  Instagram, Youtube, Mail, ChevronDown, Trophy, Timer, Waves,
  Leaf, Sun, CloudRain, Bot, Send, UserRound, LayoutDashboard,
  Calendar, Video, MessageCircle, LogOut, Shield, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import hero from "@/assets/mental-health-hero.jpg";
import ferns from "@/assets/nature-ferns.jpg";
import stones from "@/assets/stones.jpg";
import sky from "@/assets/sky-lavender.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entropy to Stillness — Find Calm in the Chaos" },
      {
        name: "description",
        content:
          "A premium mindfulness platform for meditation, breathing, journaling, sleep and AI-guided calm.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- data ---------- */

const nav = [
  { label: "Meditate", href: "#meditate" },
  { label: "Breathe", href: "#breathe" },
  { label: "Therapists", href: "#therapists" },
  { label: "Journal", href: "#journal" },
  { label: "Sleep", href: "#sleep" },
  { label: "Pricing", href: "#pricing" },
];

const therapists = [
  {
    name: "Dr. Ava Lin", title: "Clinical Psychologist", years: 12,
    specialty: ["Anxiety", "Burnout", "CBT"], rate: 85, rating: 4.9,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces",
    bio: "Warm, direct and evidence-based. Ava helps busy professionals untangle chronic stress and build sustainable calm.",
    education: "PhD, Clinical Psychology — Stanford University",
    languages: ["English", "Mandarin"],
    approach: "Cognitive Behavioral Therapy (CBT), ACT, mindfulness-based stress reduction.",
    availability: "Mon–Thu, 9am–6pm PT",
    sessions: 1840, location: "San Francisco, CA",
  },
  {
    name: "Marcus Reyes", title: "Licensed Therapist, LMFT", years: 9,
    specialty: ["Relationships", "Grief", "Somatic"], rate: 70, rating: 4.8,
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=faces",
    bio: "Somatic and relational. Marcus creates space for grief, transitions, and the tender in-between.",
    education: "MA, Marriage & Family Therapy — USC",
    languages: ["English", "Spanish"],
    approach: "Somatic Experiencing, EFT for couples, grief-informed care.",
    availability: "Tue–Sat, 10am–8pm PT",
    sessions: 1210, location: "Los Angeles, CA",
  },
  {
    name: "Dr. Priya Shah", title: "Psychiatrist, MD", years: 15,
    specialty: ["Sleep", "Depression", "Mindfulness"], rate: 120, rating: 5.0,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces",
    bio: "Integrative psychiatry with a mindfulness lens. Priya blends medication guidance with practical daily tools.",
    education: "MD, Psychiatry — Johns Hopkins",
    languages: ["English", "Hindi", "Gujarati"],
    approach: "Integrative psychiatry, medication management, MBCT for depression.",
    availability: "Mon–Fri, 8am–4pm ET",
    sessions: 2450, location: "New York, NY",
  },
  {
    name: "Noah Bennett", title: "Mindfulness Coach", years: 7,
    specialty: ["Meditation", "Focus", "Habits"], rate: 55, rating: 4.7,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=faces",
    bio: "A gentle coach for beginners. Noah turns 'I can't meditate' into a five-minute daily practice you actually keep.",
    education: "Certified MBSR Teacher — Brown University",
    languages: ["English"],
    approach: "Habit design, tiny-practice meditation, focus & attention training.",
    availability: "Wed–Sun, 7am–3pm MT",
    sessions: 890, location: "Boulder, CO",
  },
];

const infoContent = {
  Meditation: {
    title: "Meditation",
    body: "Short, guided sessions from 3 to 30 minutes. Focus, calm, sleep and self-compassion tracks — no experience required.",
    bullets: ["50+ guided tracks", "Beginner to advanced", "New sessions weekly"],
  },
  Breathwork: {
    title: "Breathwork",
    body: "Box breathing, 4-7-8 and coherent breathing with a live animated guide to steady your nervous system in minutes.",
    bullets: ["3 core patterns", "Timer + haptics", "Great before sleep"],
  },
  Sleep: {
    title: "Sleep",
    body: "Wind-down stories, ambient soundscapes and body scans designed to quiet a racing mind at 2am.",
    bullets: ["Sleep stories", "Rain, ocean, forest", "No ads, ever"],
  },
  Journal: {
    title: "Journal",
    body: "A private space for reflection and gratitude. Everything stays on your device unless you sync.",
    bullets: ["End-to-end private", "Gratitude prompts", "Mood-linked entries"],
  },
  About: {
    title: "About us",
    body: "Entropy to Stillness was built by a small team of therapists, engineers and long-time meditators who wanted a calmer corner of the internet.",
    bullets: ["Independent & ad-free", "Human-first design", "Founded 2024"],
  },
  Research: {
    title: "Research",
    body: "We partner with clinical psychologists to ground every practice in peer-reviewed work on stress, sleep and attention.",
    bullets: ["Evidence-based tracks", "Ongoing user studies", "Open methodology"],
  },
  Careers: {
    title: "Careers",
    body: "We hire quietly and rarely. If mindful product craft is your thing, we'd love to hear from you.",
    bullets: ["Fully remote", "4-day work week", "Roles open occasionally"],
  },
  Press: {
    title: "Press",
    body: "For interviews, brand assets or story ideas, reach out and we'll get back within two business days.",
    bullets: ["press@entropytostillness.app", "Logo & assets on request", "Founder available"],
  },
  "Help center": {
    title: "Help center",
    body: "Quick answers on accounts, billing, offline mode and sync. Most questions are answered in under a minute.",
    bullets: ["Account & billing", "Download & offline", "Data & privacy"],
  },
  Privacy: {
    title: "Privacy",
    body: "Your practice is yours. We never sell data, journal entries are encrypted, and you can export or delete everything anytime.",
    bullets: ["No third-party ads", "Encrypted journals", "One-click delete"],
  },
  Terms: {
    title: "Terms",
    body: "Plain-language terms: use the app for personal wellbeing, don't abuse it, and we'll keep it running with care.",
    bullets: ["Personal, non-commercial use", "Cancel anytime", "No auto price hikes"],
  },
} as const;


const benefits = [
  { icon: Brain, title: "Sharper focus", body: "Train attention with science-backed sessions built for busy minds." },
  { icon: Heart, title: "Lower stress", body: "Guided practices ease the nervous system in under ten minutes." },
  { icon: Moon, title: "Deeper sleep", body: "Wind-down rituals, sleep stories and ambient soundscapes." },
  { icon: Sparkles, title: "Clarity daily", body: "AI-tailored reflections meet you where your day actually is." },
];

const meditations = [
  { title: "Morning Reset", cat: "Focus", dur: 7, cover: ferns, tint: "from-emerald-100/60 to-transparent",
    sound: "sunrise" as const,
    desc: "A gentle way to arrive in your day — breath, body, and one clear intention." },
  { title: "Anxious Mind", cat: "Anxiety", dur: 12, cover: sky, tint: "from-violet-100/60 to-transparent",
    sound: "ocean" as const,
    desc: "Soften racing thoughts with a grounding body scan and paced breathing." },
  { title: "Deep Rest", cat: "Sleep", dur: 20, cover: hero, tint: "from-amber-100/60 to-transparent",
    sound: "rain" as const,
    desc: "A slow drift into stillness — perfect just before bed." },
  { title: "Grateful Heart", cat: "Gratitude", dur: 9, cover: stones, tint: "from-stone-100/60 to-transparent",
    sound: "bowls" as const,
    desc: "Notice three ordinary things worth loving today." },
  { title: "Study Flow", cat: "Students", dur: 10, cover: ferns, tint: "from-emerald-100/60 to-transparent",
    sound: "forest" as const,
    desc: "Prime your attention for a single, unbroken hour of study." },
  { title: "Between Meetings", cat: "Professionals", dur: 5, cover: sky, tint: "from-sky-100/60 to-transparent",
    sound: "chime" as const,
    desc: "A quick sensory pause to reset your posture, breath and mood." },
];

type MeditationSound = "sunrise" | "ocean" | "rain" | "bowls" | "forest" | "chime";

const soundLabels: Record<MeditationSound, string> = {
  sunrise: "Warm sunrise pad + soft bells",
  ocean: "Slow ocean waves + low drone",
  rain: "Gentle rain + deep brown-noise",
  bowls: "Tibetan singing bowls",
  forest: "Forest breeze + focus tone",
  chime: "Soft wind chimes",
};

// Web Audio synthesis — no network, no assets. Returns a stop() function.
function startMeditationSound(kind: MeditationSound, volume = 0.35): () => void {
  const AC: typeof AudioContext =
    (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

  const nodes: Array<{ stop?: (t?: number) => void; disconnect: () => void }> = [];

  const makeNoise = (type: "white" | "brown" | "pink" = "white") => {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      if (type === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else if (type === "pink") { last = 0.98 * last + 0.02 * w; d[i] = last * 2; }
      else d[i] = w;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true; src.start();
    nodes.push(src);
    return src;
  };

  const tone = (freq: number, type: OscillatorType = "sine", gain = 0.08) => {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq;
    const g = ctx.createGain(); g.gain.value = gain;
    o.connect(g).connect(master);
    o.start(); nodes.push(o); nodes.push(g);
    return { o, g };
  };

  const bell = (freq: number, when: number, dur = 4) => {
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = freq;
    const g = ctx.createGain(); g.gain.value = 0;
    o.connect(g).connect(master);
    const t = ctx.currentTime + when;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.1);
  };

  if (kind === "sunrise") {
    tone(220, "sine", 0.05); tone(277.18, "sine", 0.04); tone(329.63, "sine", 0.03);
    const schedule = () => {
      for (let i = 0; i < 6; i++) bell([523.25, 659.25, 783.99][i % 3], i * 4 + Math.random() * 2, 5);
    };
    schedule();
    const iv = setInterval(schedule, 24000);
    nodes.push({ disconnect: () => clearInterval(iv) });
  } else if (kind === "ocean") {
    const n = makeNoise("pink");
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 500;
    const g = ctx.createGain(); g.gain.value = 0.5;
    n.disconnect(); n.connect(f).connect(g).connect(master);
    nodes.push(f, g);
    // wave LFO
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.12;
    const lfoG = ctx.createGain(); lfoG.gain.value = 0.4;
    lfo.connect(lfoG).connect(g.gain); lfo.start();
    nodes.push(lfo, lfoG);
    tone(80, "sine", 0.06);
  } else if (kind === "rain") {
    const n = makeNoise("white");
    const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 800;
    const g = ctx.createGain(); g.gain.value = 0.35;
    n.disconnect(); n.connect(f).connect(g).connect(master);
    nodes.push(f, g);
    const bn = makeNoise("brown");
    const bg = ctx.createGain(); bg.gain.value = 0.4;
    bn.disconnect(); bn.connect(bg).connect(master);
    nodes.push(bg);
    tone(55, "sine", 0.05);
  } else if (kind === "bowls") {
    // singing bowls — sustained partials + slow shimmer
    tone(196, "sine", 0.07); tone(261.63, "sine", 0.05); tone(392, "sine", 0.03);
    const schedule = () => {
      bell(261.63, 0, 8); bell(392, 3, 7); bell(523.25, 6, 9);
    };
    schedule();
    const iv = setInterval(schedule, 12000);
    nodes.push({ disconnect: () => clearInterval(iv) });
  } else if (kind === "forest") {
    const n = makeNoise("pink");
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1200; f.Q.value = 0.6;
    const g = ctx.createGain(); g.gain.value = 0.25;
    n.disconnect(); n.connect(f).connect(g).connect(master);
    nodes.push(f, g);
    // subtle focus tone (alpha-ish binaural)
    const l = ctx.createOscillator(); l.frequency.value = 220;
    const r = ctx.createOscillator(); r.frequency.value = 230;
    const lg = ctx.createGain(); lg.gain.value = 0.04;
    const rg = ctx.createGain(); rg.gain.value = 0.04;
    const merger = ctx.createChannelMerger(2);
    l.connect(lg).connect(merger, 0, 0);
    r.connect(rg).connect(merger, 0, 1);
    merger.connect(master);
    l.start(); r.start();
    nodes.push(l, r, lg, rg, merger);
    // occasional bird-like chirps
    const chirp = () => {
      const o = ctx.createOscillator(); o.type = "sine";
      const g2 = ctx.createGain(); g2.gain.value = 0;
      o.connect(g2).connect(master);
      const t = ctx.currentTime;
      o.frequency.setValueAtTime(1800 + Math.random() * 800, t);
      o.frequency.exponentialRampToValueAtTime(2600, t + 0.15);
      g2.gain.linearRampToValueAtTime(0.05, t + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.start(t); o.stop(t + 0.35);
    };
    const iv = setInterval(() => { if (Math.random() < 0.6) chirp(); }, 5000);
    nodes.push({ disconnect: () => clearInterval(iv) });
  } else if (kind === "chime") {
    tone(174.61, "sine", 0.04);
    const notes = [523.25, 587.33, 659.25, 783.99, 880];
    const schedule = () => {
      for (let i = 0; i < 5; i++) bell(notes[Math.floor(Math.random() * notes.length)], i * 1.5 + Math.random(), 3);
    };
    schedule();
    const iv = setInterval(schedule, 8000);
    nodes.push({ disconnect: () => clearInterval(iv) });
  }

  return () => {
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    } catch { /* noop */ }
    setTimeout(() => {
      nodes.forEach((n) => { try { n.stop?.(); } catch { /* noop */ } try { n.disconnect(); } catch { /* noop */ } });
      try { ctx.close(); } catch { /* noop */ }
    }, 500);
  };
}


const breathwork = [
  { name: "Box Breathing", pattern: [4, 4, 4, 4], desc: "Equal counts to steady the nervous system." },
  { name: "4 · 7 · 8", pattern: [4, 7, 8, 0], desc: "Slow the exhale to ease into sleep." },
  { name: "Deep Belly", pattern: [5, 2, 6, 0], desc: "A soft, restorative rhythm for stress." },
  { name: "Resonance", pattern: [5, 0, 5, 0], desc: "Balanced 6-breaths-per-minute coherence." },
];

const moods = [
  { key: "happy",   label: "Happy",   emoji: "😊" },
  { key: "calm",    label: "Calm",    emoji: "😐" },
  { key: "sad",     label: "Sad",     emoji: "😔" },
  { key: "anxious", label: "Anxious", emoji: "😰" },
  { key: "angry",   label: "Angry",   emoji: "😡" },
  { key: "tired",   label: "Tired",   emoji: "😴" },
];

const testimonials = [
  { name: "Amelia R.", role: "Designer", body: "The first app that hasn't felt like homework. It's like a quiet room I can step into." },
  { name: "Noah K.",   role: "Founder",  body: "Ten minutes in the morning changed the shape of my whole day. Genuinely." },
  { name: "Priya S.",  role: "Student",  body: "I sleep. I focus. I actually finish things. It's absurd how simple it turned out to be." },
];

const faqs = [
  { q: "Is there really a free plan?", a: "Yes — the free plan includes daily meditations, breathing tools, mood tracking and journaling forever." },
  { q: "Do I need experience with meditation?", a: "Not at all. Every session is guided, and beginner tracks are labelled clearly." },
  { q: "Can I use it offline?", a: "Premium members can download sessions and sleep stories for offline use on any device." },
  { q: "How is my data handled?", a: "Journal entries are encrypted at rest. We never sell personal data. You can export or delete everything anytime." },
];

const quotes = [
  "The quieter you become, the more you can hear.",
  "You are the sky. Everything else is just the weather.",
  "Almost everything will work again if you unplug it — including you.",
  "Feelings are much like waves; we can't stop them, we can choose which to surf.",
];

/* ---------- component ---------- */

type Session = { name: string; email: string } | null;

function Landing() {
  const [openNav, setOpenNav] = useState(false);
  const [meditation, setMeditation] = useState<(typeof meditations)[number] | null>(null);
  const [breath, setBreath] = useState<(typeof breathwork)[number] | null>(null);
  const [bubbleGameOpen, setBubbleGameOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<null | "signin" | "signup">(null);
  const [dashOpen, setDashOpen] = useState(false);
  const [therapist, setTherapist] = useState<(typeof therapists)[number] | null>(null);
  const [profile, setProfile] = useState<(typeof therapists)[number] | null>(null);
  const [pricingOpen, setPricingOpen] = useState<null | "Free" | "Premium" | "Student" | "Enterprise">(null);
  const [infoKey, setInfoKey] = useState<keyof typeof infoContent | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const [session, setSession] = useState<Session>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (initialSession) {
        setSession({
          id: initialSession.user.id,
          name: initialSession.user.user_metadata.full_name || initialSession.user.email?.split("@")[0] || "Friend",
          email: initialSession.user.email || "",
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        setSession({
          id: newSession.user.id,
          name: newSession.user.user_metadata.full_name || newSession.user.email?.split("@")[0] || "Friend",
          email: newSession.user.email || "",
        });
      } else {
        setSession(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = (s: NonNullable<Session>) => {
    localStorage.setItem("session", JSON.stringify(s));
    setSession(s);
    toast.success(`Welcome, ${s.name.split(" ")[0]}`, { description: "Your quiet space is ready." });
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Supabase signOut error:", err);
    }
    localStorage.removeItem("session");
    setSession(null);
    setDashOpen(false);
    toast("Signed out", { description: "See you soon." });
  };

  const [mood, setMood] = useState<string | null>(null);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("mood") : null;
    if (stored) setMood(stored);
  }, []);

  const logMood = async (k: string, label: string) => {
    localStorage.setItem("mood", k);
    localStorage.setItem("mood-at", new Date().toISOString());
    const hist: { k: string; at: number }[] = JSON.parse(localStorage.getItem("mood-history") || "[]");
    hist.unshift({ k, at: Date.now() });
    localStorage.setItem("mood-history", JSON.stringify(hist.slice(0, 30)));
    setMood(k);

    const { data: { session: activeSession } } = await supabase.auth.getSession();
    if (activeSession) {
      try {
        const { error } = await supabase.from("mood_logs").insert({
          user_id: activeSession.user.id,
          mood: k,
        });
        if (error) console.error("Error logging mood to Supabase:", error);
      } catch (err) {
        console.error("Supabase request failed:", err);
      }
    }

    toast.success(`Logged: ${label}`, { description: "Saved to your private mood history." });
  };

  const dailyQuote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);

  const requireAuth = (next: () => void) => {
    if (session) next();
    else { setAuthOpen("signup"); toast("Create a free account to continue"); }
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <Bubbles />
      <VisitorBanner />
      {/* NAV */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto mt-3 max-w-6xl px-4">
          <nav className="glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">Entropy&nbsp;to&nbsp;Stillness</span>
            </a>
            <div className="hidden items-center gap-7 md:flex">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {n.label}
                </a>
              ))}
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {session ? (
                <>
                  <Button variant="ghost" className="rounded-full" onClick={() => setDashOpen(true)}>
                    <LayoutDashboard className="mr-1 h-4 w-4" /> Dashboard
                  </Button>
                  <button
                    onClick={() => setDashOpen(true)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                    aria-label="Open dashboard"
                  >
                    {session.name.trim()[0]?.toUpperCase() ?? "U"}
                  </button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="rounded-full" onClick={() => setAuthOpen("signin")}>Sign in</Button>
                  <Button className="rounded-full" onClick={() => setAuthOpen("signup")}>Start free</Button>
                </>
              )}
            </div>
            <button
              aria-label="Toggle menu"
              className="md:hidden"
              onClick={() => setOpenNav((v) => !v)}
            >
              {openNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
          {openNav && (
            <div className="glass mt-2 rounded-3xl p-4 md:hidden">
              <div className="flex flex-col gap-1">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} className="rounded-xl px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpenNav(false)}>
                    {n.label}
                  </a>
                ))}
                {session ? (
                  <Button className="mt-2 rounded-full" onClick={() => { setOpenNav(false); setDashOpen(true); }}>
                    <LayoutDashboard className="mr-1 h-4 w-4" /> Dashboard
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="mt-2 rounded-full" onClick={() => { setOpenNav(false); setAuthOpen("signin"); }}>
                      Sign in
                    </Button>
                    <Button className="rounded-full" onClick={() => { setOpenNav(false); setAuthOpen("signup"); }}>
                      Start free
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>


      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-14 md:grid-cols-2 md:items-center md:pt-24">
          <div>
            <Badge className="mb-5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
              <Sparkles className="mr-1.5 h-3 w-3" /> Now with AI mindfulness coach
            </Badge>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Find calm<br />
              <span className="italic text-primary">in the chaos.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Transform stress into clarity with guided meditation, breathing,
              habit tracking, journaling, sleep support and an AI-powered
              mindfulness coach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-6" onClick={() => session ? setDashOpen(true) : setAuthOpen("signup")}>
                Start free <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6" onClick={() => {
                document.querySelector("#meditate")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Explore meditation
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[ferns, stones, sky].map((s, i) => (
                  <img key={i} src={s} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <span>Loved by <b className="text-foreground">120,000+</b> mindful humans</span>
            </div>
          </div>

          {/* hero visual */}
          <div className="relative">
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img src={hero} alt="Person meditating peacefully at sunrise — mental wellness" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Today's quote</p>
                <p className="mt-1 font-display text-lg leading-snug">"{dailyQuote}"</p>
              </div>
            </div>
            <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full bg-lavender/40 blur-2xl md:block animate-float-slow" />
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full bg-sage/50 blur-2xl md:block animate-float-slow" />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="glass rounded-3xl p-6 transition hover:-translate-y-1">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOOD TRACKER */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="glass rounded-[2rem] p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Mood tracker</p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl">How does today feel?</h2>
            </div>
            {mood && (
              <p className="text-sm text-muted-foreground">
                Last logged: <b className="text-foreground">{moods.find((m) => m.key === mood)?.label}</b>
              </p>
            )}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {moods.map((m) => {
              const active = mood === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => logMood(m.key, m.label)}
                  className={`group rounded-2xl border p-4 text-center transition ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40"
                  }`}
                >
                  <div className="text-3xl transition-transform group-hover:scale-110">{m.emoji}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{m.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEDITATION LIBRARY */}
      <section id="meditate" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Library</p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">Guided meditations</h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground sm:block">
            Short, honest sessions for anxiety, focus, sleep and everything in between. Tap any card to preview.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meditations.map((m) => (
            <button
              key={m.title}
              onClick={() => setMeditation(m)}
              className="group relative overflow-hidden rounded-3xl text-left soft-shadow"
            >
              <img src={m.cover} alt="" className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              <div className={`absolute inset-0 bg-gradient-to-t ${m.tint}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <Badge className="rounded-full bg-white/20 text-white hover:bg-white/25">{m.cat}</Badge>
                  <span>· {m.dur} min</span>
                </div>
                <h3 className="mt-2 font-display text-2xl">{m.title}</h3>
              </div>
              <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-primary backdrop-blur">
                <Play className="h-4 w-4 fill-current" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BREATHING */}
      <section id="breathe" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Breathwork</p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">
              A breath is the fastest way back to yourself.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose a rhythm. Watch the circle. Let your breath fall in step. Two minutes changes the state of your nervous system.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {breathwork.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBreath(b)}
                  className="glass group flex items-center justify-between rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center gap-2 font-medium">
                      <Wind className="h-4 w-4 text-primary" /> {b.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
          <BreathBubbleGame onExpand={() => setBubbleGameOpen(true)} />
        </div>
      </section>


      {/* JOURNAL + SLEEP */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
        <div id="journal" className="glass rounded-[2rem] p-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <h3 className="mt-4 font-display text-2xl">Private journal</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Write freely. Reflect gently. Your entries stay locked to your device with an AI summary at the end of every week.
          </p>
          <Button className="mt-6 rounded-full" onClick={() => setJournalOpen(true)}>
            Write today's entry
          </Button>
        </div>
        <div id="sleep" className="relative overflow-hidden rounded-[2rem] soft-shadow">
          <img src={sky} alt="Soft dusk sky" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-t from-primary/70 via-primary/25 to-transparent p-8 text-primary-foreground">
            <Moon className="h-6 w-6" />
            <div>
              <h3 className="font-display text-2xl">Sleep center</h3>
              <p className="mt-2 max-w-sm text-sm text-primary-foreground/90">
                Sleep stories, ambient rain, and slow wind-downs. Set a timer and let the room go quiet.
              </p>
              <Button
                variant="secondary"
                className="mt-6 rounded-full"
                onClick={() => toast("Sleep timer set for 20 minutes", { icon: <Timer className="h-4 w-4" /> })}
              >
                Start wind-down
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 rounded-[2rem] glass p-8 sm:grid-cols-4">
          {[
            { k: "120k+", v: "mindful members" },
            { k: "4.9★",  v: "average rating" },
            { k: "12 min",v: "average session" },
            { k: "42%",   v: "less reported stress" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-4xl text-primary">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl sm:text-4xl">Words from the quiet room</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-3xl p-6">
              <Quote className="h-5 w-5 text-primary" />
              <blockquote className="mt-3 text-[15px] leading-relaxed">{t.body}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* THERAPISTS */}
      <section id="therapists" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">1:1 support</p>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">Meet with a real therapist</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Vetted psychologists, therapists and mindfulness coaches. Book a
              50-minute video session at a time that suits your week.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
              <Shield className="mr-1 h-3 w-3" /> Verified licenses
            </Badge>
            <Badge className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
              <Video className="mr-1 h-3 w-3" /> Secure video
            </Badge>
            <Badge className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary">
              <GraduationCap className="mr-1 h-3 w-3" /> Evidence-based
            </Badge>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {therapists.map((t) => (
            <div key={t.name} className="glass flex flex-col rounded-3xl p-5 transition hover:-translate-y-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
                <img src={t.photo} alt={t.name} className="h-full w-full object-cover object-top" loading="lazy" referrerPolicy="no-referrer" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=400&background=e8e2d4&color=3a3a2e&bold=true`; }} />
                <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur">
                  <Star className="mr-1 inline h-3 w-3 fill-current text-primary" />{t.rating}
                </div>
              </div>
              <h3 className="mt-4 font-display text-lg">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.title} · {t.years}y</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {t.specialty.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">{s}</span>
                ))}
              </div>
              <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">{t.bio}</p>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>🌐 {t.languages.join(", ")}</span>
                <span>· {t.sessions.toLocaleString()} sessions</span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="text-sm"><b>${t.rate}</b><span className="text-muted-foreground"> /session</span></div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => setProfile(t)}>
                    View profile
                  </Button>
                  <Button size="sm" className="rounded-full" onClick={() => requireAuth(() => setTherapist(t))}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Pricing</p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl">Simple, kind pricing</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { name: "Free", price: "$0", tag: "forever", perks: ["Daily meditation", "Breathing tools", "Mood + journal"] },
            { name: "Premium", price: "$9", tag: "per month", perks: ["Full library", "Sleep stories", "Offline mode", "AI coach"], featured: true },
            { name: "Student", price: "$4", tag: "per month", perks: ["All Premium", "Verified student ID"] },
            { name: "Enterprise", price: "Talk", tag: "to us", perks: ["Team dashboards", "SSO", "Care programs"] },
          ].map((p) => (
            <div key={p.name}
              className={`glass relative rounded-3xl p-6 ${p.featured ? "ring-2 ring-primary" : ""}`}>
              {p.featured && (
                <Badge className="absolute -top-3 left-6 rounded-full">Most loved</Badge>
              )}
              <div className="font-display text-xl">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl">{p.price}</span>
                <span className="text-xs text-muted-foreground">{p.tag}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                {p.perks.map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {k}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full rounded-full"
                variant={p.featured ? "default" : "outline"}
                onClick={() => setPricingOpen(p.name as never)}
              >
                Choose {p.name}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + NEWSLETTER */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Questions, gently answered</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`i-${i}`} className="border-border">
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="glass rounded-[2rem] p-8">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="mt-4 font-display text-2xl">A quiet letter, once a week</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            One idea, one practice, one small thing worth noticing. Nothing louder than that.
          </p>
          <form
            className="mt-6 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget as HTMLFormElement;
              const email = (f.elements.namedItem("email") as HTMLInputElement).value;
              if (!email) return;
              toast.success("You're on the list", { description: `We'll write to ${email} on Sundays.` });
              f.reset();
            }}
          >
            <Input name="email" type="email" required placeholder="you@calm.inbox" className="rounded-full bg-background" />
            <Button className="rounded-full">Subscribe</Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* AI COACH FLOATING */}
      <button
        onClick={() => setCoachOpen(true)}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm text-primary-foreground soft-shadow transition hover:-translate-y-0.5"
        aria-label="Open AI coach"
      >
        <Bot className="h-4 w-4" /> AI coach
      </button>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-8">
        <div className="glass rounded-[2rem] p-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="font-display text-lg">Entropy to Stillness</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                A calmer corner of the internet.
              </p>
              <div className="mt-5 flex gap-3 text-muted-foreground">
                {[
                  { I: Facebook, n: "Facebook" },
                  { I: Twitter, n: "Twitter" },
                  { I: Instagram, n: "Instagram" },
                  { I: Youtube, n: "YouTube" },
                ].map(({ I, n }) => (
                  <button key={n} onClick={() => toast(`Follow us on ${n}`, { description: "Thanks for the love 🌿" })}
                    className="grid h-9 w-9 place-items-center rounded-full bg-secondary hover:text-foreground" aria-label={n}>
                    <I className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
            {[
              { h: "Practice", l: ["Meditation", "Breathwork", "Sleep", "Journal"] as const },
              { h: "Company",  l: ["About", "Research", "Careers", "Press"] as const },
              { h: "Support",  l: ["Help center", "Contact", "Privacy", "Terms"] as const },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-sm font-semibold">{c.h}</div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {c.l.map((x) => (
                    <li key={x}>
                      <button
                        onClick={() => {
                          if (x === "Contact") setContactOpen(true);
                          else setInfoKey(x as keyof typeof infoContent);
                        }}
                        className="hover:text-foreground">{x}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Entropy to Stillness. All rights, gently reserved.</div>
            <div className="flex items-center gap-1"><Heart className="h-3 w-3 text-primary" /> made mindfully</div>
          </div>
        </div>
      </footer>

      {/* DIALOGS */}
      {meditation && (
        <MeditationDialog m={meditation} onClose={() => setMeditation(null)} />
      )}
      {breath && <BreathDialog b={breath} onClose={() => setBreath(null)} />}
      <BubblePopDialog open={bubbleGameOpen} onOpenChange={setBubbleGameOpen} />

      <JournalDialog open={journalOpen} onOpenChange={setJournalOpen} />
      <CoachDialog open={coachOpen} onOpenChange={setCoachOpen} />
      <AuthDialog mode={authOpen} onOpenChange={(v) => setAuthOpen(v)} onAuth={signIn} />
      <DashboardDialog
        open={dashOpen}
        onOpenChange={setDashOpen}
        session={session}
        onSignOut={signOut}
        onOpenJournal={() => { setDashOpen(false); setJournalOpen(true); }}
        onOpenCoach={() => { setDashOpen(false); setCoachOpen(true); }}
        onBrowseTherapists={() => { setDashOpen(false); document.querySelector("#therapists")?.scrollIntoView({ behavior: "smooth" }); }}
      />
      <TherapistDialog therapist={therapist} onClose={() => setTherapist(null)} />
      <TherapistProfileDialog
        therapist={profile}
        onClose={() => setProfile(null)}
        onBook={(t) => { setProfile(null); requireAuth(() => setTherapist(t)); }}
      />

      <Dialog open={!!infoKey} onOpenChange={(v) => !v && setInfoKey(null)}>
        <DialogContent className="sm:max-w-md">
          {infoKey && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{infoContent[infoKey].title}</DialogTitle>
                <DialogDescription>{infoContent[infoKey].body}</DialogDescription>
              </DialogHeader>
              <ul className="mt-2 space-y-2 rounded-2xl bg-secondary p-4 text-sm">
                {infoContent[infoKey].bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <DialogFooter>
                <Button onClick={() => setInfoKey(null)}>Got it</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Contact us</DialogTitle>
            <DialogDescription>We reply within one working day. No bots.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent", { description: "We'll be in touch soon 🌿" });
              setContactOpen(false);
            }}
          >
            <Input required placeholder="Your name" />
            <Input required type="email" placeholder="you@email.com" />
            <Textarea required placeholder="How can we help?" rows={4} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setContactOpen(false)}>Cancel</Button>
              <Button type="submit">Send</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      <Dialog open={!!pricingOpen} onOpenChange={(v) => !v && setPricingOpen(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">You picked {pricingOpen}</DialogTitle>
            <DialogDescription>
              This is a demo — no card required. Confirm to unlock a full trial of the {pricingOpen} plan.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-2xl bg-secondary p-4 text-sm">
            <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-primary" /> Instant access to all mindfulness tools</div>
            <div className="mt-2 flex items-center gap-2"><Waves className="h-4 w-4 text-primary" /> Sleep stories, ambient rooms, offline mode</div>
            <div className="mt-2 flex items-center gap-2"><Bot className="h-4 w-4 text-primary" /> AI coach available 24/7</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPricingOpen(null)}>Not now</Button>
            <Button onClick={() => { toast.success(`${pricingOpen} plan activated`); setPricingOpen(null); }}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- Dialogs ---------- */

function MeditationDialog({ m, onClose }: { m: (typeof meditations)[number]; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const total = m.dur * 60;
  const stopRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((x) => (x >= total ? (setPlaying(false), 0) : x + 1)), 1000);
    return () => clearInterval(id);
  }, [playing, total]);

  useEffect(() => {
    if (playing) {
      try { stopRef.current = startMeditationSound(m.sound, volume); }
      catch { toast("Audio unavailable in this browser"); setPlaying(false); }
    }
    return () => { stopRef.current?.(); stopRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // cleanup on unmount
  useEffect(() => () => { stopRef.current?.(); }, []);

  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");
  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <div className="relative -mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden rounded-t-lg">
          <img src={m.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{m.title}</DialogTitle>
          <DialogDescription>
            {m.cat} · {m.dur} min · guided by Ava Lin
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{m.desc}</p>
        <div className="mt-1 text-xs text-muted-foreground">🎧 Soundscape: {soundLabels[m.sound]}</div>
        <div className="mt-2 rounded-2xl bg-secondary p-4">
          <div className="flex items-center justify-between">
            <Button size="icon" className="h-11 w-11 rounded-full" onClick={() => setPlaying((v) => !v)}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </Button>
            <div className="mx-4 h-1.5 flex-1 overflow-hidden rounded-full bg-background">
              <div className="h-full bg-primary transition-[width]" style={{ width: `${(t / total) * 100}%` }} />
            </div>
            <div className="tabular-nums text-sm text-muted-foreground">{mm}:{ss}</div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-14">Volume</span>
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={(e) => {
                const v = Number(e.target.value); setVolume(v);
                // restart sound at new volume if currently playing
                if (playing) { stopRef.current?.(); stopRef.current = startMeditationSound(m.sound, v); }
              }}
              className="h-1 flex-1 accent-primary"
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:justify-start">
          <Button variant="outline" onClick={() => toast("Saved to your library")}>Save</Button>
          <Button variant="outline" onClick={() => toast("Added to favourites ♡")}>Like</Button>
          <Button variant="outline" onClick={() => toast("Downloaded for offline")}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function BreathDialog({ b, onClose }: { b: (typeof breathwork)[number]; onClose: () => void }) {
  const phases = ["Inhale", "Hold", "Exhale", "Hold"] as const;
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(b.pattern[0]);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(true);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    tickRef.current = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        setPhase((p) => {
          let next = (p + 1) % 4;
          while (b.pattern[next] === 0) next = (next + 1) % 4;
          if (next === 0) setCycles((x) => x + 1);
          setCount(b.pattern[next]);
          return next;
        });
        return b.pattern[(phase + 1) % 4] || 1;
      });
    }, 1000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [running, b, phase]);

  const scale = phase === 0 ? 1 : phase === 2 ? 0.65 : phase === 1 ? 1 : 0.65;

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{b.name}</DialogTitle>
          <DialogDescription>{b.desc}</DialogDescription>
        </DialogHeader>
        <div className="my-2 grid place-items-center py-6">
          <div className="relative grid h-56 w-56 place-items-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/60 to-sky/60 blur-2xl" />
            <div
              className="relative grid h-56 w-56 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground transition-transform duration-[1000ms] ease-in-out"
              style={{ transform: `scale(${scale})` }}
            >
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest opacity-80">{phases[phase]}</div>
                <div className="font-display text-5xl tabular-nums">{count}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">Cycle {cycles + 1}</div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => { setRunning(false); toast("Session paused"); onClose(); }}>
            Finish
          </Button>
          <Button onClick={() => setRunning((v) => !v)}>
            {running ? <><Pause className="mr-1 h-4 w-4" /> Pause</> : <><Play className="mr-1 h-4 w-4" /> Resume</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function JournalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [text, setText] = useState("");
  const [gratitude, setGratitude] = useState("");
  useEffect(() => {
    if (!open) return;
    const draft = localStorage.getItem("journal-draft");
    if (draft) setText(draft);
  }, [open]);

  const save = async () => {
    if (!text.trim()) return toast.error("Write a few words first");
    const key = `journal-${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(key, JSON.stringify({ text, gratitude, at: Date.now() }));
    localStorage.removeItem("journal-draft");

    // Save to Supabase if user is logged in
    const { data: { session: activeSession } } = await supabase.auth.getSession();
    if (activeSession) {
      try {
        const { error } = await supabase.from("journals").insert({
          user_id: activeSession.user.id,
          text,
          gratitude,
        });
        if (error) console.error("Error saving journal to Supabase:", error);
      } catch (err) {
        console.error("Supabase request failed:", err);
      }
    }

    toast.success("Entry saved privately", { description: "Only you can read this." });
    setText(""); setGratitude(""); onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Today's entry</DialogTitle>
          <DialogDescription>Write freely — nobody reads this but you.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Reflection</label>
            <Textarea
              value={text}
              onChange={(e) => { setText(e.target.value); localStorage.setItem("journal-draft", e.target.value); }}
              rows={6}
              placeholder="What's alive for you today?"
              className="mt-1.5 rounded-2xl"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">One thing I'm grateful for</label>
            <Input
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="A slow coffee. A kind message. Anything."
              className="mt-1.5 rounded-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={save}>Save entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CoachDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [messages, setMessages] = useState<{ from: "you" | "coach"; text: string }[]>([
    { from: "coach", text: "Hi. I'm your mindfulness coach. Tell me how you're feeling — one word is enough." },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [messages]);

  const reply = (q: string) => {
    const s = q.toLowerCase();
    if (/(sleep|tired|insomn)/.test(s))
      return "Try the 4·7·8 breath, then a Deep Rest session. Dim the lights, put the phone in another room, and let the exhale do the work.";
    if (/(anx|panic|worr)/.test(s))
      return "Feet on the floor. Notice five things you can see. Then run one round of Box Breathing — four in, four hold, four out, four hold.";
    if (/(sad|down|low|lonely)/.test(s))
      return "You don't have to fix it. Try a 9-minute Gratitude session and write one line in your journal — just one.";
    if (/(stress|overwhelm|busy|too much)/.test(s))
      return "Close your eyes. Long exhale, twice as long as the inhale. Then a 5-minute Between Meetings reset. Small things, done gently.";
    if (/(focus|concentrat|distract)/.test(s))
      return "Set a 25-minute focus block. Start with a Morning Reset meditation, then one task, then a stretch.";
    return "I hear you. Try a slow 4-count breath, and pick one small kind thing to do next — a glass of water, a stretch, a walk.";
  };

  const send = () => {
    if (!input.trim()) return;
    const me = input.trim();
    setMessages((m) => [...m, { from: "you", text: me }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { from: "coach", text: reply(me) }]), 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] max-h-[640px] flex-col sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Bot className="h-5 w-5 text-primary" /> Mindfulness coach
          </DialogTitle>
          <DialogDescription>Gentle, private, and here whenever you need.</DialogDescription>
        </DialogHeader>
        <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-secondary p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                m.from === "you" ? "bg-primary text-primary-foreground" : "bg-background"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type how you're feeling…"
            className="rounded-full"
          />
          <Button size="icon" onClick={send} className="rounded-full"><Send className="h-4 w-4" /></Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["I'm stressed", "I can't sleep", "I have anxiety", "I'm overthinking"].map((q) => (
            <button key={q} onClick={() => { setInput(q); setTimeout(send, 0); }}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground hover:bg-accent">
              {q}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Therapist profile ---------- */

function TherapistProfileDialog({
  therapist, onClose, onBook,
}: {
  therapist: (typeof therapists)[number] | null;
  onClose: () => void;
  onBook: (t: (typeof therapists)[number]) => void;
}) {
  return (
    <Dialog open={!!therapist} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl rounded-3xl">
        {therapist && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <img src={therapist.photo} alt={therapist.name} className="h-16 w-16 rounded-full object-cover" />
                <div className="min-w-0">
                  <DialogTitle className="font-display text-2xl">{therapist.name}</DialogTitle>
                  <DialogDescription>
                    {therapist.title} · {therapist.years} years · {therapist.location}
                  </DialogDescription>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <Star className="mr-1 inline h-3 w-3 fill-current text-primary" />
                    {therapist.rating} · {therapist.sessions.toLocaleString()} sessions
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-secondary/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
                <p className="mt-1 text-sm">{therapist.bio}</p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Approach</p>
                <p className="mt-1 text-sm">{therapist.approach}</p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Education</p>
                <p className="mt-1 text-sm">{therapist.education}</p>
              </div>
              <div className="rounded-2xl bg-secondary/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Availability</p>
                <p className="mt-1 text-sm">{therapist.availability}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {therapist.specialty.map((s) => (
                <span key={s} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                  {s}
                </span>
              ))}
              {therapist.languages.map((l) => (
                <span key={l} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                  🌐 {l}
                </span>
              ))}
            </div>

            <DialogFooter className="mt-4 flex-row items-center justify-between gap-2 sm:justify-between">
              <div className="text-sm">
                <b>${therapist.rate}</b>
                <span className="text-muted-foreground"> / 50-min session</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full" onClick={onClose}>Close</Button>
                <Button className="rounded-full" onClick={() => onBook(therapist)}>
                  <Calendar className="mr-2 h-4 w-4" /> Book session
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Live visitor banner ---------- */

function VisitorBanner() {
  const [visits, setVisits] = useState<number | null>(null);
  const [loc, setLoc] = useState<string>("Locating…");
  const [detected, setDetected] = useState<string>("");
  const [online, setOnline] = useState<number>(1);
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [customLoc, setCustomLoc] = useState<string>(() =>
    typeof window === "undefined" ? "" : localStorage.getItem("visitor-location") || "",
  );
  const [draft, setDraft] = useState(customLoc);
  const [savedLocs, setSavedLocs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("visitor-locations") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    const seed = 12483;
    const bumpKey = "visits-bumped-at";
    const stored = Number(localStorage.getItem("visits-total") || "0") || seed;
    const last = Number(localStorage.getItem(bumpKey) || "0");
    const now = Date.now();
    const next = now - last > 30 * 60 * 1000 ? stored + 1 : stored;
    localStorage.setItem("visits-total", String(next));
    localStorage.setItem(bumpKey, String(now));
    setVisits(next);

    setOnline(30 + Math.floor(Math.random() * 40));
    const t = setInterval(
      () => setOnline((n) => Math.max(12, Math.min(120, n + (Math.random() > 0.5 ? 1 : -1)))),
      4000,
    );

    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return setDetected("Somewhere calm");
        const city = d.city || d.region || "";
        const country = d.country_name || d.country || "";
        setDetected([city, country].filter(Boolean).join(", ") || "Somewhere calm");
      })
      .catch(() => setDetected("Somewhere calm"));

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setLoc(customLoc || detected || "Locating…");
  }, [customLoc, detected]);

  const saveLocation = (value: string) => {
    const v = value.trim();
    setCustomLoc(v);
    if (v) {
      localStorage.setItem("visitor-location", v);
      const next = Array.from(new Set([v, ...savedLocs])).slice(0, 6);
      setSavedLocs(next);
      localStorage.setItem("visitor-locations", JSON.stringify(next));
      toast.success("Location updated", { description: v });
    } else {
      localStorage.removeItem("visitor-location");
      toast.message("Using detected location");
    }
  };

  if (dismissed) return null;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-full px-4 py-2 text-xs text-muted-foreground">
          <button
            onClick={() => { setDraft(customLoc); setOpen(true); }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-left hover:text-foreground transition"
            aria-label="Open live visitor details"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <b className="text-foreground">{online}</b> people finding calm right now
            </span>
            <span>
              <b className="text-foreground">{visits?.toLocaleString() ?? "…"}</b> total visits
            </span>
            <span>📍 <b className="text-foreground">{loc}</b> <span className="underline decoration-dotted">edit</span></span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-full px-2 py-0.5 text-muted-foreground hover:bg-secondary"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Live activity</DialogTitle>
            <DialogDescription>
              A real-time pulse of the calm community and where you're joining from.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-secondary p-3">
              <div className="text-2xl font-display text-primary">{online}</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">online now</div>
            </div>
            <div className="rounded-2xl bg-secondary p-3">
              <div className="text-2xl font-display">{visits?.toLocaleString() ?? "…"}</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">total visits</div>
            </div>
            <div className="rounded-2xl bg-secondary p-3">
              <div className="text-2xl font-display">🌿</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">live</div>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Your location</label>
            <div className="flex gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={detected || "e.g. Mumbai, India"}
                className="rounded-full"
              />
              <Button className="rounded-full" onClick={() => { saveLocation(draft); setOpen(false); }}>
                Save
              </Button>
            </div>
            {detected && (
              <p className="text-[11px] text-muted-foreground">
                Detected: <b className="text-foreground">{detected}</b>
              </p>
            )}
            {savedLocs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {savedLocs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setDraft(l); saveLocation(l); setOpen(false); }}
                    className="rounded-full border px-2.5 py-1 text-xs hover:bg-secondary"
                  >
                    📍 {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => { saveLocation(""); setDraft(""); }}
            >
              Use detected
            </Button>
            <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------- Inline Breath + Bubble Pop game ---------- */

function BreathBubbleGame({ onExpand }: { onExpand: () => void }) {
  type B = { id: number; x: number; y: number; size: number; hue: number; born: number; life: number };
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<B[]>([]);
  const idRef = useRef(0);

  // Breath cycle: 4s in, 2s hold, 6s out
  useEffect(() => {
    const cycle = [
      { p: "in" as const, ms: 4000 },
      { p: "hold" as const, ms: 2000 },
      { p: "out" as const, ms: 6000 },
    ];
    let i = 0;
    setPhase(cycle[0].p);
    const tick = () => {
      i = (i + 1) % cycle.length;
      setPhase(cycle[i].p);
      timer = window.setTimeout(tick, cycle[i].ms);
    };
    let timer = window.setTimeout(tick, cycle[0].ms);
    return () => clearTimeout(timer);
  }, []);

  // Spawn bubbles continuously; hue reflects phase
  useEffect(() => {
    const spawn = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > 8) return prev;
        const hue = phase === "in" ? 200 : phase === "out" ? 150 : 270;
        const b: B = {
          id: ++idRef.current,
          x: 8 + Math.random() * 78,
          y: 10 + Math.random() * 70,
          size: 42 + Math.random() * 46,
          hue,
          born: Date.now(),
          life: 2600 + Math.random() * 1400,
        };
        return [...prev, b];
      });
    }, 700);
    return () => clearInterval(spawn);
  }, [phase]);

  // Expire bubbles
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => prev.filter((b) => now - b.born < b.life));
    }, 250);
    return () => clearInterval(id);
  }, []);

  const pop = (id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  const label = phase === "in" ? "Breathe In" : phase === "out" ? "Breathe Out" : "Hold";
  const scale = phase === "in" ? "scale-100" : phase === "out" ? "scale-75" : "scale-90";

  return (
    <div className="glass relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] p-4">
      <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-b from-sky/25 via-accent/20 to-lavender/25" />
      {/* Bubbles */}
      {bubbles.map((b) => {
        const age = Date.now() - b.born;
        const opacity = Math.max(0.25, 1 - age / b.life);
        return (
          <button
            key={b.id}
            onClick={() => pop(b.id)}
            aria-label="Pop bubble"
            className="absolute rounded-full transition-transform hover:scale-90 active:scale-50"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              opacity,
              background: `radial-gradient(circle at 30% 30%, hsla(${b.hue},85%,90%,0.95), hsla(${b.hue},70%,60%,0.55) 60%, hsla(${b.hue},60%,45%,0.3))`,
              boxShadow: `inset -4px -6px 12px hsla(${b.hue},60%,30%,0.25), 0 6px 16px hsla(${b.hue},60%,40%,0.25)`,
            }}
          />
        );
      })}

      {/* Breathing orb */}
      <div
        className={`relative z-[1] grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-2xl transition-transform duration-[3500ms] ease-in-out ${scale}`}
      >
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest opacity-80">Follow the orb</div>
          <div className="font-display text-2xl">{label}</div>
        </div>
      </div>

      {/* HUD */}
      <div className="absolute left-4 top-4 z-[2] rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
        <span className="text-muted-foreground">Popped</span> <b className="text-primary">{score}</b>
      </div>
      <button
        onClick={onExpand}
        className="absolute bottom-4 right-4 z-[2] flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur hover:bg-background"
      >
        <Waves className="h-3.5 w-3.5 text-primary" /> Fullscreen
      </button>
    </div>
  );
}


/* ---------- Bubbles background ---------- */


function Bubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => {
        const size = 24 + ((i * 37) % 90);
        const left = (i * 73) % 100;
        const dur = 18 + ((i * 11) % 22);
        const delay = -((i * 5) % dur);
        const hues = ["var(--sage)", "var(--lavender)", "var(--sky)", "var(--accent)"];
        const hue = hues[i % hues.length];
        return { size, left, dur, delay, hue, id: i };
      }),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="animate-bubble absolute bottom-[-120px] rounded-full blur-[2px]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, white 70%, transparent), color-mix(in oklab, ${b.hue} 60%, transparent))`,
            boxShadow: `inset 0 0 12px color-mix(in oklab, white 40%, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Auth (sign in / sign up) ---------- */

function AuthDialog({
  mode, onOpenChange, onAuth,
}: {
  mode: null | "signin" | "signup";
  onOpenChange: (v: null | "signin" | "signup") => void;
  onAuth: (s: { id?: string; name: string; email: string }) => void;
}) {
  const isSignup = mode === "signup";
  return (
    <Dialog open={!!mode} onOpenChange={(v) => !v && onOpenChange(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isSignup ? "Create your quiet space" : "Welcome back"}
          </DialogTitle>
          <DialogDescription>
            {isSignup
              ? "Free forever plan. Meditations, journal and mood tracking included."
              : "Sign in to open your dashboard, journal and saved sessions."}
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            const email = String(f.get("email") || "");
            const password = String(f.get("password") || "");
            const name = String(f.get("name") || email.split("@")[0] || "friend");

            try {
              if (isSignup) {
                const { data, error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: {
                      full_name: name,
                    },
                  },
                });
                if (error) throw error;
                toast.success("Account created!", { description: "You are now logged in." });
                if (data.session) {
                  onAuth({
                    id: data.session.user.id,
                    name: data.session.user.user_metadata.full_name || name,
                    email: data.session.user.email || email,
                  });
                }
              } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                  email,
                  password,
                });
                if (error) throw error;
                toast.success("Signed in successfully!");
                if (data.session) {
                  onAuth({
                    id: data.session.user.id,
                    name: data.session.user.user_metadata.full_name || name,
                    email: data.session.user.email || email,
                  });
                }
              }
              onOpenChange(null);
            } catch (err: any) {
              toast.error(err.message || "Authentication failed. Please try again.");
            }
          }}
        >
          {isSignup && (
            <Input name="name" placeholder="Your name" required className="rounded-full" />
          )}
          <Input name="email" type="email" placeholder="you@calm.inbox" required className="rounded-full" />
          <Input name="password" type="password" placeholder="Password" required minLength={4} className="rounded-full" />
          <Button className="w-full rounded-full">
            {isSignup ? "Create account" : "Sign in"}
          </Button>
          <div className="relative py-2 text-center text-xs text-muted-foreground">
            <span className="relative z-10 bg-background px-2">or</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full"
            onClick={async () => {
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: window.location.origin + "/",
                  },
                });
                if (error) throw error;
              } catch (err: any) {
                toast.error(err.message || "Google sign-in failed.");
              }
            }}
          >
            Continue with Google
          </Button>
          <p className="pt-1 text-center text-xs text-muted-foreground">
            {isSignup ? "Already have an account? " : "New here? "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => onOpenChange(isSignup ? "signin" : "signup")}
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Dashboard ---------- */

function DashboardDialog({
  open, onOpenChange, session, onSignOut, onOpenJournal, onOpenCoach, onBrowseTherapists,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  session: { name: string; email: string } | null;
  onSignOut: () => void;
  onOpenJournal: () => void;
  onOpenCoach: () => void;
  onBrowseTherapists: () => void;
}) {
  const [stats, setStats] = useState({ entries: 0, moods: 0, streak: 0, lastMood: null as string | null });
  const [history, setHistory] = useState<{ k: string; at: number }[]>([]);
  const [bookingsList, setBookingsList] = useState<{ therapist: string; slot: string; format: string; at: number }[]>([]);

  useEffect(() => {
    if (!open) return;

    const loadStatsAndBookings = async () => {
      // 1. Initial load from local storage
      const hist: { k: string; at: number }[] = JSON.parse(localStorage.getItem("mood-history") || "[]");
      let entriesCount = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || "";
        if (key.startsWith("journal-")) entriesCount++;
      }
      const days = new Set(hist.map((h) => new Date(h.at).toDateString()));
      setHistory(hist.slice(0, 8));

      const localBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookingsList(localBookings);

      setStats({
        entries: entriesCount,
        moods: hist.length,
        streak: days.size,
        lastMood: hist[0]?.k ?? localStorage.getItem("mood"),
      });

      // 2. Load from Supabase if user is logged in
      const { data: { session: activeSession } } = await supabase.auth.getSession();
      if (activeSession) {
        try {
          const { count: journalCount, error: journalErr } = await supabase
            .from("journals")
            .select("*", { count: "exact", head: true })
            .eq("user_id", activeSession.user.id);

          const { data: moodsData, error: moodsErr } = await supabase
            .from("mood_logs")
            .select("*")
            .eq("user_id", activeSession.user.id)
            .order("created_at", { ascending: false })
            .limit(30);

          const { data: bookingsData, error: bookingsErr } = await supabase
            .from("bookings")
            .select("*")
            .eq("user_id", activeSession.user.id)
            .order("created_at", { ascending: false });

          if (!journalErr && !moodsErr && moodsData) {
            const mappedHistory = moodsData.map((m: any) => ({
              k: m.mood,
              at: new Date(m.created_at).getTime(),
            }));
            const dbDays = new Set(mappedHistory.map((h) => new Date(h.at).toDateString()));
            setHistory(mappedHistory.slice(0, 8));
            setStats({
              entries: journalCount || 0,
              moods: mappedHistory.length,
              streak: dbDays.size,
              lastMood: mappedHistory[0]?.k ?? null,
            });
          }

          if (!bookingsErr && bookingsData) {
            const mappedBookings = bookingsData.map((b: any) => ({
              therapist: b.therapist_name,
              slot: b.slot,
              format: b.format,
              at: new Date(b.created_at).getTime(),
            }));
            setBookingsList(mappedBookings);
          }
        } catch (e) {
          console.error("Error loading stats from Supabase:", e);
        }
      }
    };

    loadStatsAndBookings();
  }, [open]);

  const initials = session?.name?.trim()[0]?.toUpperCase() ?? "U";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {initials}
            </div>
            <div>
              <DialogTitle className="font-display text-2xl">
                Hi {session?.name?.split(" ")[0] ?? "there"}
              </DialogTitle>
              <DialogDescription>{session?.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 grid grid-cols-3 gap-3">
          {[
            { k: stats.entries, v: "Journal entries", icon: BookOpen },
            { k: stats.moods, v: "Moods logged", icon: Heart },
            { k: stats.streak, v: "Active days", icon: Trophy },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-4 text-center">
              <s.icon className="mx-auto h-4 w-4 text-primary" />
              <div className="mt-1 font-display text-2xl">{s.k}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Recent moods</div>
          {history.length ? (
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => {
                const m = moods.find((x) => x.key === h.k);
                return (
                  <div key={i} className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs">
                    <span>{m?.emoji}</span>
                    <span>{m?.label}</span>
                    <span className="text-muted-foreground">· {new Date(h.at).toLocaleDateString()}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No moods logged yet — tap one on the tracker to begin.</p>
          )}
        </div>

        {bookingsList.length > 0 && (
          <div className="mt-4 rounded-2xl bg-secondary p-4">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Therapist Bookings</div>
            <div className="space-y-2">
              {bookingsList.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-background px-3 py-2 text-xs">
                  <div>
                    <span className="font-semibold text-foreground">{b.therapist}</span>
                    <span className="mx-1 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{b.slot}</span>
                  </div>
                  <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground">
                    {b.format}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button variant="outline" className="justify-start rounded-2xl" onClick={onOpenJournal}>
            <BookOpen className="mr-2 h-4 w-4" /> Write in journal
          </Button>
          <Button variant="outline" className="justify-start rounded-2xl" onClick={onOpenCoach}>
            <Bot className="mr-2 h-4 w-4" /> Talk to AI coach
          </Button>
          <Button variant="outline" className="justify-start rounded-2xl" onClick={onBrowseTherapists}>
            <UserRound className="mr-2 h-4 w-4" /> Browse therapists
          </Button>
          <Button variant="outline" className="justify-start rounded-2xl" onClick={() => toast("Sleep timer set for 20 minutes", { icon: <Timer className="h-4 w-4" /> })}>
            <Moon className="mr-2 h-4 w-4" /> Start wind-down
          </Button>
        </div>

        <DialogFooter className="mt-4 sm:justify-between">
          <Button variant="ghost" onClick={onSignOut}>
            <LogOut className="mr-1 h-4 w-4" /> Sign out
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Therapist booking ---------- */

function TherapistDialog({
  therapist, onClose,
}: {
  therapist: (typeof therapists)[number] | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"pick" | "done">("pick");
  const [slot, setSlot] = useState<string | null>(null);
  const [format, setFormat] = useState<"video" | "chat">("video");

  useEffect(() => {
    if (therapist) { setStep("pick"); setSlot(null); setFormat("video"); }
  }, [therapist]);

  const slots = useMemo(() => {
    const out: string[] = [];
    const now = new Date();
    for (let d = 1; d <= 3; d++) {
      const day = new Date(now);
      day.setDate(now.getDate() + d);
      ["09:00", "13:30", "17:00"].forEach((t) => out.push(`${day.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })} · ${t}`));
    }
    return out;
  }, [therapist]);

  const confirm = async () => {
    if (!slot) return toast.error("Pick a time first");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.unshift({ therapist: therapist?.name, slot, format, at: Date.now() });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    const { data: { session: activeSession } } = await supabase.auth.getSession();
    if (activeSession) {
      try {
        const { error } = await supabase.from("bookings").insert({
          user_id: activeSession.user.id,
          therapist_name: therapist?.name,
          slot,
          format,
        });
        if (error) console.error("Error saving booking to Supabase:", error);
      } catch (err) {
        console.error("Supabase request failed:", err);
      }
    }

    setStep("done");
    toast.success("Session booked", { description: `${therapist?.name} · ${slot}` });
  };

  return (
    <Dialog open={!!therapist} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        {therapist && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img src={therapist.photo} alt={therapist.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <DialogTitle className="font-display text-2xl">{therapist.name}</DialogTitle>
                  <DialogDescription>
                    {therapist.title} · ${therapist.rate}/session ·
                    <Star className="mx-1 inline h-3 w-3 fill-current text-primary" />{therapist.rating}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {step === "pick" ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{therapist.bio}</p>

                <div>
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Session format</div>
                  <div className="flex gap-2">
                    {(["video", "chat"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm capitalize ${
                          format === f ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        {f === "video" ? <Video className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground">
                    <Calendar className="h-3 w-3" /> Available times
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={`rounded-xl border px-3 py-2 text-left text-xs ${
                          slot === s ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  <Button onClick={confirm}>Confirm booking</Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="space-y-4 py-2 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl">You're booked in</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {slot} · {format === "video" ? "Video session" : "Chat session"} with {therapist.name}. We'll email a reminder.
                  </p>
                </div>
                <DialogFooter className="sm:justify-center">
                  <Button onClick={onClose}>Done</Button>
                </DialogFooter>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ------------ Bubble Pop mini-game ------------ */

type Bubble = { id: number; x: number; y: number; size: number; hue: number; born: number; life: number };

function BubblePopDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const DURATION = 45; // seconds
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [time, setTime] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const idRef = useRef(0);

  // Reset when opening
  useEffect(() => {
    if (open) {
      setScore(0);
      setMissed(0);
      setTime(DURATION);
      setBubbles([]);
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [open]);

  // Countdown
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // Spawn bubbles
  useEffect(() => {
    if (!running) return;
    const spawn = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length > 10) return prev;
        const size = 40 + Math.random() * 50;
        const b: Bubble = {
          id: ++idRef.current,
          x: Math.random() * 88,
          y: Math.random() * 82,
          size,
          hue: [180, 200, 220, 260, 140, 160][Math.floor(Math.random() * 6)],
          born: Date.now(),
          life: 2200 + Math.random() * 1600,
        };
        return [...prev, b];
      });
    }, 550);
    return () => clearInterval(spawn);
  }, [running]);

  // Expire bubbles (missed)
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => {
        const alive: Bubble[] = [];
        let expired = 0;
        for (const b of prev) {
          if (now - b.born > b.life) expired++;
          else alive.push(b);
        }
        if (expired) setMissed((m) => m + expired);
        return alive;
      });
    }, 200);
    return () => clearInterval(id);
  }, [running]);

  const pop = (id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  const restart = () => {
    setScore(0);
    setMissed(0);
    setTime(DURATION);
    setBubbles([]);
    setRunning(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Bubble Pop</DialogTitle>
          <DialogDescription>
            Pop bubbles to calm a busy mind. Breathe slowly as you play — no score is a bad score.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-2 text-sm">
          <div><span className="text-muted-foreground">Popped</span> <b className="text-primary">{score}</b></div>
          <div><span className="text-muted-foreground">Missed</span> <b>{missed}</b></div>
          <div className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> {time}s</div>
        </div>

        <div className="relative mt-3 h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky/30 via-accent/20 to-lavender/20 border">
          {bubbles.map((b) => {
            const age = Date.now() - b.born;
            const opacity = Math.max(0.2, 1 - age / b.life);
            return (
              <button
                key={b.id}
                onClick={() => pop(b.id)}
                aria-label="Pop bubble"
                className="absolute rounded-full transition-transform hover:scale-95 active:scale-75"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: b.size,
                  height: b.size,
                  opacity,
                  background: `radial-gradient(circle at 30% 30%, hsla(${b.hue},80%,88%,0.95), hsla(${b.hue},70%,60%,0.55) 60%, hsla(${b.hue},60%,45%,0.3))`,
                  boxShadow: `inset -4px -6px 12px hsla(${b.hue},60%,30%,0.25), 0 6px 16px hsla(${b.hue},60%,40%,0.25)`,
                }}
              />
            );
          })}
          {!running && time === 0 && (
            <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
              <div className="text-center">
                <div className="font-display text-2xl">Nice breathing.</div>
                <div className="mt-1 text-sm text-muted-foreground">You popped {score} bubbles.</div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={restart}>{time === 0 ? "Play again" : "Restart"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* Unused imports kept for clarity of intent; tree-shaken away. */
void Sun; void CloudRain; void ChevronDown;
