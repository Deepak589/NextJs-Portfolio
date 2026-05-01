"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BrainCircuit,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Rocket,
  Server,
  Shield,
  Sparkles,
} from "lucide-react";

import { RadialOrbitalTimeline, type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { EtherealShadow } from "@/components/ui/etheral-shadow";
import { SpecialText } from "@/components/ui/special-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Backend Developer",
    date: "Mar 2022 – Sep 2024",
    content:
      "Delivered production insurance software for North American P&C carriers, working across PL/SQL-heavy data layers, Java services, and OneShield workflows.",
    category: "ValueMomentum",
    icon: Server,
    relatedIds: [2, 3],
    status: "completed",
    energy: 92,
    bullets: [
      "Built and maintained PL/SQL stored procedures and Java services on the OneShield platform.",
      "Developed quoting, binding, and renewal modules used in policy lifecycle management.",
      "Optimised database queries and release workflows, improving response times by roughly 35%.",
      "Collaborated across Agile sprint teams with onshore and offshore stakeholders.",
    ],
  },
  {
    id: 2,
    title: "ML Intern",
    date: "Jun 2019 – Jul 2019",
    content:
      "Worked on applied machine learning experiments through the SmartBridge x IBM internship, focusing on model building, exploratory analysis, and reporting.",
    category: "SmartBridge × IBM",
    icon: BrainCircuit,
    relatedIds: [1, 4],
    status: "completed",
    energy: 74,
    bullets: [
      "Built classification models using IBM Watson Studio and scikit-learn.",
      "Performed EDA, feature engineering, and model comparison on real-world datasets.",
      "Delivered project results and final presentation to mentors and program leads.",
    ],
  },
  {
    id: 3,
    title: "Resource Manager",
    date: "2018 – 2020",
    content:
      "Handled resource coordination and operations support, building the early communication and delivery habits that later translated well into engineering teamwork.",
    category: "MeritTrac",
    icon: Shield,
    relatedIds: [1],
    status: "completed",
    energy: 61,
    bullets: [
      "Coordinated scheduling and execution support across teams.",
      "Improved process visibility and stakeholder communication under tight delivery timelines.",
      "Built a strong foundation in execution discipline before moving fully into software.",
    ],
  },
  {
    id: 4,
    title: "Data Science MSc",
    date: "Sep 2025 – Present",
    content:
      "Currently deepening my ML, statistics, and AI systems practice at the University of Europe for Applied Sciences in Potsdam.",
    category: "UE Potsdam",
    icon: GraduationCap,
    relatedIds: [2, 5],
    status: "in-progress",
    energy: 86,
    bullets: [
      "Exploring recommender systems, computer vision, and multi-agent architectures.",
      "Connecting production engineering experience with research-oriented ML workflows.",
      "Building portfolio projects that bridge backend systems and intelligent automation.",
    ],
  },
  {
    id: 5,
    title: "AI Workflow Builder",
    date: "Now",
    content:
      "Pushing deeper into practical AI products by combining APIs, prompt workflows, retrieval, and automation patterns that feel shippable, not just demoable.",
    category: "Current Focus",
    icon: Sparkles,
    relatedIds: [4],
    status: "in-progress",
    energy: 88,
    bullets: [
      "Experimenting with agentic patterns, RAG pipelines, and AI-assisted product experiences.",
      "Designing systems that are measurable, reliable, and friendly to real users.",
      "Using this portfolio as a living surface for backend plus ML storytelling.",
    ],
  },
];

