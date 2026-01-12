import { useEffect, useMemo, useState } from "react";
import "./App.css";

import profilePhoto from "./assets/profilePhoto_placeholder.jpg";

const TOOLBOX = ["JavaScript", "HTML", "CSS", "React", "Python", "Git", "TypeScript"];
const LEARNING = ["Node.js", "Express", "SQL", "REST APIs"];

const PROJECTS = [
  {
    id: "p1",
    title: "Project One",
    description: "Short description.",
    tags: ["React", "CSS"],
    linkLabel: "View project",
    linkHref: "#",
  },
  {
    id: "p2",
    title: "Project Two",
    description: "Short description.",
    tags: ["JavaScript", "API"],
    linkLabel: "View project",
    linkHref: "#",
  },
  {
    id: "p3",
    title: "Project Three",
    description: "Short description.",
    tags: ["Full stack", "Node"],
    linkLabel: "View project",
    linkHref: "#",
  },
];

const STRINGS = {
  en: {
    home: "Home",
    about: "About",
    portfolio: "Portfolio",
    contact: "Contact",
    downloadCv: "Download CV",
    heroTitle: "Iida Rainio",
    heroRole: "Front / Full-Stack Web Developer",
    heroDesc:
      "I build clean, responsive web experiences and I’m currently leveling up my backend skills to become a confident full-stack developer.",
    aboutHeading: "About me",
    toolsHeading: "Tools & technologies",
    learningHeading: "Currently learning",
    portfolioHeading: "Portfolio",
    contactHeading: "Contact me",
    formHeading: "Send a message",
    sendMessage: "Send message",
    status: "Currently working on revisiting my portfolio.",
    educationHeading: "Education",
    educationItem: "B.Eng — Information & Communication Technology JAMK (2021 - present)",
  },
  fi: {
    home: "Koti",
    about: "Tietoa Minusta",
    portfolio: "Portfolio",
    contact: "Yhteydenotto",
    downloadCv: "Lataa CV",
    heroTitle: "Iida Rainio",
    heroRole: "Front / Full-Stack Web -kehittäjä",
    heroDesc:
      "Teen selkeitä ja responsiivisia web-sovelluksia ja kehitän parhaillaan backend-osaamistani kohti täysiveristä full-stack -roolia.",
    aboutHeading: "Tietoa Minusta",
    toolsHeading: "Työkalut & teknologiat",
    learningHeading: "Opiskelen nyt",
    portfolioHeading: "Portfolio",
    contactHeading: "Ota yhteyttä",
    formHeading: "Lähetä viesti",
    sendMessage: "Lähetä viesti",
    status: "Työstän parhaillaan portfolioni päivitystä.",
    educationHeading: "Koulutus",
    educationItem: "Insinööri (AMK) — Tieto- ja viestintätekniikka JAMK (2021 - nykyhetki)",
  },
};

