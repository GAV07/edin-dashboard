'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/portal/ui';

/* ══════════════════════════════════════════════════════════════════
   Types — shaped to match Intake CompanyRow + Radar CompanyEvaluation
   ══════════════════════════════════════════════════════════════════ */

type PipelineStage = 'sourcing' | 'screening' | 'diligence' | 'decision';
type RevenueBand = 'pre_revenue' | 'under_500k' | '500k_1m' | '1m_5m' | '5m_plus';

interface PipelineCompany {
  id: string;
  industry: string;
  revenueBand: RevenueBand;
  stage: PipelineStage;
  highlights: string[];
  tier: 1 | 2 | 3;
  region: string;
}

/* ══════════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════════ */

function revBand(band: RevenueBand): string {
  switch (band) {
    case 'pre_revenue': return 'Pre-rev';
    case 'under_500k': return '< $500K';
    case '500k_1m': return '$500K–$1M';
    case '1m_5m': return '$1M–$5M';
    case '5m_plus': return '$5M+';
  }
}

function stageLabel(stage: PipelineStage): string {
  switch (stage) {
    case 'sourcing': return 'Sourcing';
    case 'screening': return 'Screening';
    case 'diligence': return 'Diligence';
    case 'decision': return 'Decision';
  }
}

function stageTone(stage: PipelineStage): 'brand' | 'info' | 'neutral' {
  switch (stage) {
    case 'sourcing': return 'neutral';
    case 'screening': return 'brand';
    case 'diligence': return 'info';
    case 'decision': return 'brand';
  }
}

/* ══════════════════════════════════════════════════════════════════
   Static pipeline data — anonymized, representative of real pipeline
   Sorted by stage desc (diligence → decision → screening → sourcing),
   then revenue desc — most advanced / highest signal first.
   ══════════════════════════════════════════════════════════════════ */

const pipeline: PipelineCompany[] = [
  // Diligence
  { id: 'PC-009', industry: 'Health & Digital Health', revenueBand: '5m_plus', stage: 'diligence', tier: 1, region: 'South', highlights: ['$5.8M ARR, 60% GM · 2 payor contracts'] },
  { id: 'PC-008', industry: 'FinTech', revenueBand: '1m_5m', stage: 'diligence', tier: 1, region: 'SE Florida', highlights: ['$4.1M rev, profitable · 6 bank partnerships'] },
  // Decision
  { id: 'PC-010', industry: 'Manufacturing & Engineering', revenueBand: '1m_5m', stage: 'decision', tier: 1, region: 'Southeast', highlights: ['$2.9M rev, 35% net · sole-source DoD sub'] },
  // Screening
  { id: 'PC-005', industry: 'Health & Digital Health', revenueBand: '1m_5m', stage: 'screening', tier: 1, region: 'SE Florida', highlights: ['$3.2M ARR, 52% margins · FDA-cleared device'] },
  { id: 'PC-006', industry: 'Manufacturing & Engineering', revenueBand: '1m_5m', stage: 'screening', tier: 1, region: 'Midwest', highlights: ['$1.8M rev, 45% YoY · proprietary tooling IP'] },
  { id: 'PC-007', industry: 'Software & Apps', revenueBand: '500k_1m', stage: 'screening', tier: 2, region: 'Northeast', highlights: ['$920K ARR, net-neg churn · 4× founder'] },
  // Sourcing
  { id: 'PC-002', industry: 'Agriculture & Food', revenueBand: '1m_5m', stage: 'sourcing', tier: 2, region: 'Midwest', highlights: ['$2.1M rev, profitable · 4 distributors, 38% GM'] },
  { id: 'PC-004', industry: 'Sustainability & Energy', revenueBand: '500k_1m', stage: 'sourcing', tier: 2, region: 'South', highlights: ['$780K ARR, 40% YoY · municipal, 3 states'] },
  { id: 'PC-001', industry: 'AI & Data Analytics', revenueBand: '500k_1m', stage: 'sourcing', tier: 2, region: 'SE Florida', highlights: ['$600K ARR, bootstrapped · 3 pilots, 2 patents'] },
  { id: 'PC-003', industry: 'Education', revenueBand: 'under_500k', stage: 'sourcing', tier: 3, region: 'Southeast', highlights: ['Workforce training · 12 partners, 85% completion'] },
];

