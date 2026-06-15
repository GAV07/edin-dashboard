'use client';

import React, { useState } from 'react';
import { PageHead, SectionLabel, MetricGrid, Badge } from '@/components/portal/ui';
import { C } from '@/components/portal/charts';

/* ── Pipeline data (from Edin Radar: 634 companies, 2,226 founders) ── */

const stats = [
  { label: 'Companies evaluated', value: '634' },
  { label: 'Founders screened', value: '2,226' },
  { label: 'Sourcing channels', value: '85+' },
  { label: 'Target investments', value: '35' },
];

const evaluationTiers = [
  { tier: 'Fast Track', tone: 'brand' as const, description: 'Companies that closely match our thesis across all five dimensions and are prioritized for diligence.' },
  { tier: 'Thesis Strong', tone: 'info' as const, description: 'Companies with strong thesis alignment and market potential that warrant deeper evaluation.' },
  { tier: 'Standard', tone: 'neutral' as const, description: 'Companies in our pipeline being monitored for thesis fit as they develop.' },
];

const channels = [
  { count: '5+', scope: 'National', desc: 'National databases, accelerator networks, and platform partnerships with broad deal coverage across the US' },
  { count: '30+', scope: 'Regional', desc: 'Southeast-focused accelerators, incubators, angel groups, venture studios, and university programs' },
  { count: '50+', scope: 'Local', desc: 'Direct relationships with founders, service providers, community organizations, and ecosystem partners across South Florida' },
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

const processSteps = [
  { step: '1', title: 'Sourcing', desc: 'Identified through network, inbound, or data-driven discovery', time: 'Ongoing' },
  { step: '2', title: 'Screening', desc: 'AI-assisted scoring on thesis match, market potential, and execution capability', time: 'Week 1' },
  { step: '3', title: 'Diligence', desc: 'Deep dive on financials, team, product-market fit, and Venture Bond suitability', time: 'Weeks 2–3' },
  { step: '4', title: 'Decision', desc: 'Investment committee review, term sheet, and closing', time: 'Week 4' },
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
        title={<>Pipeline built on <em>relationships.</em></>}
        lede="Our pipeline is built on deep relationships across multiple channels — from national platforms to hyperlocal ecosystem connections cultivated over a decade in South Florida. Data shown reflects our active evaluation pipeline."
      />

      {/* Top-line metrics */}
      <MetricGrid items={stats} cols={4} />

      {/* i. Evaluation pipeline */}
      <SectionLabel num="i">Evaluation pipeline</SectionLabel>
      <div className="ed-grid ed-g3">
        {evaluationTiers.map((t) => (
          <div className="panel panel-pad" key={t.tier}>
            <Badge tone={t.tone} dot>{t.tier}</Badge>
            <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {t.description}
            </p>
          </div>
        ))}
      </div>

      {/* ii. Sourcing channels */}
      <SectionLabel num="ii">Sourcing channels</SectionLabel>
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

      {/* Pipeline distribution */}
      <SectionLabel
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
              Based on 2,226 founders screened from partner LinkedIn networks. Revenue stage distribution reflects the evaluated company pipeline.
            </p>
          </div>
        </div>
      )}

      {/* iii. Investment process */}
      <SectionLabel num="iii">Investment process</SectionLabel>
      <div className="ed-grid ed-g4">
        {processSteps.map((s) => (
          <div className="panel panel-pad" key={s.step}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--green-100)', color: 'var(--green-700)',
                fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {s.step}
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', color: 'var(--text-strong)' }}>
                {s.title}
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-3)' }}>
              {s.desc}
            </p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {s.time}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
