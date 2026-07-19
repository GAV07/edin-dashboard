'use client';

import React from 'react';
import Link from 'next/link';
import { PageHead, SectionLabel, MetricGrid } from '@/components/portal/ui';
import { Bars, Trend, Donut, ChartLegend, C } from '@/components/portal/charts';
import { DROPBOX } from '@/constants/links';
import { FUND } from '@/constants/fund';
import {
  IconClipboardData, IconChartBar, IconBriefcase2,
  IconUsersGroup, IconHeartHandshake, IconDeviceLaptop, IconUsers,
  IconScale, IconArrowRight, IconDownload,
} from '@tabler/icons-react';

interface DashboardProps {
  fundOverview: {
    committedCapital: string;
    investableCapital: string;
    managementFee: string;
    fundLife: string;
    deploymentPeriod: string;
    carry: string;
  };
  portfolioAllocation: {
    numberOfInvestments: string;
    averageCheckSize: string;
    successRate: string;
  };
  returnMetrics: {
    lpDistributions: string;
    gpCarry: string;
    moic: string;
    grossTvpi: string;
    dpi: string;
    irr: string;
  };
  distributionSourcesData: Array<{ name: string; value: number }>;
  annualReturnsData: Array<{ year: string; returns: number; cumulative: number }>;
}

/* ── Data room navigation cards ── */
const dataRoomItems = [
  { href: '/thesis', icon: IconClipboardData, t: 'Investment thesis', d: 'Sectors, profile & framework' },
  { href: '/pro-forma', icon: IconChartBar, t: 'Pro forma', d: '12-year financial projections' },
  { href: '/venture-bond', icon: IconBriefcase2, t: 'Venture Bond', d: 'Structure & return calculator' },
  { href: '/deal-flow', icon: IconUsersGroup, t: 'Deal flow', d: 'Pipeline & sourcing' },
  { href: '/portfolio-support', icon: IconHeartHandshake, t: 'Portfolio support', d: 'The Edin Experience' },
  { href: '/team', icon: IconUsers, t: 'Team & track record', d: 'Partners, experience & credibility' },
  { href: '/edin-os', icon: IconDeviceLaptop, t: 'EdinOS', d: 'Platform roadmap' },
  { href: '/legal', icon: IconScale, t: 'Legal & compliance', d: 'Fund documents' },
];