const projectCards = [
  {
    title: "NutriMind Recommendation Platform",
    description:
      "An ML-powered food recommendation concept that blends user preferences, health signals, and explainable ranking logic into personalised suggestions.",
    tags: ["Python", "Recommenders", "FastAPI", "Postgres"],
    accent: "from-blue-400/30 via-violet-400/15 to-transparent",
  },
  {
    title: "Insurance Workflow Optimisation",
    description:
      "A backend systems case study grounded in production work: schema-heavy workflows, performance tuning, and domain-driven release execution for enterprise insurance software.",
    tags: ["PL/SQL", "Java", "OneShield", "Enterprise"],
    accent: "from-cyan-400/24 via-sky-400/12 to-transparent",
  },
  {
    title: "AI Operations Assistant",
    description:
      "A portfolio direction focused on AI-powered workflows: retrieval, summarisation, and task orchestration for operational teams that need speed without losing trust.",
    tags: ["OpenAI API", "RAG", "Agents", "Automation"],
    accent: "from-fuchsia-400/22 via-indigo-400/12 to-transparent",
  },
];

const skills = [
  {
    title: "Languages & Backend",
    items: ["Python", "Java", "PL/SQL", "SQL", "FastAPI", "REST APIs"],
  },
  {
    title: "Data & ML",
    items: ["Pandas", "NumPy", "scikit-learn", "BERT", "Computer Vision", "EDA"],
  },
  {
    title: "Platforms & Tools",
    items: ["Docker", "Git", "PostgreSQL", "Redis", "OneShield", "IBM Watson"],
  },
  {
    title: "AI & Recommenders",
    items: ["LangChain", "OpenAI API", "RAG", "Collaborative Filtering", "Prompt Design"],
  },
];

const education = [
  {
    title: "MSc Data Science",
    org: "University of Europe for Applied Sciences",
    meta: "Potsdam, Germany",
    date: "Sep 2025 – Present",
    detail: "Focus on machine learning, statistical learning, and AI applications.",
  },
  {
    title: "BTech Computer Science & Engineering",
    org: "JNTU Affiliated College",
    meta: "India",
    date: "Jun 2018 – Jul 2022",
    detail: "Graduated with a GPA of 6.23 / 10.",
  },
];

const certifications = [
  { title: "PL/SQL Developer Certified", issuer: "Oracle", year: "2022" },
  { title: "Core Java Certified", issuer: "Oracle", year: "2021" },
  { title: "OneShield Platform Certified", issuer: "ValueMomentum", year: "2022" },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal='true']"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

