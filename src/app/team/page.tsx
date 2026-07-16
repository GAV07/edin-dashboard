'use client';

import React from 'react';
import Image from 'next/image';
import { IconArrowRight } from '@tabler/icons-react';

const team = [
  {
    name: "Andrew Davis",
    role: "Managing Partner",
    img: "/images/team/andrew.png",
    linkedin: "https://www.linkedin.com/in/andgerous/",
    line: "Leads fund strategy, investor relations, and portfolio construction.",
    prior: "Techstars · Comcast Ventures · MakerX",
    focus: ["Fund Strategy", "Investor Relations", "Portfolio Construction"],
    full: "Andrew is an award-winning founder, operator, and investor with over a decade building and scaling companies at the intersection of technology and impact. He has held venture roles at Techstars, Comcast Ventures, and MakerX, sourcing deals and shaping investment strategy across early-stage ecosystems. As founder of Phoenix, he built a platform recognized by Google's Community Leaders Program. At Edin he leads fund strategy, investor relations, and portfolio construction.",
  },
  {
    name: "Aurelia Edwards",
    role: "General Partner",
    img: "/images/team/aurelia.jpeg",
    linkedin: "https://www.linkedin.com/in/aureliaedwards/",
    line: "Leads portfolio support and the founder experience.",
    prior: "4× Founder · 25 yrs operating · Fortune 100 partner",
    focus: ["Portfolio Support", "Founder Experience", "Partnerships"],
    full: "Aurelia is an award-winning 4× founder and operator with 25 years building businesses across health, wellness, events, and technology, trusted by Fortune 100 enterprises. Her journey spans founding and operating multiple companies, giving her deep empathy for founders scaling outside traditional venture-backed ecosystems. At Edin she leads portfolio support and the founder experience — ensuring companies receive operational guidance, network access, and strategic support.",
  },
  {
    name: "Erick Gavin",
    role: "General Partner",
    img: "/images/team/erick.jpeg",
    linkedin: "https://www.linkedin.com/in/erickgavin/",
    line: "Leads technology, compliance, and fund operations.",
    prior: "Venture Miami (Exec. Dir.) · Reefside Ventures",
    focus: ["Technology", "Compliance", "Fund Operations"],
    full: "Erick is a respected ecosystem builder with over 10 years developing Miami's innovation landscape. As former Executive Director of Venture Miami, he helped position the city as a leading hub for startups and tech talent. He built Florida's largest incubator program and was a Partner at Reefside Ventures. At Edin he leads technology, compliance, and fund operations — building the firm's internal systems, including this investor portal.",
  },
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
      {/* Immersive hero */}
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

      {/* Team cards */}
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

      {/* Reach-us band */}
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