export default function Dashboard({
  returnMetrics,
  distributionSourcesData,
  annualReturnsData,
}: DashboardProps) {
  const annual = annualReturnsData.map((d) => ({
    label: d.year.replace('Year ', 'Y'),
    value: d.returns / 1_000_000,
  }));
  const cumulative = annualReturnsData.map((d) => ({
    label: d.year.replace('Year ', 'Y'),
    value: Math.round(d.cumulative / 1_000_000),
  }));

  return (
    <>
      <PageHead
        num="01"
        eyebrow="Fund I · Executive Summary"
        title={<>Integrated Capital for <em>durable growth.</em></>}
        lede={`${FUND.legalName} invests in growth-oriented companies that traditional venture capital was never designed to serve — durable businesses with real revenue and capital-efficient operations. The Venture Bond pairs convertible equity with structured profit-sharing to return capital as companies grow, not only when they exit.`}
        action={
          <a
            href={DROPBOX.deck}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-default)',
              background: 'var(--surface-card)',
              fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--text-primary)', textDecoration: 'none',
            }}
          >
            Download deck
            <IconDownload style={{ width: 15, height: 15 }} />
          </a>
        }
      />

      {/* ═══════════════════════════════════════════════════════════
          i. FUND TERMS
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="i">Fund terms</SectionLabel>
      <MetricGrid
        cols={5}
        items={[
          { label: 'Target size', value: FUND.targetSize },
          { label: 'Mgmt fee / carry', value: `${FUND.managementFee} / ${FUND.carry}` },
          { label: 'Avg check', value: FUND.avgCheck },
          { label: 'Min commitment', value: FUND.minCommitment },
          { label: 'Term', value: FUND.term },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          ii. PROJECTED RETURNS
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="ii">Projected returns · 10-year</SectionLabel>
      <MetricGrid
        cols={5}
        style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}
        items={[
          { label: 'Cum. LP distributions', value: returnMetrics.lpDistributions, sub: 'Profit-sharing + exit liquidity, gross of fees, illustrative', style: { background: 'var(--surface-cream)' } },
          { label: 'MOIC', value: returnMetrics.moic, mono: true },
          { label: 'Gross TVPI', value: returnMetrics.grossTvpi, mono: true },
          { label: 'DPI', value: returnMetrics.dpi, mono: true },
          { label: 'Net IRR', value: returnMetrics.irr, mono: true },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          iii. THE INSTRUMENT
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="iii">The instrument</SectionLabel>
      <div className="ed-grid ed-g3" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <div className="panel panel--accent">
          <div className="panel-head"><span className="panel-title">Sources of return</span></div>
          <div className="panel-pad" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Donut data={distributionSourcesData.map(d => ({
              ...d,
              value: d.value < 1 ? Math.round(d.value * 100) : Math.round(d.value),
            }))} />
            <ChartLegend items={[
              { label: 'Profit-sharing', color: C.pine },
              { label: 'Exit liquidity', color: C.gold },
            ]} />
          </div>
        </div>
        <div className="panel panel--cream">
          <div className="panel-pad" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', justifyContent: 'center', height: '100%' }}>
            <span className="eyebrow-pill">
              <span className="eyebrow-num">04</span>
              <span className="eyebrow-text">The instrument</span>
            </span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', lineHeight: 1.3, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>
              The {FUND.instrument} pays as companies compound —<em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--green-600)' }}>not only when they exit.</em>
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: 520 }}>
              Equity participation plus a tiered share of net income ({FUND.tranches}) returns capital years earlier than the traditional venture J-curve, while founders retain the majority of their profit.
            </p>
            <div>
              <Link
                href="/venture-bond"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: 'var(--green-700)', textDecoration: 'none',
                }}
              >
                Explore the structure
                <IconArrowRight style={{ width: 15, height: 15 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          iv. RETURNS ANALYSIS
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="iv" note="Gross of fees, illustrative. Based on pro-forma model assumptions.">Returns analysis</SectionLabel>
      <div className="ed-grid ed-g2">
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Annual distributions</span>
            <span className="panel-unit">$M / year</span>
          </div>
          <div className="panel-pad">
            <Bars data={annual} unit="$M" marker="Y10" />
          </div>
        </div>
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Cumulative distributions</span>
            <span className="panel-unit">$M</span>
          </div>
          <div className="panel-pad">
            <Trend data={cumulative} unit="$M" marker="Y10" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          v. NEXT STEPS
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="v">Next steps</SectionLabel>
      <div className="panel panel--accent panel-pad">
        <div className="ed-grid ed-g3" style={{ alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
              Minimum commitment
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--text-strong)' }}>
              {FUND.minCommitment}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              Interested in learning more about {FUND.legalName}? Download the deck, begin the
              subscription process through our fund administrator, or reach out to the team.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <a
              href={DROPBOX.deck}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-default)',
                background: 'var(--surface-card)',
                fontSize: 'var(--text-sm)', fontWeight: 600,
                color: 'var(--text-primary)', textDecoration: 'none',
              }}
            >
              Download deck
              <IconDownload style={{ width: 15, height: 15 }} />
            </a>
            {/* TODO: replace href with Aduro subscription page URL once provided */}
            <a
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: 'var(--green-700)', color: 'var(--paper-100)',
                fontSize: 'var(--text-sm)', fontWeight: 600,
                textDecoration: 'none', border: 'none',
              }}
            >
              Subscribe
              <IconArrowRight style={{ width: 15, height: 15 }} />
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          vi. DATA ROOM NAVIGATION
      ═══════════════════════════════════════════════════════════ */}
      <SectionLabel num="vi">Explore the data room</SectionLabel>
      <div className="ed-grid ed-g4">
        {dataRoomItems.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="panel"
              style={{ padding: 'var(--space-4)', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', cursor: 'pointer', transition: 'border-color var(--duration-fast)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Icon style={{ width: 18, height: 18, color: 'var(--green-600)' }} />
                <IconArrowRight style={{ width: 15, height: 15, color: 'var(--text-muted)' }} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{c.t}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{c.d}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