export function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTimelineId, setSelectedTimelineId] = useState(timelineData[0].id);
  const [progress, setProgress] = useState(0);
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(scrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedExperience = useMemo(
    () => timelineData.find((item) => item.id === selectedTimelineId) ?? timelineData[0],
    [selectedTimelineId],
  );

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none h-full w-full">
        <EtherealShadow
          color="rgba(59, 99, 200, 0.85)"
          animation={{ scale: 80, speed: 85 }}
          noise={{ opacity: 0.8, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      <div
        className="fixed left-0 top-0 z-[9997] h-[2px] bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="#hero" className="font-mono-display text-sm font-semibold tracking-widest text-white">
            DK<span className="text-blue-400">.</span>
          </a>

          <ul className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-mono-display text-xs uppercase tracking-widest text-slate-400 transition-colors duration-200 hover:text-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="font-mono-display text-xs uppercase tracking-widest text-slate-300 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-black/85 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-mono-display text-xs uppercase tracking-widest text-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      <main id="main-content" className="relative z-10">
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24"
        >
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(60,100,220,0.18)_0%,transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p
              data-reveal="true"
              className="font-mono-display mb-6 text-xs uppercase tracking-[0.4em] text-blue-400/80"
            >
              Portfolio
            </p>

            <div data-reveal="true" className="mb-5 flex flex-wrap items-center justify-center gap-4">
              <h1 className="font-display text-[clamp(3.8rem,12vw,7.8rem)] leading-none tracking-[0.12em] text-white">
                <SpecialText speed={18}>DEEPAK</SpecialText>
              </h1>
              <h1 className="font-display text-[clamp(3.8rem,12vw,7.8rem)] leading-none tracking-[0.12em] text-white">
                <SpecialText speed={18} delay={0.2}>
                  KATUKURI
                </SpecialText>
              </h1>
            </div>

            <div data-reveal="true" className="mb-8 flex items-center justify-center gap-2">
              <span className="font-mono-display text-base text-slate-300">&gt;_</span>
              <SpecialText
                className="text-base text-slate-200"
                speed={24}
                delay={0.5}
                inView
              >
                Backend engineer • Data science graduate student • AI workflow builder
              </SpecialText>
            </div>

            <p data-reveal="true" className="mx-auto mb-10 max-w-2xl text-base leading-8 text-slate-300">
              Backend Software Engineer with 2.8+ years at ValueMomentum working across PL/SQL,
              Java, and OneShield. Now pursuing MSc Data Science in Potsdam while building ML and
              AI-powered systems that are practical, measurable, and production-minded.
            </p>

            <div data-reveal="true" className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>

            <div
              data-reveal="true"
              className="mt-6 flex flex-wrap items-center justify-center gap-4 font-mono-display text-xs text-slate-400"
            >
              <span>Available for backend, ML, and AI workflow roles</span>
              <span className="hidden text-white/20 sm:inline">/</span>
              <a href="mailto:deepakkatukuri@gmail.com" className="transition-colors hover:text-white">
                Email
              </a>
              <a
                href="https://github.com/Deepak589"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/deepak-katukuri"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div
            data-reveal="true"
            className="relative z-10 mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              ["2.8+", "Years Experience"],
              ["4", "ML Projects"],
              ["98%", "Model Accuracy"],
              ["3", "Certifications"],
            ].map(([value, label]) => (
              <div key={label} className="glass-card rounded-2xl p-4 text-center">
                <div className="font-display text-4xl tracking-[0.05em] text-white">{value}</div>
                <div className="mt-1 font-mono-display text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="section-kicker">
            <span>01</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            About Me
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div data-reveal="true" className="space-y-5 text-slate-300">
              <p className="leading-8">
                I&apos;m a backend-focused software engineer turned data scientist. I spent 2.8
                years at <strong className="text-white">ValueMomentum</strong> building insurance
                policy management systems using <strong className="text-white">PL/SQL, Java</strong>
                , and the <strong className="text-white">OneShield</strong> platform for P&amp;C
                carriers across North America.
              </p>
              <p className="leading-8">
                I&apos;m now channelling that engineering rigour into machine learning, pursuing an
                <strong className="text-white"> MSc in Data Science</strong> at the University of
                Europe for Applied Sciences in Potsdam, Germany. My interests sit at the
                intersection of recommender systems, computer vision, and multi-agent AI systems.
              </p>
              <p className="leading-8">
                Outside of code I enjoy long runs, chess puzzles, and hunting for good coffee shops
                in Potsdam.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mail, label: "Email", value: "deepakkatukuri@gmail.com" },
                { icon: MapPin, label: "Location", value: "Potsdam, Germany" },
                {
                  icon: GraduationCap,
                  label: "Degree",
                  value: "MSc Data Science (ongoing)",
                },
                { icon: Rocket, label: "Focus", value: "Backend + ML + AI workflows" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  data-reveal="true"
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-blue-300">
                    <Icon className="h-4 w-4" />
                    <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-blue-300/90">
                      {label}
                    </p>
                  </div>
                  <p className="text-sm text-slate-200">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <div className="section-kicker">
            <span>02</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Work Experience
          </h2>
          <div className="mt-10">
            <RadialOrbitalTimeline
              timelineData={timelineData}
              selectedId={selectedTimelineId}
              onSelect={(item) => setSelectedTimelineId(item.id)}
            />
          </div>
          <div data-reveal="true" className="mt-6 text-right font-mono-display text-xs text-slate-500">
            Current spotlight: {selectedExperience.title}
          </div>
        </section>

        <section id="projects" className="section-shell">
          <div className="section-kicker">
            <span>03</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Featured Projects
          </h2>
          <p data-reveal="true" className="mt-4 max-w-2xl text-slate-300 leading-8">
            A mix of portfolio-ready ML work, enterprise backend experience translated into case
            studies, and AI workflow experiments that aim for useful, product-shaped outcomes.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projectCards.map((project, index) => (
              <div key={project.title} data-reveal="true">
                <TiltCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  accent={project.accent}
                  className={cn(index === 1 && "lg:translate-y-6")}
                />
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell">
          <div className="section-kicker">
            <span>04</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Skills Stack
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {skills.map((group) => (
              <div key={group.title} data-reveal="true" className="glass-card rounded-2xl p-5">
                <h3 className="font-mono-display text-xs uppercase tracking-[0.22em] text-blue-300/80">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono-display text-xs text-slate-200 transition-colors hover:border-blue-400/40 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            data-reveal="true"
            className="glass-card mt-10 rounded-[2rem] p-8"
          >
            <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <p className="font-mono-display text-xs uppercase tracking-[0.3em] text-blue-300/75">
                  Working Style
                </p>
                <h3 className="mt-3 font-heading text-3xl text-white">
                  Enterprise discipline with experimentation energy
                </h3>
                <p className="mt-4 max-w-xl leading-8 text-slate-300">
                  I like systems that are elegant under pressure: clear data flows, performance-aware
                  backend work, explainable ML choices, and AI features that feel dependable instead
                  of magical.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  ["Backend", "PL/SQL, Java, API thinking, release discipline"],
                  ["ML", "feature engineering, model iteration, evaluation"],
                  ["AI", "prompt workflows, retrieval, orchestration, product fit"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-blue-300/75">
                      {title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section-shell">
          <div className="section-kicker">
            <span>05</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Education
          </h2>
          <div className="mt-10 space-y-6">
            {education.map((item) => (
              <div key={item.title} data-reveal="true" className="glass-card rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl text-white">{item.title}</h3>
                    <p className="mt-1 font-mono-display text-sm text-blue-300/90">{item.org}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {item.meta} • {item.detail}
                    </p>
                  </div>
                  <span className="font-mono-display text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="section-kicker mt-16">
            <span>06</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Certifications
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {certifications.map((item) => (
              <div key={item.title} data-reveal="true" className="glass-card rounded-2xl p-5">
                <p className="text-sm font-medium text-slate-100">{item.title}</p>
                <p className="mt-2 font-mono-display text-xs text-slate-400">
                  {item.issuer} • {item.year}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell">
          <div className="section-kicker">
            <span>07</span>
            <span />
          </div>
          <h2 data-reveal="true" className="font-heading text-3xl text-white md:text-4xl">
            Get In Touch
          </h2>
          <p data-reveal="true" className="mt-4 max-w-lg text-slate-300 leading-8">
            Whether you&apos;re hiring, collaborating on an ML project, or exploring AI workflow
            ideas, my inbox is always open.
          </p>
          <div className="mt-10 flex flex-wrap gap-5">
            {[
              {
                href: "mailto:deepakkatukuri@gmail.com",
                label: "Email",
                value: "deepakkatukuri@gmail.com",
                icon: Mail,
              },
              {
                href: "https://github.com/Deepak589",
                label: "GitHub",
                value: "github.com/Deepak589",
                icon: Github,
              },
              {
                href: "https://www.linkedin.com/in/deepak-katukuri",
                label: "LinkedIn",
                value: "linkedin.com/in/deepak-katukuri",
                icon: Linkedin,
              },
              {
                href: "#hero",
                label: "Focus",
                value: "Backend • ML • AI",
                icon: Database,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-reveal="true"
                className="glass-card group flex min-w-[260px] items-center gap-3 rounded-2xl px-6 py-4 transition-all duration-200 hover:border-blue-400/40 hover:bg-white/[0.07]"
              >
                <item.icon className="h-4 w-4 text-blue-300" />
                <div>
                  <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-200 transition-colors group-hover:text-white">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-mono-display text-xs text-slate-400">
          © 2026 Deepak Katukuri — rebuilt with Next.js and the recovered component set.
        </p>
      </footer>
    </>
  );
}
