'use client';

import React, { useState } from 'react';
import { PageHead, SectionLabel, MetricGrid } from '@/components/portal/ui';

/* ── Pipeline data (from Edin Radar: 634 companies, 2,226 founders) ── */

const stats = [
  { label: 'Companies evaluated', value: '634' },
  { label: 'Founders screened', value: '2,226' },
  { label: 'Sourcing channels', value: '85+' },
  { label: 'Target investments', value: '30' },
];

const channels = [
  { count: '50+', scope: 'Local', desc: 'Direct relationships with founders, service providers, community organizations, and ecosystem partners across South Florida' },
  { count: '30+', scope: 'Regional', desc: 'Southeast-focused accelerators, incubators, angel groups, venture studios, and university programs' },
  { count: '5+', scope: 'National', desc: 'National databases, accelerator networks, and platform partnerships with broad deal coverage across the US' },
];

const pipelineByIndustry = [
  { label: 'AI & Data Analytics', pct: 11.0 },
  { label: 'Software & Apps', pct: 7.4 },
  { label: 'Health & Digital Health', pct: 7.0 },
  { label: 'Manufacturing & Engineering', pct: 5.8 },
  { label: 'Agriculture & Food', pct: 5.8 },
  { label: 'Sustainability & Energy', pct: 5.4 },
  { label: 'Social Impact', pct: 2.7 },
  { label: 'Biotechnology', pct: 2.5 },
  { label: 'Education', pct: 2.4 },
  { label: 'FinTech', pct: 2.3 },
];

const pipelineByFunding = [
  { label: 'Bootstrapped', pct: 39 },
  { label: 'Seed', pct: 28 },
  { label: 'Pre-seed', pct: 26 },
  { label: 'Series A+', pct: 7 },
];

const companiesByRegion = [
  { label: 'Midwest', pct: 38 },
  { label: 'Other', pct: 27 },
  { label: 'South', pct: 19 },
  { label: 'West', pct: 8 },
  { label: 'Northeast', pct: 6 },
  { label: 'Florida', pct: 2 },
];

const foundersByRegion = [
  { label: 'Other US', pct: 49 },
  { label: 'South Florida', pct: 32 },
  { label: 'New York Metro', pct: 7 },
  { label: 'SF Bay Area', pct: 4 },
  { label: 'Los Angeles', pct: 3 },
  { label: 'Atlanta', pct: 3 },
  { label: 'Washington DC', pct: 2 },
];

const pipelineByStage = [
  { label: 'Pre-revenue', pct: 85 },
  { label: 'Growth ($1M–$3M)', pct: 8 },
  { label: 'Early ($500K–$1M)', pct: 4 },
  { label: 'Scale ($3M+)', pct: 3 },
];


/* ── Bar chart helper ── */

function BarChart({ title, data }: { title: string; data: { label: string; pct: number }[] }) {
  const max = Math.max(...data.map((d) => d.pct));
  return (
    <div>
      <h4 className="panel-title" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>{title}</h4>
      <div className="bars">
        {data.map((d) => (
          <div className="bar-row" key={d.label}>
            <div className="bar-top">
              <span className="l">{d.label}</span>
              <span className="v">{d.pct}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(d.pct / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function DealFlowPage() {
  const [view, setView] = useState<'companies' | 'founders'>('companies');

  return (
    <>
      {/* Header */}
      <PageHead
        num="05"
        eyebrow="Deal flow & pipeline"
        title={<>A pipeline others <em>can&rsquo;t access.</em></>}
        lede="The Venture Bond opens a market traditional VC structurally cannot serve — durable, growth-oriented companies that have been overlooked by institutional capital. Combined with deep community integration in underserved markets, our sourcing engine produces deal flow that doesn't exist for other funds."
      />

      {/* Top-line metrics */}
      <MetricGrid items={stats} cols={4} />

      {/* i. Sourcing architecture */}
      <SectionLabel
        num="i"
        note="Our sourcing advantage is built on community integration, not transaction volume. We're embedded in the ecosystems where founders operate — contributing directly to the organizations that serve them and building bidirectional relationships that generate proprietary, inbound deal flow."
      >
        Sourcing architecture
      </SectionLabel>
      <div className="ed-grid ed-g3">
        {channels.map((ch) => (
          <div className="panel panel--accent panel-pad" key={ch.scope}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--text-strong)' }}>{ch.count}</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>{ch.scope}</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {ch.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ii. Pipeline distribution */}
      <SectionLabel
        num="ii"
        note="Our pipeline reflects the broad market we evaluate. Our investment targets are the profitable, growth-stage companies within it — filtered through our thesis criteria from a wide and deliberate funnel."
        extra={
          <div className="seg">
            <button
              className={view === 'companies' ? 'is-active' : ''}
              onClick={() => setView('companies')}
            >
              634 companies
            </button>
            <button
              className={view === 'founders' ? 'is-active' : ''}
              onClick={() => setView('founders')}
            >
              2,226 founders
            </button>
          </div>
        }
      >
        Pipeline distribution
      </SectionLabel>

      {view === 'companies' && (
        <div className="ed-grid ed-g3">
          <div className="panel panel-pad">
            <BarChart title="By industry" data={pipelineByIndustry} />
          </div>
          <div className="panel panel-pad">
            <BarChart title="By funding stage" data={pipelineByFunding} />
          </div>
          <div className="panel panel-pad">
            <BarChart title="By region" data={companiesByRegion} />
          </div>
        </div>
      )}

      {view === 'founders' && (
        <div className="ed-grid ed-g3">
          <div className="panel panel-pad">
            <BarChart title="By region" data={foundersByRegion} />
          </div>
          <div className="panel panel-pad">
            <BarChart title="By revenue stage" data={pipelineByStage} />
          </div>
          <div className="panel panel-pad">
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)' }}>
              Based on 2,226 founders screened from partner networks. Revenue stage distribution reflects the evaluated company pipeline — our investment targets are the profitable, growth-stage subset.
            </p>
          </div>
        </div>
      )}

    </>
  );
}