const stageCounts = {
  sourcing: pipeline.filter((c) => c.stage === 'sourcing').length,
  screening: pipeline.filter((c) => c.stage === 'screening').length,
  diligence: pipeline.filter((c) => c.stage === 'diligence').length,
  decision: pipeline.filter((c) => c.stage === 'decision').length,
};

const STAGE_ORDER: PipelineStage[] = ['sourcing', 'screening', 'diligence', 'decision'];

const STAGE_COLORS: Record<PipelineStage, string> = {
  sourcing: 'var(--green-700)',
  screening: 'var(--green-500)',
  diligence: 'var(--teal-600)',
  decision: 'var(--gold-500)',
};

/* Funnel bar widths — proportional to stage count */
const FUNNEL_WIDTHS: Record<PipelineStage, string> = {
  sourcing: '40%',
  screening: '30%',
  diligence: '20%',
  decision: '10%',
};

/* Company profile archetypes */
const profile = [
  { label: 'Typical revenue', value: '$1M–$5M' },
  { label: 'Growth profile', value: '25–50% YoY' },
  { label: 'Operating margins', value: '30%+' },
  { label: 'Prior capital', value: '< $500K' },
  { label: 'Team size', value: '8–25' },
  { label: 'Sectors', value: 'Essential' },
];

/* Sourcing channels */
const sources = [
  { n: '50+', scope: 'Local', desc: 'Founders, service providers & community partners across South Florida' },
  { n: '30+', scope: 'Regional', desc: 'Southeast accelerators, angel groups, venture studios & universities' },
  { n: '5+', scope: 'National', desc: 'National databases, accelerator networks & platform partnerships' },
];

/* Pipeline mix — top industries */
const topIndustries = [
  { label: 'AI & Data', pct: 11, max: 11 },
  { label: 'Software', pct: 7.4, max: 11 },
  { label: 'Health', pct: 7, max: 11 },
  { label: 'Manufacturing', pct: 5.8, max: 11 },
  { label: 'Agriculture', pct: 5.8, max: 11 },
];

/* Pipeline mix — by funding stage */
const byFunding = [
  { label: 'Bootstrapped', pct: 39, max: 39 },
  { label: 'Seed', pct: 28, max: 39 },
  { label: 'Pre-seed', pct: 26, max: 39 },
  { label: 'Series A+', pct: 7, max: 39 },
];

/* ══════════════════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════════════════ */

