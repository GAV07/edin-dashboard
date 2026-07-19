'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionLabel, MetricGrid } from '@/components/portal/ui';
import { FUND } from '@/constants/fund';
import { IconArrowRight } from '@tabler/icons-react';

/* ── Partner data (bios sourced from SBIC Form 2181, Principal Bios tab, Jan 2026) ── */
const team = [
  {
    name: 'Andrew Davis',
    role: 'Managing Partner',
    img: '/images/team/andrew.png',
    linkedin: 'https://www.linkedin.com/in/andgerous/',
    line: 'Leads fund strategy, investor relations, and portfolio construction.',
    prior: 'Techstars · MakerX',
    focus: ['Fund Strategy', 'Investor Relations', 'Portfolio Construction'],
    full: 'Before founding Edin with his partners, Andrew was an Investment Partner at MakerX and Investment Principal at Techstars. Over a 10+ year career in startups, venture capital, and corporate innovation, he has launched and managed accelerator programs, led 30+ investments, and evaluated ~8,000 companies globally across 15+ sectors and every continent. As founder of Phoenix, he built a platform recognized by Google\'s Community Leaders Program.',
    education: 'B.A. in Communication, Rutgers University–New Brunswick.',
    // TODO: confirm with Andrew whether "$785M raised / $1.3B exited" (portfolio-wide, not
    // attributed returns) has cleared Marketing Rule review for LP-facing use.
  },
  {
    name: 'Aurelia Edwards',
    role: 'General Partner',
    img: '/images/team/aurelia.jpeg',
    linkedin: 'https://www.linkedin.com/in/aureliaedwards/',
    line: 'Leads portfolio support and the founder experience.',
    prior: '4× Founder · Standard Measure Technologies · 25 yrs operating',
    focus: ['Portfolio Support', 'Founder Experience', 'Partnerships'],
    full: 'A founding partner of Edin Capital and member of the investment team. Before Edin, Aurelia founded Standard Measure Technologies Corp, an AI technology company, in 2018. With 25+ years of entrepreneurial experience in the health and wellness industry, she is a 4× founder and operator, backed and trusted by Fortune 100 enterprises. At Edin she leads portfolio support and the founder experience — ensuring companies receive operational guidance, network access, and strategic support.',
    education: 'B.S. in Biology & B.A. in Chemistry, Florida International University; M.A. in Cosmetic Science, Fairleigh Dickinson University.',
  },
  {
    name: 'Erick Gavin',
    role: 'General Partner & CCO',
    img: '/images/team/erick.jpeg',
    linkedin: 'https://www.linkedin.com/in/erickgavin/',
    line: 'Leads technology, compliance, and fund operations.',
    prior: 'Venture Miami (Exec. Dir.) · Black Innovation Alliance · Reefside Ventures',
    focus: ['Technology', 'Compliance', 'Fund Operations'],
    full: 'Over a decade at the intersection of economic development, venture operations, and investment strategy. As former Executive Director of Venture Miami, Erick deployed $4M+ in strategic capital, raised $6M in STEM scholarships, managed $15M in digital assets supporting innovation, and led the creation of Miami\'s largest technology incubator. A licensed attorney, he has advised early-stage companies for 8+ years. He later served as Program Design & Data Insights Lead at the Black Innovation Alliance, directing $2M in entrepreneurial funding and building data systems for performance measurement.',
    education: 'J.D., University of Miami; B.A. in Philosophy & Psychology, University of Michigan.',
  },
];

/* ── Andrew's Techstars investment track record (SBIC Form 2181, as of Nov 2025) ──
   Gross, unrealized. $0 realized/distributed. Source: SBIC application.
   MOIC denominator is disputed — do NOT publish an aggregate multiple until
   Andrew confirms the correct invested-capital figure.                         */

const markups = [
  { name: 'hampr', sector: 'Consumer services / marketplace', moic: '7.9×' },
  { name: 'Edge Sound Research', sector: 'Media / audio IoT', moic: '6.9×' },
  { name: 'Fluix', sector: 'Data centers / AI', moic: '5.1×' },
  { name: 'Ivee', sector: 'HR / recruiting', moic: '4.7×' },
  { name: 'Vortex IQ', sector: 'eCommerce / AI', moic: '4.5×' },
  { name: 'ema', sector: 'Healthcare / AI', moic: '4.0×' },
  { name: 'Fêtefully', sector: 'Consumer services / events', moic: '3.6×' },
];