function useIsMobile(breakpointPx = 860, onDesktop) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpointPx);

  useEffect(() => {
    const onResize = () => {
      const nextIsMobile = window.innerWidth < breakpointPx;
      setIsMobile(nextIsMobile);

      // If we just became desktop, run the callback (close menu)
      if (!nextIsMobile && typeof onDesktop === "function") {
        onDesktop();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpointPx, onDesktop]);

  return isMobile;
}


function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path
        d="M4 6h16v12H4V6zm2 2v.2l6 4.3 6-4.3V8H6zm12 2.2-6 4.3-6-4.3V16h12v-5.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path
        d="M6.5 7.3A1.8 1.8 0 1 1 6.5 3.7a1.8 1.8 0 0 1 0 3.6ZM5 21V9h3v12H5Zm5 0V9h2.9v1.6h.1c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1V21h-3v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path
        d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-3 .6-3.6-1.3-3.6-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.5 5.1-4.9 5.4.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = useIsMobile(860, () => setMenuOpen(false));

  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const t = useMemo(() => STRINGS[lang] ?? STRINGS.en, [lang]);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const [activeProjectId, setActiveProjectId] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    // close modal with ESC
    const onKey = (e) => {
      if (e.key === "Escape") setActiveProjectId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) || null;

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  const toggleLang = () => setLang((p) => (p === "en" ? "fi" : "en"));

  const onNavClick = () => setMenuOpen(false);

  return (
    <>
      <div className="bg" />

      {/* Floating nav */}
      <nav className="nav">
        <div className="navInner">
          {/* Desktop layout */}
          <div className="navRow">
            <div className="navGroup left">
              <button className="miniToggle" type="button" onClick={toggleLang} aria-label="Toggle language">
                <span className={lang === "fi" ? "active" : ""}>FIN</span>
                <span className="sepSlash">/</span>
                <span className={lang === "en" ? "active" : ""}>EN</span>
              </button>

              <span className="vSep" aria-hidden="true" />

              <a className="navLink" href="#home">{t.home}</a>
              <a className="navLink" href="#about">{t.about}</a>
            </div>

            <div className="navCenter" aria-hidden="true" />

            <div className="navGroup right">
              <a className="navLink" href="#portfolio">{t.portfolio}</a>
              <a className="navLink" href="#contact">{t.contact}</a>

              <span className="vSep" aria-hidden="true" />

              <button
                className="themeSwitch"
                type="button"
                role="switch"
                aria-checked={theme === "dark"}
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
              />
            </div>

            <button
              className="burger"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="mobileMenu">
              <div className="mobileRow">
                <button className="miniToggle" type="button" onClick={toggleLang}>
                  <span className={lang === "fi" ? "active" : ""}>FIN</span>
                  <span className="sepSlash">/</span>
                  <span className={lang === "en" ? "active" : ""}>EN</span>
                </button>
                <button
                  className="themeSwitch"
                  type="button"
                  role="switch"
                  aria-checked={theme === "dark"}
                  aria-label="Toggle dark mode"
                  onClick={toggleTheme}
                />
              </div>

              <a className="mobileLink" href="#home" onClick={onNavClick}>{t.home}</a>
              <a className="mobileLink" href="#about" onClick={onNavClick}>{t.about}</a>
              <a className="mobileLink" href="#portfolio" onClick={onNavClick}>{t.portfolio}</a>
              <a className="mobileLink" href="#contact" onClick={onNavClick}>{t.contact}</a>

            </div>
          )}
        </div>
      </nav>

      <div className="page">
        {/* HERO */}
        <header className="hero" id="home">
          <div className="locationPill">📍 Jyväskylä, Finland</div>

          <h1 className="heroName">{t.heroTitle}</h1>
          <p className="heroRole">{t.heroRole}</p>
          <p className="heroDesc">{t.heroDesc}</p>

          <div className="heroCta">
            <button className="btn" type="button" onClick={() => alert("CV download will be added soon.")}>
              {t.downloadCv}
            </button>
          </div>
        </header>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="sectionHeader">
            <h2>{t.aboutHeading}</h2>
          </div>

          <div className="aboutGrid">
            <div className="aboutText">
              <p className="lead">
                Write 3–5 sentences about what I'm enjoy building, what I'm learning, and what kind of internship I'm aiming for.
              </p>

              <h3 className="subHeading">{t.educationHeading}</h3>
              <ul className="list">
                <li>{t.educationItem}</li>
              </ul>
            </div>

            <div className="aboutMedia">
              <div className="photoWrap">
                <img
                  className="profilePhoto"
                  src={profilePhoto}
                  alt="placeholder image of my cat"
                  loading="lazy"
                />
              </div>
              <div className="statusPill">{t.status}</div>
            </div>
          </div>
        </section>

        {/* TOOLS */}
        <section className="section" id="tools">
          <div className="sectionHeader">
            <h2>{t.toolsHeading}</h2>
          </div>

          <div className="toolGrid">
            {TOOLBOX.map((tool) => (
              <div className="toolCard" key={tool} role="button" tabIndex={0}>
                {tool}
              </div>
            ))}
          </div>

          <div className="sectionSpacer" />

          <div className="sectionHeader small">
            <h3>{t.learningHeading}</h3>
          </div>

          <div className="toolGrid">
            {LEARNING.map((tool) => (
              <div className="toolCard alt" key={tool} role="button" tabIndex={0}>
                {tool}
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="section" id="portfolio">
          <div className="sectionHeader">
            <h2>{t.portfolioHeading}</h2>
          </div>

          {!isMobile ? (
            <div className="projectGrid">
              {PROJECTS.map((p) => (
                <article className="projectCard" key={p.id}>
                  <div className="projectImage" aria-hidden="true" />
                  <h3 className="projectTitle">{p.title}</h3>
                  <p className="projectDesc">{p.description}</p>

                  <div className="tagRow">
                    {p.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="btnSecondary"
                    type="button"
                    onClick={() => alert("Project link will be added soon.")}
                  >
                    {p.linkLabel}
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="projectListMobile">
              {PROJECTS.map((p) => (
                <button
                  className="projectTitleOnly"
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProjectId(p.id)}
                >
                  {p.title}
                  <span className="chev">›</span>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="contactGrid">
            <div className="contactLeft">
              <h2>{t.contactHeading}</h2>

              <div className="contactLinks">
                <div className="contactRow link">
                  <span className="iconBadge"><IconMail /></span>
                  <div className="contactText">
                    <div className="label">Email</div>
                    <div className="value">your.email@example.com</div>
                  </div>
                </div>

                <a className="contactRow link" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="iconBadge"><IconLinkedIn /></span>
                  <div className="contactText">
                    <div className="label">LinkedIn</div>
                    <div className="value">linkedin.com/in/yourname</div>
                  </div>
                </a>

                <a className="contactRow link" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="iconBadge"><IconGitHub /></span>
                  <div className="contactText">
                    <div className="label">GitHub</div>
                    <div className="value">github.com/yourname</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="contactRight">
              <div className="formCard">

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Form functionality will be added later.");
                  }}
                >
                  <label className="field">
                    <span>Name</span>
                    <input placeholder="Your name" />
                  </label>

                  <label className="field">
                    <span>Email</span>
                    <input type="email" placeholder="you@example.com" />
                  </label>

                  <label className="field">
                    <span>Subject</span>
                    <input placeholder="Subject" />
                  </label>

                  <label className="field">
                    <span>Message</span>
                    <textarea rows={5} placeholder="Write your message..." />
                  </label>

                  <button className="btn btnFull" type="submit">
                    {t.sendMessage}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footerInner">
            <div className="footerLeft">
              <div className="footerName">Iida Rainio</div>
              <div className="footerSub">Full stack Developer © 2026</div>
            </div>

            <div className="footerRight">
              <span className="iconBadge link" title="Email (not a link)">
                <IconMail />
              </span>

              <a className="iconBadge link" href="#" onClick={(e) => e.preventDefault()} title="LinkedIn">
                <IconLinkedIn />
              </a>

              <a className="iconBadge link" href="#" onClick={(e) => e.preventDefault()} title="GitHub">
                <IconGitHub />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile project modal */}
      {activeProject && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Project details">
          <div className="modalCard">
            <button className="modalClose" type="button" onClick={() => setActiveProjectId(null)} aria-label="Close">
              ×
            </button>

            <div className="projectImage modalImage" aria-hidden="true" />
            <h3 className="projectTitle">{activeProject.title}</h3>
            <p className="projectDesc">{activeProject.description}</p>

            <div className="tagRow">
              {activeProject.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <button className="btnSecondary" type="button" onClick={() => alert("Project link will be added soon.")}>
              {activeProject.linkLabel}
            </button>
          </div>

          <button className="modalBackdrop" type="button" onClick={() => setActiveProjectId(null)} aria-label="Close modal backdrop" />
        </div>
      )}
    </>
  );
}
