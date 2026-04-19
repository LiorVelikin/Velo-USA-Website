import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import VeloLogo from './components/VeloLogo'
import liorPortrait from './assets/lior-portrait-2.png'

// ─── Color tokens ────────────────────────────────────────────────
const BG      = '#040c1a'
const NAVY    = '#071428'
const CARD    = '#0b1a30'
const BORDER  = 'rgba(255,255,255,0.07)'
const BLUE    = '#1a6fff'
const BLUE_L  = '#4d9fff'
const ORANGE  = '#f97316'
const TEXT    = '#c8d8f0'
const MUTED   = '#6a88a8'

// ─── Fade-in scroll wrapper ──────────────────────────────────────
function Reveal({ children, delay = 0, y = 28, style = {}, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Orange CTA button ───────────────────────────────────────────
function OrangeBtn({ children, href, onClick, large = false, style = {} }) {
  const [hov, setHov] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: large ? '16px 36px' : '13px 28px',
    background: hov
      ? 'linear-gradient(135deg,#ff8c42 0%,#f97316 100%)'
      : 'linear-gradient(135deg,#f97316 0%,#ea580c 100%)',
    color: '#fff', fontWeight: 700,
    fontSize: large ? '1.05rem' : '0.95rem',
    borderRadius: 999, border: 'none', cursor: 'pointer',
    boxShadow: hov
      ? '0 8px 36px rgba(249,115,22,0.55), 0 2px 8px rgba(0,0,0,0.2)'
      : '0 4px 22px rgba(249,115,22,0.40), 0 1px 4px rgba(0,0,0,0.15)',
    transform: hov ? 'translateY(-2px)' : 'none',
    transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
    whiteSpace: 'nowrap', textDecoration: 'none',
    ...style,
  }
  if (href) return (
    <a href={href} style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  )
  return (
    <button style={base} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  )
}

// ─── Ghost CTA button ────────────────────────────────────────────
function GhostBtn({ children, href, onClick, style = {} }) {
  const [hov, setHov] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '13px 28px',
    background: hov ? 'rgba(26,111,255,0.08)' : 'transparent',
    color: hov ? '#4d9fff' : '#c8d8f0', fontWeight: 600,
    fontSize: '0.95rem',
    borderRadius: 999,
    border: `1.5px solid ${hov ? 'rgba(26,111,255,0.45)' : 'rgba(255,255,255,0.18)'}`,
    cursor: 'pointer',
    transform: hov ? 'translateY(-2px)' : 'none',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap', textDecoration: 'none',
    ...style,
  }
  if (href) return (
    <a href={href} style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </a>
  )
  return (
    <button style={base} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  )
}

// ─── SVG Icons ───────────────────────────────────────────────────
const Icon = {
  hardhat:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M12 2a7 7 0 0 1 7 7v4H5V9a7 7 0 0 1 7-7z"/><path d="M12 2v3"/></svg>,
  calendar: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>,
  phone:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  dollar:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  target:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  bot:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>,
  chart:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  megaphone:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  search:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  check:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  star:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  arrowR:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  map:      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  hammer:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/></svg>,
  settings: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
}

