import React, { useRef, useEffect, useState } from 'react';
import './Portfolio.css';
import Bun from '../assets/files/bum.jpg';

const Portfolio = () => {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // refs to hold mutable values used by animation/timers
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const animFrameRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const smoothScrollTo = (el, to, duration = 1200) => {
    const start = el.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      el.scrollLeft = start + change * easeInOutQuad(t);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  const updateActiveClasses = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll('.portfolio__item');
    items.forEach((item, idx) => {
      if (idx === i) item.classList.add('is-active');
      else item.classList.remove('is-active');
    });
  };

  const scrollToIndex = (i, duration = 1200) => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll('.portfolio__item');
    const item = items[i];
    if (!item) return;
    indexRef.current = i;
    const target =
      item.offsetLeft - (track.clientWidth / 2 - item.clientWidth / 2);
    smoothScrollTo(track, target, duration);
    setCurrent(i);
    updateActiveClasses(i);
  };

  const start = () => {
    stop();
    if (!count || count <= 1) return;
    intervalRef.current = setInterval(() => {
      const next = (indexRef.current + 1) % count;
      scrollToIndex(next, 1200);
    }, 5000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll('.portfolio__item');
    setCount(items.length);
    // set initial active
    indexRef.current = 0;
    setCurrent(0);
    updateActiveClasses(0);
    if (items.length > 1) start();

    const onPointerEnter = () => stop();
    const onPointerLeave = () => start();

    let pointerStartX = 0;
    let pointerStartTime = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const onPointerStart = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      pointerStartX = clientX;
      pointerStartTime = performance.now();
      dragStartX = clientX;
      dragStartScroll = track.scrollLeft;
      isDragging = true;
      stop();
      try {
        track.setPointerCapture?.(e.pointerId);
      } catch (err) {
        /* ignore */
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const dx = clientX - dragStartX;
      track.scrollLeft = Math.max(0, dragStartScroll - dx);
    };

    const snapToNearest = (duration = 600) => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const dist = Math.abs(itemCenter - center);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      });
      scrollToIndex(nearest, duration);
    };

    const onPointerEnd = (e) => {
      const endX =
        e.clientX ?? (e.changedTouches && e.changedTouches[0]?.clientX) ?? 0;
      const dx = endX - pointerStartX;
      const dt = performance.now() - pointerStartTime;

      if (isDragging) {
        isDragging = false;
        try {
          track.releasePointerCapture?.(e.pointerId);
        } catch (err) {
          /* ignore */
        }
        snapToNearest(600);
      } else if (Math.abs(dx) > 40 && dt < 500) {
        if (dx < 0) {
          const next = (indexRef.current + 1) % items.length;
          scrollToIndex(next);
        } else {
          const prev = (indexRef.current - 1 + items.length) % items.length;
          scrollToIndex(prev);
        }
      }

      start();
    };

    const onPointerCancel = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          track.releasePointerCapture?.(e.pointerId);
        } catch (err) {}
        snapToNearest(600);
        start();
      }
    };

    const onScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let minDist = Infinity;
        items.forEach((item, i) => {
          const itemCenter = item.offsetLeft + item.clientWidth / 2;
          const dist = Math.abs(itemCenter - center);
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });
        indexRef.current = nearest;
        setCurrent(nearest);
        updateActiveClasses(nearest);
      }, 120);
    };

    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (indexRef.current - 1 + items.length) % items.length;
        scrollToIndex(prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (indexRef.current + 1) % items.length;
        scrollToIndex(next);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    track.addEventListener('mouseenter', onPointerEnter);
    track.addEventListener('mouseleave', onPointerLeave);
    track.addEventListener('pointerdown', onPointerStart);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerEnd);
    track.addEventListener('pointercancel', onPointerCancel);
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibilityChange);

    // auto sliding started if there are multiple items (handled above)

    return () => {
      stop();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      track.removeEventListener('mouseenter', onPointerEnter);
      track.removeEventListener('mouseleave', onPointerLeave);
      track.removeEventListener('pointerdown', onPointerStart);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', onPointerEnd);
      track.removeEventListener('pointercancel', onPointerCancel);
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const prev = () => {
    if (!count) return;
    const prevIndex = (indexRef.current - 1 + count) % count;
    scrollToIndex(prevIndex);
    start();
  };

  const next = () => {
    if (!count) return;
    const nextIndex = (indexRef.current + 1) % count;
    scrollToIndex(nextIndex);
    start();
  };

  const goTo = (i) => {
    scrollToIndex(i);
    start();
  };

  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div
        className="portfolio__slider"
        role="region"
        aria-label="Portfolio slider"
      >
        <button
          type="button"
          className="portfolio__control prev"
          aria-label="Previous slide"
          onClick={prev}
        >
          ‹
        </button>

        <div className="portfolio__track" ref={trackRef} tabIndex={0}>
          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>

          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>

          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>

          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>

          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>

          <article className="portfolio__item">
            <div className="portfolio__item-image">
              <img src={Bun} alt="Bumasel" className="portfolio__bumasel" />
            </div>
            <h3>This is a portfolio item title</h3>
            <div className="po-lio">
              <a
                href="https://github.com"
                className="btn"
                target="_blank"
                rel="noreferrer noopener"
              >
                Github
              </a>
              <a
                href="https://bumasel.com"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer noopener"
              >
                Live Demo
              </a>
            </div>
          </article>
        </div>

        <button
          type="button"
          className="portfolio__control next"
          aria-label="Next slide"
          onClick={next}
        >
          ›
        </button>

        <div className="portfolio__dots" aria-hidden={count === 0}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={`portfolio__dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
