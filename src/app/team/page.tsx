'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PageHead } from '@/components/portal/ui';
import { IconArrowRight } from '@tabler/icons-react';

const team = [
  {
    name: "Andrew Davis",
    role: "Managing Partner",
    initials: "AD",
    img: "/images/team/andrew.jpeg",
    short: "Award-winning founder, operator, and investor with venture experience at Techstars, Comcast, and MakerX.",
    full: "Andrew is an award-winning founder, operator, and investor with over a decade building and scaling companies at the intersection of technology and impact. He has held venture roles at Techstars, Comcast Ventures, and MakerX, sourcing deals and shaping investment strategy across early-stage ecosystems. As founder of Phoenix, he built a platform recognized by Google's Community Leaders Program. At Edin he leads fund strategy, investor relations, and portfolio construction.",
  },
  {
    name: "Aurelia Edwards",
    role: "General Partner",
    initials: "AE",
    img: "/images/team/aurelia.jpeg",
    short: "Award-winning 4× founder and operator with 25 years across health, wellness, events, and technology.",
    full: "Aurelia is an award-winning 4× founder and operator with 25 years building businesses across health, wellness, events, and technology, trusted by Fortune 100 enterprises. Her journey spans founding and operating multiple companies, giving her deep empathy for founders scaling outside traditional venture-backed ecosystems. At Edin she leads portfolio support and the founder experience — ensuring companies receive operational guidance, network access, and strategic support.",
  },
  {
    name: "Erick Gavin",
    role: "General Partner",
    initials: "EG",
    img: "/images/team/erick.jpeg",
    short: "Ecosystem builder with 10 years developing Miami's innovation landscape. Former Director of Venture Miami.",
    full: "Erick is a respected ecosystem builder with over 10 years developing Miami's innovation landscape. As former Executive Director of Venture Miami, he helped position the city as a leading hub for startups and tech talent. He built Florida's largest incubator program and was a Partner at Reefside Ventures. At Edin he leads technology, data infrastructure, and deal-flow operations — building the firm's internal systems, including this investor portal.",
  },
];

export default function TeamPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <PageHead
        num="08"
        eyebrow="The partners"
        title={<>Operators and investors, <em>not bystanders.</em></>}
        lede="Real-world operators with deep expertise in venture, technology, and ecosystem building — the people accountable for Fund I."
      />

      <div className="ed-grid ed-g3" style={{ alignItems: 'start' }}>
        {team.map((p, i) => (
          <div className="panel panel--accent" key={p.name}>
            <div className="panel-pad" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span
                  style={{
                    width: 56, height: 56, borderRadius: '50%', flex: 'none', overflow: 'hidden',
                    background: 'var(--green-700)', color: 'var(--paper-100)',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--font-mono)', fontWeight: 600,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={56}
                    height={56}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--text-strong)' }}>{p.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-700)', fontWeight: 600, marginTop: 2 }}>{p.role}</div>
                </div>
              </div>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{p.short}</p>

              {open === i && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                  {p.full}
                </p>
              )}

              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: 'var(--green-700)', alignSelf: 'flex-start',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                {open === i ? 'Show less' : 'Read full bio'}
                <IconArrowRight
                  style={{
                    width: 14, height: 14,
                    transform: open === i ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