const heldAtCost = [
  'Arc Simulations', 'Armur AI', 'AyaHQ', 'Beatpulse', 'Context Data',
  'Enlightapp', 'Livo', 'Made with Black Culture', 'MetaSoccer', 'Moja',
  'Orakle Weather', 'Placement', 'Story Spark', 'Test Jar Labs', 'Vestinda',
];

const writtenOff = [
  'SoleSafe', 'Column', 'ezWiFi', 'Flourish', 'hyphen', 'Moss',
  'Mowies', 'Reibase', 'Rombo', 'Recess', 'StashPad',
];

/* ── Ecosystem outcomes ── */
const ecosystemItems = [
  {
    label: 'Venture Miami',
    detail: 'Former Executive Director — deployed $4M+ in strategic capital, raised $6M in STEM scholarships, managed $15M in digital assets supporting innovation',
  },
  {
    label: 'Miami\'s largest incubator',
    detail: 'Built and operated the city\'s largest technology incubator program, supporting early-stage founders at scale',
  },
  {
    label: 'SPARC 2026',
    detail: 'Leading a tri-county accelerator program bridging South Florida\'s startup ecosystem',
  },
  {
    label: 'MakerX · Techstars',
    detail: 'Investment Partner and Investment Principal roles — sourcing, diligence, portfolio support, and investment strategy across 33+ deals',
  },
  {
    label: 'Google Community Leaders',
    detail: 'Phoenix platform recognized by Google\'s Community Leaders Program for entrepreneurial development',
  },
  {
    label: 'Black Innovation Alliance',
    detail: 'Program Design & Data Insights Lead — directed $2M in entrepreneurial funding; built data systems for national ecosystem performance',
  },
];