function Stars({ n = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>
      {Array.from({ length: n }).map((_, i) => <span key={i}>{Icon.star}</span>)}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════
function NavbarUS() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const NAV_LINKS = [['Results', 'results'], ['How It Works', 'system'], ['Services', 'services'], ['About', 'founder']]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: scrolled ? 68 : 88,
      display: 'flex', alignItems: 'center',
      background: scrolled
        ? 'rgba(4,12,26,0.94)'
        : mobileOpen ? 'rgba(4,12,26,0.98)' : 'transparent',
      backdropFilter: scrolled || mobileOpen ? 'blur(24px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.35)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    }}>
      {/* Desktop: 3-col grid — left: logo+CTA | center: nav | right: balance */}
      <div style={{
        maxWidth: 1360, margin: '0 auto', padding: '0 20px',
        width: '100%', display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: 24,
      }}>
        {/* Left: Logo */}
        <a href="#" style={{ flexShrink: 0, justifySelf: 'start' }}>
          <VeloLogo style={{ height: scrolled ? 50 : 66, width: 'auto', transition: 'height 0.4s ease' }} />
        </a>

        {/* Center: Nav links (desktop only) */}
        <nav className="hidden md:flex" style={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {NAV_LINKS.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 16px', color: TEXT, fontSize: '0.875rem', fontWeight: 600,
              borderRadius: 8, transition: 'color 0.2s ease, background 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.background = 'transparent' }}
            >{label}</button>
          ))}
        </nav>

        {/* Right: CTA button (desktop) + hamburger (mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', justifySelf: 'end' }}>
          <div className="hidden md:block">
            <OrangeBtn onClick={() => scrollTo('cta')} style={{ fontSize: '0.84rem', padding: '10px 20px' }}>
              {Icon.calendar}&nbsp;Get Your Free Growth Plan
            </OrangeBtn>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, borderRadius: 2, background: '#fff',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 1 ? 'scaleX(0)' : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
                transition: 'all 0.3s ease',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'rgba(4,12,26,0.98)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        maxHeight: mobileOpen ? 400 : 0, overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_LINKS.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 0', color: TEXT, fontSize: '1rem', fontWeight: 600,
              textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>{label}</button>
          ))}
          <div style={{ paddingTop: 12 }}>
            <OrangeBtn onClick={() => scrollTo('cta')} style={{ width: '100%', justifyContent: 'center' }}>
              Get Your Free Growth Plan
            </OrangeBtn>
          </div>
        </div>
      </div>
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════
function HeroUS() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: `radial-gradient(ellipse 80% 60% at 50% -5%, rgba(26,111,255,0.16) 0%, transparent 65%), ${BG}`,
      paddingTop: 100, paddingBottom: 80, position: 'relative', overflow: 'hidden',
    }}>
      {/* Blueprint grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(26,111,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,111,255,0.045) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,111,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 56, alignItems: 'center' }} className="us-hero-grid">

          {/* Left */}
          <div>
            <Reveal delay={0}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.28)',
                borderRadius: 100, padding: '6px 16px', marginBottom: 28,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: ORANGE, flexShrink: 0, animation: 'urgencyPulse 2s ease-in-out infinite' }} />
                <span style={{ color: '#fb923c', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.07em' }}>
                  GROWTH PARTNER FOR CONSTRUCTION CONTRACTORS
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 style={{
                fontSize: 'clamp(2.4rem,4.2vw,3.7rem)',
                fontWeight: 900, lineHeight: 1.07, color: '#fff',
                marginBottom: 24, letterSpacing: '-0.03em',
              }}>
                More Booked{' '}
                <span style={{
                  background: 'linear-gradient(130deg,#f97316 0%,#fb923c 55%,#fbbf24 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Estimates.</span>
                <br />More Jobs.{' '}
                <span style={{
                  background: 'linear-gradient(130deg,#1a6fff 0%,#4d9fff 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Every Month.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p style={{ fontSize: '1.12rem', color: TEXT, lineHeight: 1.68, marginBottom: 36, maxWidth: 500 }}>
                We build the marketing system that fills your calendar with{' '}
                <strong style={{ color: '#fff' }}>qualified homeowners ready to hire</strong> —
                so you spend your time running jobs, not chasing leads.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 44 }}>
                <OrangeBtn large onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
                  {Icon.calendar}&nbsp;Get Your Free Growth Plan
                </OrangeBtn>
                <GhostBtn onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}>
                  See Contractor Results&nbsp;{Icon.arrowR}
                </GhostBtn>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {[['100+', 'Contractor Partnerships'], ['$15M+', 'Revenue Generated'], ['No Lock-in', 'Month-to-Month']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{v}</div>
                    <div style={{ fontSize: '0.73rem', color: MUTED, fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: live pipeline card */}
          <Reveal delay={0.18} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
              <div style={{
                background: 'linear-gradient(160deg,rgba(13,31,60,0.97) 0%,rgba(7,12,28,0.99) 100%)',
                border: '1px solid rgba(255,255,255,0.11)',
                borderTopColor: 'rgba(26,111,255,0.5)',
                borderRadius: 28, padding: '32px 32px 28px',
                boxShadow: '0 32px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(26,111,255,0.1), 0 0 60px rgba(26,111,255,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(249,115,22,0.14)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ORANGE }}>
                    {Icon.hardhat}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', margin: 0 }}>Your Pipeline This Week</p>
                    <p style={{ color: MUTED, fontSize: '0.72rem', margin: 0 }}>Live · Updated automatically</p>
                  </div>
                </div>
                {[
                  { label: 'New Leads Captured',     val: '24',    color: BLUE_L  },
                  { label: 'Estimates Booked',        val: '11',    color: '#4ade80' },
                  { label: 'Jobs Closed This Month',  val: '6',     color: ORANGE  },
                  { label: 'Revenue in Pipeline',     val: '$142k', color: '#a78bfa' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: TEXT, fontSize: '0.84rem' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color, fontWeight: 800, fontSize: '0.98rem' }}>{val}</span>
                      <span style={{ color: '#4ade80', fontSize: '0.65rem', background: 'rgba(74,222,128,0.1)', borderRadius: 4, padding: '2px 5px', fontWeight: 700 }}>↑</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 18 }}>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '73%', background: 'linear-gradient(90deg,#1a6fff,#4d9fff)', borderRadius: 3 }} />
                  </div>
                  <p style={{ color: MUTED, fontSize: '0.7rem', margin: '6px 0 0' }}>73% of monthly revenue target</p>
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: -22, right: -14,
                  background: 'linear-gradient(135deg,rgba(74,222,128,0.16),rgba(22,163,74,0.1))',
                  border: '1px solid rgba(74,222,128,0.35)',
                  borderRadius: 14, padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
                </div>
                <div>
                  <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.78rem', margin: 0 }}>New estimate booked!</p>
                  <p style={{ color: 'rgba(74,222,128,0.65)', fontSize: '0.68rem', margin: 0 }}>Kitchen remodel · $28k project</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`@media(max-width:768px){.us-hero-grid{grid-template-columns:1fr !important; gap:44px !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL PROOF STRIP
// ═══════════════════════════════════════════════════════════════
function ProofStrip() {
  const testimonials = [
    { quote: "Before Velo, I was spending $3k a month on leads that never called back. Now I've got 8–12 estimates on the calendar every single week.", name: 'Marcus T.', co: 'Summit Roofing & Exteriors', loc: 'Dallas, TX' },
    { quote: "We went from slow-season panic to a fully booked schedule 3 months out. The follow-up system alone is worth every penny — it books jobs while we sleep.", name: 'Derek R.', co: 'Ridgeline Construction', loc: 'Denver, CO' },
    { quote: "I hired Velo in March. By June we had our best revenue month ever. Crew is booked solid. I wish I'd done this two years ago.", name: 'Tony G.', co: 'G&L Home Improvements', loc: 'Phoenix, AZ' },
  ]

  return (
    <section id="results" style={{ background: NAVY, padding: '80px 24px', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', color: MUTED, fontSize: '0.77rem', fontWeight: 700, letterSpacing: '0.11em', marginBottom: 48 }}>
            WHAT CONTRACTORS ARE SAYING
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, alignItems: 'stretch' }} className="us-proof-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} style={{ height: '100%' }}>
              <div style={{
                background: 'linear-gradient(160deg,rgba(13,26,48,0.9),rgba(7,12,28,0.95))',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTopColor: 'rgba(249,115,22,0.22)',
                borderRadius: 20, padding: 28,
                height: '100%', display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <Stars />
                <p style={{ color: TEXT, fontSize: '0.9rem', lineHeight: 1.68, margin: '16px 0 20px', fontStyle: 'italic', flex: 1 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg,${BLUE},${BLUE_L})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.86rem', margin: 0 }}>{t.name}</p>
                    <p style={{ color: MUTED, fontSize: '0.73rem', margin: 0 }}>{t.co} · {t.loc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:860px){.us-proof-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAIN POINTS
// ═══════════════════════════════════════════════════════════════
function PainPoints() {
  const pains = [
    { icon: Icon.dollar,   text: "Throwing money at ads that attract tire-kickers, not real jobs" },
    { icon: Icon.phone,    text: "Leads go cold while you're on the job site — they hire someone else before you call back" },
    { icon: Icon.chart,    text: "Feast-or-famine cycles — slammed one month, scrambling for work the next" },
    { icon: Icon.hardhat,  text: "Your crew is ready but your calendar isn't full enough to keep them busy year-round" },
    { icon: Icon.search,   text: "Competitors showing up on Google while you're invisible online" },
    { icon: Icon.settings, text: "No system — everything runs through your cell phone and sticky notes" },
    { icon: Icon.target,   text: "Getting leads from 3 counties over when you only want to work your local area" },
    { icon: Icon.hammer,   text: "Spending weekends on marketing instead of with your family" },
  ]

  return (
    <section style={{ background: BG, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ color: '#f87171', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.07em' }}>DOES THIS SOUND FAMILIAR?</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              You're Great at the Work.<br />
              <span style={{ background: 'linear-gradient(130deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Getting the Work Is the Problem.
              </span>
            </h2>
            <p style={{ color: TEXT, fontSize: '1.02rem', maxWidth: 540, margin: '0 auto' }}>
              Most contractors we talk to are excellent at what they do — but their marketing is costing them more jobs than it's bringing in.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, alignItems: 'stretch' }} className="us-pain-grid">
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 0.06} style={{ height: '100%' }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                background: 'rgba(11,26,48,0.65)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '18px 20px', height: '100%',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.22)'; e.currentTarget.style.background = 'rgba(239,68,68,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(11,26,48,0.65)' }}
              >
                <div style={{ color: '#f87171', marginTop: 1, flexShrink: 0 }}>{p.icon}</div>
                <p style={{ color: TEXT, fontSize: '0.89rem', lineHeight: 1.58, margin: 0 }}>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28}>
          <div style={{
            marginTop: 56, padding: '32px 36px', textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(249,115,22,0.07),rgba(26,111,255,0.06))',
            border: '1px solid rgba(249,115,22,0.2)', borderRadius: 20,
          }}>
            <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>There's a better way to run your pipeline.</p>
            <p style={{ color: TEXT, fontSize: '0.98rem', marginBottom: 24 }}>One system. Predictable leads. Estimates that show up on your calendar automatically.</p>
            <OrangeBtn onClick={() => document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works&nbsp;{Icon.arrowR}
            </OrangeBtn>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:620px){.us-pain-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SYSTEM / HOW IT WORKS
// ═══════════════════════════════════════════════════════════════
function SystemSection() {
  const steps = [
    {
      num: '01', icon: Icon.megaphone, color: BLUE,
      title: 'Ads That Find Real Homeowners in Your Backyard',
      sub: 'We run Facebook, Instagram, and Google campaigns targeting homeowners in your exact service area — not 3 counties over.',
      bullets: [
        'Every ad is built around your specific trade (roofing, remodeling, HVAC, plumbing, etc.)',
        'We target by zip code, home value, and homeowner behavior — so your budget reaches people who can actually afford your work',
        'Compelling creative that stops the scroll and gets homeowners to raise their hand',
        'You never touch the ad account — we set it up, run it, and improve it weekly',
      ],
    },
    {
      num: '02', icon: Icon.target, color: ORANGE,
      title: 'A Landing Page That Filters Out Tire-Kickers Automatically',
      sub: 'Your custom landing page pre-qualifies every lead before they ever reach your calendar.',
      bullets: [
        'Smart intake questions weed out price-shoppers — only serious homeowners with real projects move forward',
        'Built specifically for your trade with trust signals, photos, and proof that turns visitors into calls',
        'Mobile-optimized — most homeowners find you on their phone, and the page is built for that',
        'Every form submission goes straight into your CRM — nothing falls through the cracks',
      ],
    },
    {
      num: '03', icon: Icon.bot, color: '#a78bfa',
      title: 'AI Follow-Up That Books Estimates While You\'re on the Job',
      sub: 'The moment someone fills out your form, the system goes to work — no manual effort from you.',
      bullets: [
        'Automated text + email sent within 60 seconds of every new lead — before your competitors even pick up the phone',
        'Smart follow-up sequences that keep reaching out over 5–7 days if a lead doesn\'t respond right away',
        'Direct calendar booking — homeowners pick a time slot, it shows up in your schedule automatically',
        'You get a notification on your phone. That\'s it. The system does the rest.',
      ],
    },
    {
      num: '04', icon: Icon.chart, color: '#4ade80',
      title: 'Branded Content That Makes You the Go-To Contractor in Your Area',
      sub: 'We create professional marketing content for your business — all from a single photo of you.',
      bullets: [
        'Short-form video content, social posts, and ad creative built around your brand and personality',
        'AI-enhanced production that looks premium — without hiring a camera crew or spending weekends filming',
        'Consistent posting builds your local reputation so homeowners recognize your name before they even call',
        'You send us one good photo. We handle everything — writing, editing, publishing, and scheduling',
      ],
    },
    {
      num: '05', icon: Icon.chart, color: '#f59e0b',
      title: 'Weekly Optimization & A Clear View of Your Pipeline',
      sub: 'Every week you know exactly what\'s working, what you\'ve spent, and what\'s coming in.',
      bullets: [
        'Simple weekly report: leads captured, estimates booked, cost per booking, revenue in pipeline',
        'We meet regularly to review performance and make improvements — the system gets better every month',
        'No confusing dashboards or marketing jargon — just plain numbers that tell you if the investment is working',
        'As your business grows, we scale the system with you — more volume, new service areas, additional crews',
      ],
    },
  ]

  return (
    <section id="system" style={{ background: NAVY, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,111,255,0.08)', border: '1px solid rgba(26,111,255,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ color: BLUE_L, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.07em' }}>THE VELO MEDIA CONTRACTOR GROWTH SYSTEM</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              Everything Built & Managed For You —<br />
              <span style={{ background: 'linear-gradient(130deg,#1a6fff,#4d9fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                You Just Show Up to the Estimates
              </span>
            </h2>
            <p style={{ color: TEXT, fontSize: '1.02rem', maxWidth: 580, margin: '0 auto' }}>
              Most marketing agencies hand you a login and leave you to figure it out. We don't. Velo is a full done-for-you growth system — built, managed, and improved every single week so your pipeline stays full without you lifting a finger.
            </p>
          </div>
        </Reveal>

        {/* Done-for-you banner */}
        <Reveal delay={0.1}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 28,
            background: 'linear-gradient(135deg,rgba(249,115,22,0.07),rgba(26,111,255,0.07))',
            border: '1px solid rgba(249,115,22,0.18)',
            borderRadius: 16, padding: '20px 32px', marginBottom: 60,
          }}>
            <span style={{ color: ORANGE, fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.04em' }}>100% DONE FOR YOU:</span>
            {['Ads', 'Landing Page', 'Lead Qualification', 'AI Follow-Up', 'CRM & Pipeline', 'Branded Content', 'Weekly Reporting'].map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ color: TEXT, fontSize: '0.85rem', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Step cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <div style={{
                background: 'linear-gradient(160deg,rgba(11,26,48,0.97),rgba(7,12,28,0.99))',
                border: '1px solid rgba(255,255,255,0.07)',
                borderLeftColor: s.color,
                borderLeftWidth: 3,
                borderRadius: 20, padding: '32px 36px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start',
              }} className="us-step-card"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.45)` }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                {/* Left col */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `${s.color}15`, border: `1px solid ${s.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                      {s.icon}
                    </div>
                    <span style={{ background: `${s.color}18`, color: s.color, fontSize: '0.7rem', fontWeight: 800, borderRadius: 8, padding: '4px 10px', letterSpacing: '0.04em' }}>STEP {s.num}</span>
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                  <p style={{ color: ORANGE, fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.5 }}>{s.sub}</p>
                </div>
                {/* Right col: bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.bullets.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ color: TEXT, fontSize: '0.875rem', lineHeight: 1.6 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom callout */}
        <Reveal delay={0.2}>
          <div style={{
            marginTop: 48, padding: '32px 40px', textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(26,111,255,0.07),rgba(249,115,22,0.05))',
            border: '1px solid rgba(26,111,255,0.2)', borderRadius: 20,
          }}>
            <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: 8 }}>
              The average contractor who joins Velo sees their first booked estimate within 2–3 weeks.
            </p>
            <p style={{ color: TEXT, fontSize: '0.95rem', maxWidth: 560, margin: '0 auto 24px' }}>
              Not because we promise magic — but because the system is built to move fast, and everything is set up and live before most agencies even finish their onboarding paperwork.
            </p>
            <OrangeBtn onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
              See If You Qualify&nbsp;{Icon.arrowR}
            </OrangeBtn>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:720px){.us-step-card{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════
function StatsSection() {
  const stats = [
    { val: '100+',  label: 'Contractor Partnerships',  sub: 'Roofing, remodeling, HVAC, plumbing & more' },
    { val: '$15M+', label: 'Revenue Generated',         sub: 'For our contractor clients combined' },
    { val: '7+',    label: 'Years in the Industry',     sub: 'Deep expertise in contractor growth' },
    { val: '95%',   label: 'Client Retention Rate',     sub: 'We stay because results speak' },
  ]

  return (
    <section style={{
      background: `linear-gradient(135deg,rgba(26,111,255,0.07) 0%,rgba(249,115,22,0.04) 100%), ${BG}`,
      padding: '80px 24px',
      borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="us-stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div style={{ textAlign: 'center', padding: '36px 20px', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{
                  fontSize: 'clamp(2.2rem,3.8vw,3.2rem)', fontWeight: 900, lineHeight: 1, marginBottom: 10,
                  background: i % 2 === 0 ? 'linear-gradient(135deg,#f97316,#fbbf24)' : 'linear-gradient(135deg,#1a6fff,#4d9fff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{s.val}</div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', marginBottom: 4 }}>{s.label}</p>
                <p style={{ color: MUTED, fontSize: '0.75rem' }}>{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:740px){.us-stats-grid{grid-template-columns:repeat(2,1fr) !important} .us-stats-grid>div{border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.07)}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════
function ServicesSection() {
  // 9 services = perfect 3×3 grid, no orphans
  const services = [
    { icon: Icon.megaphone, color: BLUE,      title: 'Meta Ads',                    desc: 'Facebook & Instagram campaigns targeting homeowners in your exact service area who are actively looking to hire.' },
    { icon: Icon.search,    color: '#4ade80',  title: 'Google Ads',                  desc: 'Show up at the top when homeowners search for your trade. Pay-per-click that turns searchers into booked estimate calls.' },
    { icon: Icon.bot,       color: '#a78bfa',  title: 'Marketing Automation',        desc: 'AI-powered follow-up via text and email. New leads are contacted in under 60 seconds — automatically, 24/7, without you lifting a finger.' },
    { icon: Icon.settings,  color: ORANGE,     title: 'CRM & Pipeline Dashboard',    desc: 'A clean, simple view of every lead, every follow-up, and every booked job — visible from your phone, at a glance, at all times.' },
    { icon: Icon.map,       color: '#f59e0b',  title: 'Local SEO',                   desc: 'Get found on Google Maps and local search results. Long-term organic visibility that compounds month over month.' },
    { icon: Icon.target,    color: '#fb7185',  title: 'High-Converting Landing Pages', desc: 'Custom pages built for your trade that turn ad clicks into estimate calls — not just traffic. Every word and layout tested to convert.' },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="12" cy="10" r="2"/><path d="M12 8v0M9 12h6"/></svg>,
      color: '#22d3ee',
      title: 'Smart AI Website',
      desc: 'A fast, professional website built with AI — designed specifically for your contracting business. Converts visitors into leads, looks great on every device, and is yours to keep.',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
      color: '#e879f9',
      title: 'Branded Content & Social Posts',
      desc: 'Send us one photo of yourself. We write, design, and publish branded content that makes you look like the go-to contractor in your area — week after week, automatically.',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
      color: '#fbbf24',
      title: 'Review & Reputation Management',
      desc: 'Automatically prompt happy customers for Google reviews right after the job — so your rating grows on autopilot and new homeowners trust you before they even call.',
    },
  ]

  return (
    <section id="services" style={{ background: NAVY, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: MUTED, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.11em', marginBottom: 16 }}>WHAT WE BUILD FOR YOU</p>
            <h2 style={{ fontSize: 'clamp(1.9rem,3.4vw,2.9rem)', fontWeight: 900, color: '#fff', marginBottom: 16, lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              Everything You Need to Win Jobs Online
            </h2>
            <p style={{ color: TEXT, fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              We don't just run ads. We build the complete system — from first click to confirmed estimate.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }} className="us-svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07} style={{ height: '100%' }}>
              <div style={{
                background: 'linear-gradient(160deg,rgba(11,26,48,0.9),rgba(7,12,28,0.95))',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTopColor: `${s.color}25`,
                borderRadius: 18, padding: '26px 22px',
                height: '100%', display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${s.color}25`; e.currentTarget.style.borderColor = `${s.color}35` }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = `${s.color}25` }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}15`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 18, flexShrink: 0 }}>{s.icon}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: TEXT, fontSize: '0.86rem', lineHeight: 1.62, flex: 1 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:860px){.us-svc-grid{grid-template-columns:repeat(2,1fr) !important;}}
        @media(max-width:560px){.us-svc-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// CASE STUDY
// ═══════════════════════════════════════════════════════════════
function CaseStudy() {
  const metrics = [
    { label: 'Month 1 Estimates', val: '18',    note: 'booked from ads' },
    { label: 'Month 3 Revenue',   val: '$210k', note: 'in closed jobs' },
    { label: 'Cost Per Estimate', val: '$34',   note: 'vs. $180 before Velo' },
    { label: 'Month 6 Pipeline',  val: '$400k+',note: 'active projects' },
  ]

  return (
    <section style={{ background: BG, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <Reveal>
          <p style={{ textAlign: 'center', color: MUTED, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.11em', marginBottom: 48 }}>FEATURED RESULT</p>
        </Reveal>

        <div style={{
          background: 'linear-gradient(140deg,rgba(13,31,60,0.97),rgba(7,12,28,0.99))',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 28, overflow: 'hidden',
        }}>
          <div style={{ height: 3, background: 'linear-gradient(90deg,#f97316,#fbbf24,#1a6fff)' }} />
          <div style={{ padding: '52px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="us-case-grid">
            <Reveal>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 100, padding: '5px 14px', marginBottom: 24 }}>
                  <span style={{ color: '#fb923c', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em' }}>CASE STUDY — GENERAL CONTRACTOR</span>
                </div>
                <div style={{ fontSize: 'clamp(3rem,6vw,5rem)', fontWeight: 900, lineHeight: 1, marginBottom: 10 }}>
                  <span style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>$500k</span>
                </div>
                <p style={{ color: '#fff', fontSize: '1.35rem', fontWeight: 700, marginBottom: 24 }}>in 4 months — from scratch.</p>
                <blockquote style={{ borderLeft: '3px solid rgba(249,115,22,0.5)', paddingLeft: 20, margin: '0 0 28px' }}>
                  <p style={{ color: TEXT, fontSize: '0.93rem', lineHeight: 1.72, fontStyle: 'italic' }}>
                    "I was relying on referrals and it wasn't enough to keep my crew busy. Velo set up the whole system in two weeks. Within 30 days I had more estimates booked than the previous 3 months combined. The automation is insane — leads get followed up before I finish my morning coffee."
                  </p>
                  <footer style={{ color: MUTED, fontSize: '0.8rem', marginTop: 12, fontStyle: 'normal' }}>— Carlos M., Premier Build Group · Austin, TX</footer>
                </blockquote>
                <OrangeBtn onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Results Like This&nbsp;{Icon.arrowR}
                </OrangeBtn>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                {metrics.map(m => (
                  <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', marginBottom: 4 }}>{m.val}</div>
                    <div style={{ color: ORANGE, fontSize: '0.72rem', fontWeight: 700, marginBottom: 4 }}>{m.label}</div>
                    <div style={{ color: MUTED, fontSize: '0.7rem' }}>{m.note}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:740px){.us-case-grid{grid-template-columns:1fr !important; padding:32px 28px !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOUNDER
// ═══════════════════════════════════════════════════════════════
function FounderSection() {
  return (
    <section id="founder" style={{ background: NAVY, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="us-founder-grid">

          <Reveal style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 320, height: 390, borderRadius: 28, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(26,111,255,0.1)',
              }}>
                <img src={liorPortrait} alt="Leo Velikin — Founder, Velo Media" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 55%,rgba(4,12,26,0.65) 100%)' }} />
              </div>
              {/* Floating name badge */}
              <div style={{
                position: 'absolute', bottom: -14, right: 0,
                background: 'rgba(26,111,255,0.14)', border: '1px solid rgba(26,111,255,0.32)',
                borderRadius: 14, padding: '12px 18px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.86rem', margin: 0 }}>Leo Velikin</p>
                <p style={{ color: MUTED, fontSize: '0.72rem', margin: 0 }}>Founder · Velo Media</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p style={{ color: MUTED, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.11em', marginBottom: 16 }}>THE PERSON BEHIND THE SYSTEM</p>
              <h2 style={{ fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 22, lineHeight: 1.18, letterSpacing: '-0.02em' }}>
                Built By Someone Who Understands<br />
                <span style={{ background: 'linear-gradient(130deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  What Contractors Actually Need
                </span>
              </h2>
              <p style={{ color: TEXT, fontSize: '0.94rem', lineHeight: 1.76, marginBottom: 18 }}>
                I started Velo Media after watching great contractors lose jobs they should have won — not because of the quality of their work, but because their marketing was letting them down.
              </p>
              <p style={{ color: TEXT, fontSize: '0.94rem', lineHeight: 1.76, marginBottom: 18 }}>
                I built the Velo system around one goal:{' '}
                <strong style={{ color: '#fff' }}>fill your calendar with qualified homeowners and let you focus on the job.</strong>{' '}
                No fluff. No vanity metrics. Every dollar tied to a real outcome — booked estimates and closed jobs.
              </p>
              <p style={{ color: TEXT, fontSize: '0.94rem', lineHeight: 1.76, marginBottom: 32 }}>
                We work exclusively with contractors in the trades. That focus is what lets us get results most agencies can't touch.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  '100+ contractor partnerships built from the ground up',
                  'Specialized exclusively in home services & construction',
                  'Full system: ads → automation → CRM → coaching',
                  'No long-term contracts — results keep you here',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(249,115,22,0.14)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ORANGE, flexShrink: 0 }}>
                      {Icon.check}
                    </div>
                    <span style={{ color: TEXT, fontSize: '0.9rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:740px){.us-founder-grid{grid-template-columns:1fr !important; gap:48px !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════
function FAQSection() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'What types of contractors do you work with?', a: "We work with general contractors, remodelers, roofers, HVAC companies, plumbers, painters, landscapers, and other home service businesses. If you give estimates to homeowners, we can build a system that fills your calendar." },
    { q: 'How quickly will I start seeing results?', a: "Most clients start seeing booked estimates within the first 2–3 weeks. Significant pipeline growth typically shows up by week 4–6. We set realistic expectations upfront and show you exactly what to expect each step of the way." },
    { q: 'How does pricing work?', a: "We charge a flat monthly management fee. Your ad budget goes directly to Facebook and Google — you own it, not us. We'll give you full transparency on all costs during your free strategy call." },
    { q: 'Do I have to sign a long-term contract?', a: "No long-term contracts. We work month-to-month because we believe results should be enough to keep you. We do ask for a 30-day notice period since the system takes time to properly set up and optimize." },
    { q: "What if I'm already running ads with someone else?", a: "We do a full audit of what's currently running, what's working, and what's wasting budget. Many of our clients come from generic agencies. We rebuild everything specifically for your trade and service area." },
    { q: 'Do I need to be tech-savvy?', a: "Not at all. We build and manage the entire system for you. Your job is to answer the phone and show up to estimates. You'll get a simple dashboard to see your results — that's it." },
  ]

  return (
    <section style={{ background: BG, padding: '100px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: MUTED, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.11em', marginBottom: 14 }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.18, letterSpacing: '-0.02em' }}>Common Questions</h2>
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                background: open === i ? 'rgba(26,111,255,0.05)' : 'rgba(11,26,48,0.7)',
                border: `1px solid ${open === i ? 'rgba(26,111,255,0.28)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 16, overflow: 'hidden',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, textAlign: 'left',
                }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.94rem' }}>{faq.q}</span>
                  <span style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                    background: open === i ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${open === i ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: open === i ? ORANGE : MUTED,
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'all 0.25s ease',
                    fontSize: '1.3rem', lineHeight: 1, fontWeight: 300,
                  }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 260 : 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
                  <p style={{ color: TEXT, fontSize: '0.89rem', lineHeight: 1.72, padding: '0 24px 22px' }}>{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FINAL CTA
// ═══════════════════════════════════════════════════════════════
function FinalCTA() {
  const whatYouGet = [
    { icon: Icon.search,   title: 'A Full Audit of Your Current Marketing', desc: "We look at what you're running now, what's wasting money, and where you're losing jobs to competitors." },
    { icon: Icon.target,   title: 'A Clear Picture of Your Market', desc: 'We break down how many homeowners in your area are actively searching for your trade right now — and why they\'re not finding you.' },
    { icon: Icon.chart,    title: 'A Custom Growth Plan for Your Business', desc: 'A step-by-step breakdown of exactly what we would do for your specific business — which channels, what budget, what to expect and when.' },
    { icon: Icon.calendar, title: 'Real Numbers, Not Vague Promises', desc: 'You\'ll leave the call knowing your realistic cost per lead, estimated monthly bookings, and what a healthy pipeline looks like for your trade and area.' },
  ]

  return (
    <section id="cta" style={{
      background: `radial-gradient(ellipse 70% 55% at 50% 100%, rgba(26,111,255,0.11) 0%, transparent 65%), ${NAVY}`,
      padding: '100px 24px 80px',
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.22)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ORANGE, flexShrink: 0, animation: 'urgencyPulse 2s ease-in-out infinite' }} />
            <span style={{ color: '#fb923c', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.07em' }}>FREE 20-MINUTE GROWTH AUDIT — LIMITED SPOTS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.08, letterSpacing: '-0.03em' }}>
            Walk Away Knowing Exactly<br />
            <span style={{ background: 'linear-gradient(130deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              What Your Business Needs to Grow
            </span>
          </h2>
          <p style={{ color: TEXT, fontSize: '1.08rem', maxWidth: 620, margin: '0 auto 16px', lineHeight: 1.7 }}>
            This is not a sales call. It's a genuine 20-minute working session where we dig into your business, your market, and your current setup — and hand you a clear, honest plan for what it would take to keep your calendar full.
          </p>
          <p style={{ color: MUTED, fontSize: '0.92rem', maxWidth: 560, margin: '0 auto 52px' }}>
            You'll get real value from this call whether you work with us or not. No pressure, no pitch, no obligation.
          </p>
        </Reveal>

        {/* What you get on the call */}
        <Reveal delay={0.08}>
          <p style={{ color: MUTED, fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 24 }}>WHAT YOU GET ON THE CALL — FOR FREE</p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 52, textAlign: 'left', alignItems: 'stretch' }} className="us-cta-steps">
          {whatYouGet.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.09} style={{ height: '100%' }}>
              <div style={{
                background: 'rgba(11,26,48,0.85)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18, padding: '22px 24px', height: '100%',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ORANGE, flexShrink: 0 }}>
                  {w.icon}
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>{w.title}</h3>
                  <p style={{ color: TEXT, fontSize: '0.82rem', lineHeight: 1.62 }}>{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28}>
          <OrangeBtn large onClick={() => window.open('mailto:liorvelikin1@gmail.com?subject=Free%20Growth%20Audit%20Request', '_blank')}>
            {Icon.calendar}&nbsp;Book My Free Growth Audit
          </OrangeBtn>
          <p style={{ color: MUTED, fontSize: '0.8rem', marginTop: 16 }}>
            20 minutes · No commitment · No credit card · You'll learn something useful regardless
          </p>
        </Reveal>
      </div>
      <style>{`@media(max-width:620px){.us-cta-steps{grid-template-columns:1fr !important;}}`}</style>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function FooterUS() {
  return (
    <footer style={{ background: BG, borderTop: `1px solid ${BORDER}`, padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 36 }}>
          <VeloLogo style={{ height: 52, width: 'auto' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
            {[['Results', 'results'], ['How It Works', 'system'], ['Services', 'services'], ['About', 'founder'], ['Get Started', 'cta']].map(([l, id]) => (
              <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, fontSize: '0.86rem', fontWeight: 500, padding: 0, transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = MUTED}
              >{l}</button>
            ))}
          </div>
          <OrangeBtn onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '0.84rem', padding: '10px 22px' }}>
            Get Free Growth Audit
          </OrangeBtn>
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 22, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <p style={{ color: MUTED, fontSize: '0.78rem' }}>© 2025 Velo Media · Marketing systems for construction contractors in the USA.</p>
          <p style={{ color: MUTED, fontSize: '0.78rem' }}>Built for contractors who want more jobs, not more excuses.</p>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE ROOT
// ═══════════════════════════════════════════════════════════════
export default function UsaPage() {
  useEffect(() => {
    const prevDir  = document.documentElement.dir
    const prevLang = document.documentElement.lang
    document.documentElement.dir  = 'ltr'
    document.documentElement.lang = 'en'
    return () => {
      document.documentElement.dir  = prevDir
      document.documentElement.lang = prevLang
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Velo Media | More Booked Estimates for Construction Contractors</title>
        <meta name="description" content="Velo Media builds marketing systems for construction contractors — Meta ads, Google Ads, AI follow-up automation, and CRM — to fill your calendar with qualified estimate calls every month." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Velo Media | More Booked Estimates. More Jobs. Every Month." />
        <meta property="og:description" content="We build the marketing system that keeps your calendar full — so you focus on running jobs, not chasing leads." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={{ fontFamily: "'Inter','Heebo',system-ui,sans-serif", direction: 'ltr', background: BG, color: TEXT, overflowX: 'hidden' }}>
        <NavbarUS />
        <HeroUS />
        <ProofStrip />
        <PainPoints />
        <SystemSection />
        <StatsSection />
        <ServicesSection />
        <CaseStudy />
        <FounderSection />
        <FAQSection />
        <FinalCTA />
        <FooterUS />
      </div>
    </>
  )
}