export default function DealFlowPage() {
  const [activeStage, setActiveStage] = useState<PipelineStage | 'all'>('all');

  const filteredPipeline = activeStage === 'all'
    ? pipeline
    : pipeline.filter((c) => c.stage === activeStage);

  const total = pipeline.length;

  function toggleStage(s: PipelineStage) {
    setActiveStage((prev) => (prev === s ? 'all' : s));
  }

  return (
    <>
      {/* ── Compact head: title left, KPI strip right ── */}
      <div className="dfx-head">
        <div className="h-left">
          <div className="page-eyebrow" style={{ marginBottom: 10 }}>
            <span className="eyebrow-pill">
              <span className="eyebrow-num">05</span>
              <span className="eyebrow-text">Deal flow &amp; pipeline</span>
            </span>
          </div>
          <h1 className="dfx-title">Active pipeline. <em>Real deals in motion.</em></h1>
          <p className="dfx-lede">Thesis-driven sourcing, rigorous evaluation, anonymized for confidentiality. Ten companies moving through screening today.</p>
        </div>
        <div className="kpi-strip">
          <div className="kpi"><span className="kpi-v">{total}</span><span className="kpi-l">Active pipeline</span></div>
          <div className="kpi"><span className="kpi-v">{stageCounts.diligence + stageCounts.decision}</span><span className="kpi-l">In diligence</span></div>
          <div className="kpi"><span className="kpi-v">~6 wks</span><span className="kpi-l">To decision</span></div>
          <div className="kpi"><span className="kpi-v">18%</span><span className="kpi-l">Screen pass</span></div>
        </div>
      </div>

      {/* ── Two-column dashboard ── */}
      <div className="dfx-split">

        {/* LEFT: deals panel */}
        <div className="dfx-col">
          <div className="panel panel-pad">
            <div className="panel-sub">
              <h4>Active pipeline</h4>
              <span className="tag">{total} companies · Snapshot Jul 2026</span>
            </div>

            {/* Slim funnel */}
            <div className="funnel-slim">
              <div className="funnel-bar" style={{ cursor: 'pointer' }}>
                {STAGE_ORDER.map((s) => (
                  <div
                    key={s}
                    onClick={() => toggleStage(s)}
                    style={{
                      width: FUNNEL_WIDTHS[s],
                      background: STAGE_COLORS[s],
                      opacity: activeStage === 'all' || activeStage === s ? 1 : 0.3,
                      transition: 'opacity var(--duration-fast) var(--ease-standard)',
                    }}
                  />
                ))}
              </div>
              <div className="funnel-legend">
                {STAGE_ORDER.map((s) => (
                  <span
                    key={s}
                    className="fl"
                    onClick={() => toggleStage(s)}
                    style={{
                      cursor: 'pointer',
                      opacity: activeStage === 'all' || activeStage === s ? 1 : 0.4,
                      transition: 'opacity var(--duration-fast) var(--ease-standard)',
                    }}
                  >
                    <span className="sw" style={{ background: STAGE_COLORS[s] }} />
                    <span className="n">{stageCounts[s]}</span>
                    {' '}{stageLabel(s)}
                  </span>
                ))}
              </div>
            </div>

            {/* Pipeline table */}
            <table className="pipe-table" style={{ marginTop: 18 }}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Revenue</th>
                  <th>Stage</th>
                  <th>Region</th>
                  <th className="r">Tier</th>
                </tr>
              </thead>
              <tbody>
                {filteredPipeline.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="pipe-co">{c.industry}</div>
                      <div className="pipe-hi">{c.highlights[0]}</div>
                    </td>
                    <td><span className="pipe-rev">{revBand(c.revenueBand)}</span></td>
                    <td>
                      <Badge tone={stageTone(c.stage)} dot={c.stage === 'decision'}>
                        {stageLabel(c.stage)}
                      </Badge>
                    </td>
                    <td><span className="pipe-meta">{c.region}</span></td>
                    <td className="r">
                      <span className={`tier-dot tier-${c.tier}`}>{c.tier}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: context rail */}
        <div className="dfx-col">

          {/* Company profile */}
          <div className="panel panel--cream panel-pad">
            <div className="panel-sub"><h4>Company profile</h4></div>
            <div className="kv">
              {profile.map((p) => (
                <div className="kv-row" key={p.label}>
                  <span className="kv-l">{p.label}</span>
                  <span className="kv-v">{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing engine */}
          <div className="panel panel-pad">
            <div className="panel-sub">
              <h4>Sourcing engine</h4>
              <span className="tag">85+ channels</span>
            </div>
            <div className="kv">
              {sources.map((s) => (
                <div className="kv-row" key={s.scope} style={{ alignItems: 'flex-start' }}>
                  <div>
                    <span className="src-n" style={{ fontSize: 'var(--text-lg)' }}>{s.n}</span>
                    <span className="src-scope">{s.scope}</span>
                    <p className="src-d">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline mix */}
          <div className="panel panel-pad">
            <div className="panel-sub">
              <h4>Pipeline mix</h4>
              <span className="tag">634 cos · 2,226 founders</span>
            </div>

            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>
              Top industries
            </div>
            <div className="mini-bars">
              {topIndustries.map((d) => (
                <div className="mini-row" key={d.label}>
                  <span className="ml">{d.label}</span>
                  <div className="mini-track">
                    <div className="mini-fill" style={{ width: `${(d.pct / d.max) * 100}%` }} />
                  </div>
                  <span className="mini-v">{d.pct}%</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 600, margin: '14px 0 8px' }}>
              By funding stage
            </div>
            <div className="mini-bars">
              {byFunding.map((d) => (
                <div className="mini-row" key={d.label}>
                  <span className="ml">{d.label}</span>
                  <div className="mini-track">
                    <div className="mini-fill" style={{ width: `${(d.pct / d.max) * 100}%`, background: 'var(--gold-500)' }} />
                  </div>
                  <span className="mini-v">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
