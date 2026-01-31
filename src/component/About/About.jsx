import React, { useRef, useEffect, useState } from 'react';
import './About.css';
import ME from '../../component/assets/sam.jpg';
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';

const About = () => {
  const sectionRef = useRef(null);
  const imageButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState('');

  // handle Escape & simple focus-trap for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
      if (lightboxOpen && e.key === 'Tab') {
        // keep focus on close button when modal is open (simple trap)
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  // move focus into the lightbox; allow page scrolling while image/lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      // focus close button shortly after opening
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      // restore focus back to the image button
      imageButtonRef.current?.focus();
    }
  }, [lightboxOpen]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(node.querySelector('.about__me'));
    obs.observe(node.querySelector('.about__content'));

    return () => obs.disconnect();
  }, []);

  const handleSkillClick = async (skill) => {
    try {
      await navigator.clipboard.writeText(skill);
      setCopiedSkill(`Copied "${skill}" to clipboard`);
    } catch {
      setCopiedSkill(`Selected "${skill}"`);
    }
    setTimeout(() => setCopiedSkill(''), 2000);
  };

  return (
    <section id="about" ref={sectionRef}>
      <h5 className="get">Get To Know</h5>
      <h2 className="mee">About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <figure className="about__figure">
            <button
              ref={imageButtonRef}
              type="button"
              className="about__me-image"
              onClick={() => setLightboxOpen(true)}
              aria-label="View larger image"
            >
              <img
                src={ME}
                alt="Samuel Onyedikachi"
                loading="lazy"
                decoding="async"
                width="600"
                height="600"
                srcSet={`${ME} 320w, ${ME} 600w`}
                sizes="(max-width: 600px) 75vw, 320px"
              />
              <div className="about__badge" aria-hidden="true">
                Software Engineer
              </div>
            </button>
            <figcaption className="sr-only">
              Samuel Onyedikachi — Software Engineer
            </figcaption>
          </figure>

          {lightboxOpen && (
            <div
              className="about__lightbox"
              role="dialog"
              aria-modal="true"
              onClick={() => setLightboxOpen(false)}
            >
              <div
                className="about__lightbox-inner"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="about__lightbox-close"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close image"
                >
                  ✕
                </button>
                <img src={ME} alt="Samuel Onyedikachi large" />
              </div>
            </div>
          )}
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>2+ Years Working</small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>200+ Worldwide</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>3+ Completed</small>
            </article>
          </div>

          <p>
            I’m a passionate and versatile Software Engineer and Full-Stack
            Developer who builds real-world digital products end-to-end, with a
            core strength in frontend development (React.js, Next.js, Tailwind
            CSS), mobile development (React Native & Expo), and additional
            experience across backend APIs (Node.js, Express, REST APIs, MySQL,
            Python), ticketing/support systems, POS & ESC/POS systems, hardware
            diagnostics, networking, and Windows technical support. I create
            clean interfaces, efficient systems, and smooth user experiences
            across web, mobile, and internal tools.
          </p>

          <p>
            I’ve built several real-world and personal projects spanning web,
            backend, mobile, and Python automation, consistently focusing on
            usability, performance, and clean architecture. I’m committed to
            continuous learning and building impactful digital products, with
            the long-term goal of becoming a world-class Software Engineer.
          </p>

          <ul className="about__skills" aria-label="Skills">
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Software Developer')}
                title='Copy "Software Developer" to clipboard'
              >
                Software Developer
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Full-Stack Developer')}
                title='Copy "Full-Stack Developer" to clipboard'
              >
                Full-Stack Developer
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('React / Next.js')}
                title='Copy "React / Next.js" to clipboard'
              >
                React / Next.js
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('React Native & Expo')}
                title='Copy "React Native & Expo" to clipboard'
              >
                React Native & Expo
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() =>
                  handleSkillClick('Node.js / Express / REST APIs')
                }
                title='Copy "Node.js / Express / REST APIs" to clipboard'
              >
                Node.js / Express / REST APIs
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Python')}
                title='Copy "Python" to clipboard'
              >
                Python
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('MySQL')}
                title='Copy "MySQL" to clipboard'
              >
                MySQL
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Git / GitHub')}
                title='Copy "Git / GitHub" to clipboard'
              >
                Git / GitHub
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('POS & ESC/POS Systems')}
                title='Copy "POS & ESC/POS Systems" to clipboard'
              >
                POS & ESC/POS Systems
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Hardware Diagnostics')}
                title='Copy "Hardware Diagnostics" to clipboard'
              >
                Hardware Diagnostics
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Networking')}
                title='Copy "Networking" to clipboard'
              >
                Networking
              </button>
            </li>
            <li>
              <button
                className="about__skill"
                onClick={() => handleSkillClick('Windows & Technical Support')}
                title='Copy "Windows & Technical Support" to clipboard'
              >
                Windows & Technical Support
              </button>
            </li>
          </ul>

          <div className="sr-only" aria-live="polite" role="status">
            {copiedSkill}
          </div>

          <div className="about__actions">
            <a
              href="#contact"
              className="btn btn-primary"
              aria-label="Let's talk"
            >
              Let's Talk
            </a>
            <a
              href="/resume.pdf"
              className="btn"
              aria-label="Download CV"
              target="_blank"
              rel="noreferrer noopener"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
