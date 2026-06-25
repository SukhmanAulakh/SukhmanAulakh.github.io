import { Button, Card } from "@heroui/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  CircuitBoard,
  Cloud,
  Code2,
  ContactRound,
  Download,
  FileText,
  GitFork,
  Mail,
  Menu,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  archiveProjects,
  featuredProjects,
  skillGroups,
  type Project,
} from "./data/projects";

const navItems = [
  { label: "Work", href: "work" },
  { label: "Experience", href: "experience" },
  { label: "Toolkit", href: "toolkit" },
  { label: "About", href: "about" },
];
const RESUME_URL = "/Sukhmanjot_Aulakh_Resume.pdf";
const RESUME_FILENAME = "Sukhmanjot_Aulakh_Resume.pdf";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openLink(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function viewResume() {
  openLink(RESUME_URL);
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = RESUME_URL;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectImage({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const image = project.featuredImage;

  if (!image) return null;

  const imageContent = (
    <>
      <motion.img
        src={image.src}
        alt={image.alt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className={`featured-image featured-image-${image.fit ?? "cover"}`}
        style={{ objectPosition: image.position ?? "center" }}
        initial={{ scale: 1.04, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="featured-visual-glow" aria-hidden="true" />
      <div className="featured-image-chip featured-image-chip-top">
        {project.shortTitle}
      </div>
      <div className="featured-image-chip featured-image-chip-bottom">
        {image.badge}
      </div>
    </>
  );

  if (project.href) {
    return (
      <button
        className="featured-visual featured-visual-button"
        type="button"
        aria-label={`Open ${project.title}`}
        onClick={() => openLink(project.href!)}
      >
        {imageContent}
      </button>
    );
  }

  return (
    <div className="featured-visual">
      {imageContent}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 44 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
    >
      <Card className="project-card">
        <Card.Content className="project-card-content">
          <ProjectImage project={project} index={index} />
          <div className="project-copy">
            <div className="project-meta">
              <span>0{index + 1}</span>
              <span>{project.status}</span>
            </div>
            <div>
              <p className="project-kicker">{project.shortTitle}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-impact">{project.impact}</p>
            </div>
            <div className="project-footer">
              <div className="tag-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              {project.href ? (
                <Button
                  className="icon-button"
                  isIconOnly
                  variant="ghost"
                  aria-label={`Open ${project.title}`}
                  onPress={() => openLink(project.href!)}
                >
                  <ArrowUpRight size={20} />
                </Button>
              ) : (
                <span className="private-label">Team project</span>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.article>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <button className="wordmark" onClick={() => scrollToId("top")} aria-label="Back to top">
        <span>SA</span>
        <span className="wordmark-name">Sukhmanjot Aulakh</span>
      </button>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.href} onClick={() => handleNav(item.href)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <Button className="nav-resume" size="sm" onPress={viewResume}>
          <FileText size={15} />
          Resume
        </Button>
        <Button className="nav-contact" size="sm" onPress={() => scrollToId("contact")}>
          Let&apos;s talk
          <ArrowUpRight size={15} />
        </Button>
      </div>

      <button
        className="menu-button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNav(item.href)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.button>
            ))}
            <button onClick={viewResume}>
              <span>05</span>
              Resume
            </button>
            <button onClick={() => handleNav("contact")}>
              <span>06</span>
              Let&apos;s talk
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-orbit orbit-one"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-orbit orbit-two"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div className="hero-content page-width">
        <motion.div
          className="availability"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="availability-dot" />
          Toronto, Canada
          <span className="availability-divider" />
          Computer Engineering, Class of 2027
        </motion.div>

        <div className="hero-heading-wrap">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Software engineer and systems builder
          </motion.p>
          <h1>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Maps, machines
            </motion.span>
            <motion.span
              className="accent-line"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              &amp; the web.
            </motion.span>
          </h1>
        </div>

        <div className="hero-bottom">
          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            I&apos;m Sukhmanjot, a computer engineering student focused on
            software. I build geospatial platforms, embedded telemetry, and web
            experiences that hold up beyond the demo.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Button className="primary-action" size="lg" onPress={() => scrollToId("work")}>
              Explore my work
              <ArrowDown size={18} />
            </Button>
            <Button
              className="secondary-action"
              size="lg"
              variant="outline"
              onPress={viewResume}
            >
              <FileText size={18} />
              View resume
            </Button>
            <Button
              className="secondary-action"
              size="lg"
              variant="outline"
              onPress={downloadResume}
            >
              <Download size={18} />
              Download PDF
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-marquee"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        aria-hidden="true"
      >
        <div>
          <span>REACT</span><i>✦</i><span>POSTGIS</span><i>✦</i><span>C++</span><i>✦</i>
          <span>FASTAPI</span><i>✦</i><span>DOCKER</span><i>✦</i><span>MAPBOX</span><i>✦</i>
          <span>REACT</span><i>✦</i><span>POSTGIS</span><i>✦</i><span>C++</span><i>✦</i>
          <span>FASTAPI</span><i>✦</i><span>DOCKER</span><i>✦</i><span>MAPBOX</span><i>✦</i>
        </div>
      </motion.div>
    </section>
  );
}

function Work() {
  return (
    <section className="work-section section-shell" id="work">
      <div className="page-width">
        <Reveal className="section-heading">
          <div>
            <span className="section-number">01 SELECTED WORK</span>
            <h2>Built for the real world.</h2>
          </div>
          <p>
            A selection of projects where interface craft meets systems
            thinking, from 3D terrain to race car telemetry.
          </p>
        </Reveal>

        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <Reveal className="archive" delay={0.08}>
          <div className="archive-heading">
            <div>
              <span className="section-number">PROJECT ARCHIVE</span>
              <h3>Experiments, foundations, and side quests.</h3>
            </div>
            <Button
              className="text-action"
              variant="ghost"
              onPress={() => openLink("https://github.com/SukhmanAulakh?tab=repositories")}
            >
              All repositories
              <ArrowUpRight size={17} />
            </Button>
          </div>

          <div className="archive-list">
            {archiveProjects.map((project, index) => (
              <motion.div
                className="archive-row"
                key={project.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.04, 0.28) }}
              >
                <span className="archive-index">
                  {String(featuredProjects.length + index + 1).padStart(2, "0")}
                </span>
                <div className="archive-name">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </div>
                <div className="archive-stack">{project.stack.slice(0, 3).join(", ")}</div>
                <div className="archive-status">
                  {project.status}
                  {project.href ? (
                    <button
                      aria-label={`Open ${project.title} on GitHub`}
                      onClick={() => openLink(project.href!)}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  ) : (
                    <span className="lock-dot" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section section-shell" id="experience">
      <div className="page-width">
        <Reveal className="section-heading light-heading">
          <div>
            <span className="section-number">02 EXPERIENCE</span>
            <h2>One team. Two systems.</h2>
          </div>
          <p>
            At TMU Baja Racing, I work across the vehicle and the platform that
            represents it, bringing electrical engineering, embedded software,
            and web delivery.
          </p>
        </Reveal>

        <div className="experience-layout">
          <Reveal className="baja-statement">
            <div className="baja-mark">
              <CircuitBoard size={24} />
            </div>
            <p>
              <span>Toronto Metropolitan</span>
              Baja Racing
            </p>
            <div className="experience-stat">
              <strong>15+</strong>
              <span>engineers led across the vehicle&apos;s electrical system</span>
            </div>
          </Reveal>

          <div className="timeline">
            <Reveal className="timeline-item" delay={0.05}>
              <div className="timeline-marker" />
              <div className="timeline-date">JAN 2025 TO PRESENT</div>
              <div className="timeline-content">
                <p className="timeline-company">TMU BAJA RACING</p>
                <h3>Electrical Lead</h3>
                <p>
                  Leading the design and implementation of an SAE compliant
                  electrical system while developing C++ and Arduino software
                  for RPM, gear position, and oil temperature sensors.
                </p>
                <div className="tag-list dark-tags">
                  <span>C++</span>
                  <span>Arduino</span>
                  <span>Embedded systems</span>
                  <span>Agile leadership</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="timeline-item" delay={0.12}>
              <div className="timeline-marker" />
              <div className="timeline-date">APR 2024 TO PRESENT</div>
              <div className="timeline-content">
                <p className="timeline-company">TMU BAJA RACING</p>
                <h3>Web Developer</h3>
                <p>
                  Engineering a fast, searchable team platform with Next.js,
                  TypeScript, HeroUI, and static generation. It is supported by
                  automated Firebase deployments, GA4, and a Google Drive
                  content workflow for team leads without a technical background.
                </p>
                <div className="tag-list dark-tags">
                  <span>Next.js 15</span>
                  <span>TypeScript</span>
                  <span>HeroUI</span>
                  <span>GitHub Actions</span>
                  <span>Firebase</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillIcons = [Code2, Braces, Cloud, CircuitBoard];

function Toolkit() {
  return (
    <section className="toolkit-section section-shell" id="toolkit">
      <div className="page-width">
        <Reveal className="section-heading">
          <div>
            <span className="section-number">03 TOOLKIT</span>
            <h2>Across the whole stack.</h2>
          </div>
          <p>
            I&apos;m most useful where boundaries blur: interface and API,
            software and hardware, feature and deployment.
          </p>
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = skillIcons[index];
            return (
              <Reveal key={group.label} delay={index * 0.06}>
                <Card className="skill-card">
                  <Card.Content>
                    <div className="skill-card-head">
                      <span>0{index + 1}</span>
                      <Icon size={23} />
                    </div>
                    <h3>{group.label}</h3>
                    <ul>
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </Card.Content>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-shell" id="about">
      <div className="page-width about-layout">
        <Reveal className="about-title">
          <span className="section-number">04 ABOUT</span>
          <h2>
            Engineering with
            <span> both hands on.</span>
          </h2>
        </Reveal>

        <Reveal className="about-copy" delay={0.08}>
          <p className="about-lead">
            I care about the full path from idea to dependable system.
          </p>
          <p>
            I&apos;m completing a Bachelor of Engineering in Computer
            Engineering (Software) at Toronto Metropolitan University. My work
            moves comfortably between polished React interfaces, spatial data
            pipelines, containerized infrastructure, and the sensors bolted to
            an off road race car.
          </p>
          <p>
            That range shapes how I build: understand the constraints, make the
            architecture legible, then sweat the interaction details people
            actually feel.
          </p>

          <div className="education-block">
            <div>
              <span>EDUCATION</span>
              <strong>B.Eng. Computer Engineering (Software)</strong>
              <p>Toronto Metropolitan University, Expected 2027</p>
            </div>
            <div>
              <span>CONTINUED LEARNING</span>
              <strong>The Joy of React</strong>
              <p>Josh Comeau, Completed June 2025</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-grid" aria-hidden="true" />
      <div className="page-width contact-inner">
        <Reveal>
          <span className="section-number">05 CONTACT</span>
          <p className="contact-kicker">Have a problem worth building around?</p>
          <h2>Let&apos;s make it real.</h2>
        </Reveal>

        <Reveal className="contact-bottom" delay={0.08}>
          <Button
            className="email-action"
            size="lg"
            onPress={() => {
              window.location.href = "mailto:sukhmanjot.aulakh@torontomu.ca";
            }}
          >
            <Mail size={20} />
            sukhmanjot.aulakh@torontomu.ca
            <ArrowRight size={20} />
          </Button>
          <div className="social-links">
            <button onClick={() => openLink("https://github.com/SukhmanAulakh")}>
              <GitFork size={18} />
              GitHub
            </button>
            <button onClick={() => openLink("https://www.linkedin.com/in/sukhmanjot-aulakh")}>
              <ContactRound size={18} />
              LinkedIn
            </button>
          </div>
        </Reveal>

        <Reveal className="resume-panel" delay={0.12}>
          <div>
            <span>RESUME</span>
            <p>
              Prefer the quick version?
            </p>
          </div>
          <div className="resume-panel-actions">
            <button onClick={viewResume}>
              <FileText size={18} />
              View resume
            </button>
            <button onClick={downloadResume}>
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </Reveal>

        <footer>
          <p>Designed and built by Sukhmanjot Aulakh.</p>
          <p>React, HeroUI, Motion</p>
          <button onClick={() => scrollToId("top")}>
            Back to top
            <ArrowUpRight size={15} />
          </button>
        </footer>
      </div>
    </section>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Toolkit />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