/* ── Pipeline stats (from Deal Flow page) ── */
const pipelineStats = [
  { label: 'Companies evaluated', value: '634' },
  { label: 'Founders screened', value: '2,226' },
  { label: 'Sourcing channels', value: '85+' },
  { label: 'Target investments', value: FUND.targetPortfolio },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14, flex: 'none' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
    </svg>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <div className="team-hero">
        <Image
          src="/images/forest.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.9 }}
          priority
        />
        <div className="team-hero-overlay" />
        <div className="team-hero-content">
          <span className="team-hero-eyebrow">
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--gold-400)' }}>08</span>
            <span style={{ color: 'var(--gold-200)' }}>The partners</span>
          </span>
          <h1 className="team-hero-title">
            The people accountable for <em>Fund I.</em>
          </h1>
          <p className="team-hero-lede">
            Not a faceless committee. Three operators who have built, raised, and scaled — and who answer for every dollar Edin deploys.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PARTNER CARDS
      ═══════════════════════════════════════════════════════════ */}
      <div className="team-cards">
        {team.map((p) => (
          <div className="team-card panel panel--accent" key={p.name}>
            <div className="team-card-photo">
              <Image
                src={p.img}
                alt={p.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
            <div className="team-card-body">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--text-strong)', lineHeight: 1.1 }}>{p.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green-700)', fontWeight: 600, marginTop: 5 }}>{p.role}</div>
                </div>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-linkedin-btn"
                >
                  <LinkedInIcon />
                  <span>Connect</span>
                </a>
              </div>

              <p className="team-card-tagline">{p.line}</p>

              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.66, color: 'var(--text-secondary)', margin: 0 }}>{p.full}</p>

              {p.education && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '6px 0 0' }}>{p.education}</p>
              )}

              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--text-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Focus</span>
                <div className="chip-row">
                  {p.focus.map((f) => (
                    <span className="chip" key={f}>{f}</span>
                  ))}
                </div>
              </div>

              <div className="team-card-prior">
                Previously · {p.prior}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TRACK RECORD — FRAMING NOTE
      ═══════════════════════════════════════════════════════════ */}
      <p className="section-note" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
        {FUND.legalName} is a first-time fund with no fund-level track record or operating history.
        The investment track record below reflects deals made by Andrew Davis in his prior role at
        Techstars — not investments of Edin Capital. Figures are gross of fees and expenses,
        unrealized, and stated as of November 2025; no value has been realized or distributed.
        Past performance is not indicative of future results.
      </p>

      {/* ═══════════════════════════════════════════════════════════
          i. INVESTMENT TRACK RECORD (Andrew Davis — Techstars)
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel
        num="i"
        note="33 investments sourced, diligenced, and selected while serving as Investment Principal and Global Startup Engagement Lead at Techstars (2021–2024). Gross, unrealized, as of Nov 2025."
      >
        Investment track record
      </SectionLabel>

      <MetricGrid
        cols={4}
        items={[
          { label: 'Total investments', value: '33' },
          { label: 'Marked up', value: '7', sub: '3.6×–7.9× gross unrealized' },
          { label: 'Held at cost', value: '15', sub: '1.0×' },
          { label: 'Written off', value: '11' },
        ]}
      />

      <div className="panel panel--cream panel-pad" style={{ marginTop: 'var(--space-4)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
          At Techstars, Andrew served as <strong style={{ color: 'var(--text-strong)' }}>Investment Principal</strong> and
          later <strong style={{ color: 'var(--text-strong)' }}>Global Startup Engagement Lead</strong>. He personally
          sourced, qualified, and diligenced opportunities, synthesized findings into recommendations, and
          presented them in investment committee meetings. In the Global Startup Engagement Lead role he
          sourced and screened across geographies and multiple continents, and in a pilot initiative took on
          Managing Director-level responsibility for a cohort, owning the full investment process.
        </p>
      </div>

      {/* Notable markups table */}
      <div className="panel" style={{ marginTop: 'var(--space-4)', overflow: 'hidden' }}>
        <div className="panel-head">
          <span className="panel-title">Notable markups</span>
          <span className="panel-unit">Gross, unrealized · Nov 2025</span>
        </div>
        <table className="dtable" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Company</th>
              <th style={{ textAlign: 'left' }}>Sector</th>
              <th>Gross MOIC</th>
            </tr>
          </thead>
          <tbody>
            {markups.map((m) => (
              <tr key={m.name}>
                <td style={{ textAlign: 'left', fontWeight: 600 }}>{m.name}</td>
                <td style={{ textAlign: 'left' }}>{m.sector}</td>
                <td>{m.moic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Held at cost + written off */}
      <div className="ed-grid ed-g2" style={{ marginTop: 'var(--space-4)' }}>
        <div className="panel panel-pad">
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-strong)', marginBottom: 'var(--space-3)' }}>
            Held at cost <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>1.0× · 15 companies</span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
            {heldAtCost.join(', ')}.
          </p>
        </div>
        <div className="panel panel-pad">
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-strong)', marginBottom: 'var(--space-3)' }}>
            Written off <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>0.0× · 11 companies</span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
            {writtenOff.join(', ')}.
          </p>
        </div>
      </div>

      {/* TODO: Aggregate MOIC — CONFIRM invested-capital denominator with Andrew before publishing.
         SBIC filed $2.06M denominator → 2.96× MOIC; sum-of-line-items = $3.76M → 1.62×.
         Do not show either figure until the discrepancy is resolved. */}

      {/* ═══════════════════════════════════════════════════════════
          ii. ECOSYSTEM OUTCOMES
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel
        num="ii"
        note="Qualitative, verifiable outcomes from the partners' prior roles — experience and ecosystem reach, not attributed fund performance."
      >
        Ecosystem outcomes
      </SectionLabel>
      <div className="ed-grid ed-g3">
        {ecosystemItems.map((item) => (
          <div key={item.label} className="panel panel-pad">
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-strong)', marginBottom: 'var(--space-2)' }}>
              {item.label}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          iii. SOURCING CAPABILITY
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel
        num="iii"
        note="Pipeline metrics from the fund's proprietary sourcing engine. See the Deal Flow page for full distribution analysis."
      >
        Sourcing capability
      </SectionLabel>
      <MetricGrid cols={4} items={pipelineStats} />
      <div style={{ marginTop: 'var(--space-3)' }}>
        <Link
          href="/deal-flow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 'var(--text-sm)', fontWeight: 600,
            color: 'var(--green-700)', textDecoration: 'none',
          }}
        >
          Full pipeline analysis
          <IconArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CONTACT BAND
      ═══════════════════════════════════════════════════════════ */}
      <div className="team-cta-band">
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: '#fff' }}>Every partner is reachable.</div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--green-100)', marginTop: 5 }}>Diligence questions, references, or a direct conversation — we answer.</div>
        </div>
        <a href="mailto:info@edin.capital" className="team-cta-btn">
          <span>info@edin.capital</span>
          <IconArrowRight style={{ width: 16, height: 16 }} />
        </a>
      </div>
    </>
  );
}
