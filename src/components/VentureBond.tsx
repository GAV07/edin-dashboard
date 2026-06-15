"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { PageHead, SectionLabel } from '@/components/portal/ui';
import { Composed, ChartLegend, C } from '@/components/portal/charts';

/* ---- types ---- */
interface InputValues {
  investmentAmount: number;
  valCap: number;
  equityPercentage: number;
  yearsToTrigger: number;
  revenueThreshold: number;
  profitMargin: number;
  initialRevenue: number;
  initialProfitMargin: number;
  growthRate: number;
  simulationYears: number;
}

interface YearlyData {
  year: number;
  revenue: number;
  profit: number;
  distribution: number;
  cumulativeDistribution: number;
  returnMultiple: string;
  profitSharePercentage: number;
  equityValue: number;
  totalValue: number;
}

interface SummaryMetrics {
  totalDistributions: number;
  totalProfits: number;
  totalRevenue: number;
  profitRetainedByCompany: number;
  timeToRecoup: number | string;
  triggerYear: number | string;
  finalReturnMultiple: number;
  equityFinalValue: number;
  totalReturnValue: number;
  totalReturnMultiple: number;
}

interface Results {
  yearlyData: YearlyData[];
  summaryMetrics: SummaryMetrics;
}

type Scenario = 'Conservative' | 'Base' | 'Optimistic';

/* ---- presets ---- */
const defaults: InputValues = {
  investmentAmount: 2000000,
  valCap: 12500000,
  equityPercentage: 20,
  yearsToTrigger: 4,
  revenueThreshold: 2000000,
  profitMargin: 35,
  initialRevenue: 1000000,
  initialProfitMargin: 20,
  growthRate: 30,
  simulationYears: 10,
};

const presets: Record<Scenario, Partial<InputValues>> = {
  Conservative: { growthRate: 15, profitMargin: 30, initialRevenue: 800000, initialProfitMargin: 15, revenueThreshold: 2500000 },
  Base: { growthRate: 30, profitMargin: 35, initialRevenue: 1000000, initialProfitMargin: 20, revenueThreshold: 2000000 },
  Optimistic: { growthRate: 50, profitMargin: 40, initialRevenue: 1200000, initialProfitMargin: 25, revenueThreshold: 1500000 },
};

const scenarioList: Scenario[] = ['Conservative', 'Base', 'Optimistic'];

/* ---- formatters ---- */
const fmtCur = (v: number | undefined | null) => {
  if (v == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
};
const fmtPct = (v: number | string | undefined | null) => (v == null ? '—' : `${v}%`);
const fmtNum = (v: number) => {
  if (v === 0 || v == null) return '';
  return new Intl.NumberFormat('en-US').format(v);
};

/* ---- NumField ---- */
function NumField({ label, name, value, prefix, onChange }: {
  label: string; name: string; value: number; prefix?: string;
  onChange: (name: string, value: number) => void;
}) {
  const isFormatted = !!prefix;
  const display = isFormatted ? fmtNum(value) : String(value);
  return (
    <div>
      <label className="metric-l" style={{ display: 'block', marginBottom: 4 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{prefix}</span>
        )}
        <input
          type={isFormatted ? 'text' : 'number'}
          name={name}
          value={display}
          onChange={(e) => {
            const raw = parseFloat(e.target.value.replace(/,/g, ''));
            onChange(name, isNaN(raw) ? 0 : raw);
          }}
          style={{
            paddingLeft: prefix ? 22 : 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
            width: '100%', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)',
            border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-card)', color: 'var(--text-primary)', outline: 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ---- bond calculator logic ---- */
function bondCalc(inputs: InputValues): Results {
  const {
    investmentAmount, yearsToTrigger, revenueThreshold,
    profitMargin, growthRate, initialRevenue, initialProfitMargin,
    simulationYears, equityPercentage,
  } = inputs;

  const yearlyData: YearlyData[] = [];
  let totalDistributions = 0, totalProfits = 0, totalRevenueSum = 0;
  let currentProfitSharePercentage = 0, hasTriggerOccurred = false;
  let triggerYear = -1, timeToRecoup: number = -1;
  let currentRevenue = initialRevenue;
  let currentProfit = initialRevenue * (initialProfitMargin / 100);

  for (let year = 1; year <= simulationYears; year++) {
    if (year > 1) {
      currentRevenue = currentRevenue * (1 + growthRate / 100);
      currentProfit = currentRevenue * (profitMargin / 100);
    }

    const triggerConditionsMet =
      year >= yearsToTrigger &&
      currentRevenue >= revenueThreshold &&
      (currentProfit / currentRevenue) * 100 >= profitMargin;

    if (triggerConditionsMet && !hasTriggerOccurred) {
      hasTriggerOccurred = true;
      triggerYear = year;
      currentProfitSharePercentage = 20;
    }

    let yearlyDistribution = 0;
    if (hasTriggerOccurred) {
      yearlyDistribution = currentProfit * (currentProfitSharePercentage / 100);
      totalDistributions += yearlyDistribution;
      const m = totalDistributions / investmentAmount;
      if (m >= 2 && m < 4) currentProfitSharePercentage = 10;
      else if (m >= 4 && m < 6) currentProfitSharePercentage = 5;
      else if (m >= 6) currentProfitSharePercentage = 1;
    }

    if (totalDistributions >= investmentAmount && timeToRecoup === -1) timeToRecoup = year;
    totalProfits += currentProfit;
    totalRevenueSum += currentRevenue;

    const equityValue = (currentRevenue * 5) * (equityPercentage / 100);

    yearlyData.push({
      year, revenue: Math.round(currentRevenue), profit: Math.round(currentProfit),
      distribution: Math.round(yearlyDistribution),
      cumulativeDistribution: Math.round(totalDistributions),
      returnMultiple: (totalDistributions / investmentAmount).toFixed(2),
      profitSharePercentage: currentProfitSharePercentage,
      equityValue: Math.round(equityValue),
      totalValue: Math.round(totalDistributions) + Math.round(equityValue),
    });
  }

  const profitGivenToFund = totalProfits > 0 ? totalDistributions / totalProfits : 0;
  const equityFinalValue = yearlyData[yearlyData.length - 1]?.equityValue || 0;

  return {
    yearlyData,
    summaryMetrics: {
      totalDistributions, totalProfits, totalRevenue: totalRevenueSum,
      profitRetainedByCompany: 1 - profitGivenToFund,
      timeToRecoup: timeToRecoup !== -1 ? timeToRecoup : '—',
      triggerYear: triggerYear !== -1 ? triggerYear : '—',
      finalReturnMultiple: totalDistributions / investmentAmount,
      equityFinalValue,
      totalReturnValue: totalDistributions + equityFinalValue,
      totalReturnMultiple: (totalDistributions + equityFinalValue) / investmentAmount,
    },
  };
}

/* ---- tranches ---- */
const tranches = [
  { label: 'Tranche I', pct: '20%', target: 'until 2× returned', share: 20 },
  { label: 'Tranche II', pct: '10%', target: 'until 4× returned', share: 10 },
  { label: 'Tranche III', pct: '5%', target: 'until 6× returned', share: 5 },
  { label: 'Tranche ∞', pct: '1%', target: 'in perpetuity', share: 1 },
];

/* ================================================================
   Main component
   ================================================================ */
const VentureBondCalculator = () => {
  const [scenario, setScenario] = useState<Scenario>('Base');
  const [inputs, setInputs] = useState<InputValues>(defaults);
  const [results, setResults] = useState<Results | null>(null);
  const [tab, setTab] = useState<'chart' | 'table'>('chart');

  const applyScenario = useCallback((s: Scenario) => {
    setScenario(s);
    setInputs({ ...defaults, ...presets[s] });
  }, []);

  const handleField = useCallback((name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    if (!inputs.investmentAmount) return;
    setResults(bondCalc(inputs));
  }, [inputs]);

  const m = results?.summaryMetrics;

  return (
    <>
      <PageHead
        num="04"
        eyebrow="The instrument"
        title={<>The Venture Bond, <em>modeled.</em></>}
        lede="A hybrid of convertible equity and structured profit-sharing. Adjust the company's trajectory to see how returns accrue across the four profit-sharing tranches."
        action={
          <div className="seg">
            {scenarioList.map((s) => (
              <button key={s} className={scenario === s ? 'is-active' : ''} onClick={() => applyScenario(s)}>
                {s}
              </button>
            ))}
          </div>
        }
      />

      {/* Compact: How it works + Tranches in one row */}
      <SectionLabel num="i">Structure &amp; profit-sharing</SectionLabel>
      <div className="ed-grid" style={{ gridTemplateColumns: '3fr 2fr', gap: 'var(--space-4)', alignItems: 'start' }}>
        {/* Left: 5 steps inline */}
        <div className="panel panel-pad">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)' }}>
            {[
              { label: 'Invest', detail: 'Equity + profit-share' },
              { label: 'Grow', detail: 'Revenue & margins' },
              { label: 'Trigger', detail: 'Time + revenue + margin' },
              { label: 'Share', detail: '20→10→5→1%' },
              { label: 'Exit', detail: 'Continue or liquidate' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-700)', marginBottom: 4 }}>{i + 1}</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.3 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tranches compact */}
        <div className="panel panel-pad">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {tranches.map((t, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 36px 110px', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{t.label}</span>
                <div className="bar-track" style={{ height: 5 }}>
                  <div className="bar-fill" style={{ width: `${(t.share / 20) * 100}%` }} />
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>{t.pct}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{t.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator */}
      <SectionLabel num="ii">Return calculator</SectionLabel>
      <div className="ed-grid" style={{ gridTemplateColumns: '1.5fr 1fr', alignItems: 'start' }}>
        <div className="ed-grid ed-g2">
          <div className="panel panel-pad">
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-3)' }}>Investment</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <NumField label="Investment amount" name="investmentAmount" value={inputs.investmentAmount} prefix="$" onChange={handleField} />
              <NumField label="Valuation cap" name="valCap" value={inputs.valCap} prefix="$" onChange={handleField} />
              <NumField label="Equity %" name="equityPercentage" value={inputs.equityPercentage} onChange={handleField} />
              <NumField label="Years to trigger" name="yearsToTrigger" value={inputs.yearsToTrigger} onChange={handleField} />
              <NumField label="Revenue threshold" name="revenueThreshold" value={inputs.revenueThreshold} prefix="$" onChange={handleField} />
              <NumField label="Margin threshold %" name="profitMargin" value={inputs.profitMargin} onChange={handleField} />
            </div>
          </div>
          <div className="panel panel-pad">
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-3)' }}>Company trajectory</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <NumField label="Initial revenue" name="initialRevenue" value={inputs.initialRevenue} prefix="$" onChange={handleField} />
              <NumField label="Initial profit margin %" name="initialProfitMargin" value={inputs.initialProfitMargin} onChange={handleField} />
              <NumField label="Annual growth %" name="growthRate" value={inputs.growthRate} onChange={handleField} />
              <NumField label="Simulation years" name="simulationYears" value={inputs.simulationYears} onChange={handleField} />
            </div>
          </div>
        </div>

        {m && (
          <div className="panel panel--accent panel-pad">
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-3)' }}>Key results</div>
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--green-050)', border: '1px solid var(--green-100)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-4xl)', lineHeight: 1, color: 'var(--green-700)' }}>
                {m.totalReturnMultiple.toFixed(2)}×
              </div>
              <div style={{ fontSize: 'var(--text-2xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-700)', marginTop: 6 }}>
                Total return multiple
              </div>
            </div>
            {[
              ['Total distributions', fmtCur(m.totalDistributions)],
              ['Distribution multiple', `${m.finalReturnMultiple.toFixed(2)}×`],
              ['Equity final value', fmtCur(m.equityFinalValue)],
              ['Trigger year', String(m.triggerYear)],
              ['Time to recoup', typeof m.timeToRecoup === 'number' ? `Year ${m.timeToRecoup}` : String(m.timeToRecoup)],
              ['Profit retained by co.', `${Math.round(m.profitRetainedByCompany * 100)}%`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chart / Table */}
      {results && (
        <>
          <div className="ed-tabs" style={{ marginTop: 'var(--space-6)' }}>
            {(['chart', 'table'] as const).map((t) => (
              <button key={t} className={`ed-tab${tab === t ? ' is-active' : ''}`} onClick={() => setTab(t)}>
                {t === 'chart' ? 'Chart' : 'Year-by-year'}
              </button>
            ))}
          </div>

          {tab === 'chart' && (
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title">Company profit vs. distributions</span>
                <span className="panel-unit">$ / cumulative</span>
              </div>
              <div className="panel-pad">
                <Composed
                  data={results.yearlyData.map((d) => ({
                    year: d.year, profit: d.profit,
                    distribution: d.distribution, cumulative: d.cumulativeDistribution,
                  }))}
                />
                <ChartLegend items={[
                  { label: 'Company profit', color: C.pine5 },
                  { label: 'Distribution to investor', color: C.teal },
                  { label: 'Cumulative distributions', color: C.gold },
                ]} />
              </div>
            </div>
          )}

          {tab === 'table' && (
            <div className="panel panel-pad" style={{ overflowX: 'auto' }}>
              <table className="dtable">
                <thead>
                  <tr><th>Year</th><th>Revenue</th><th>Profit</th><th>Dist.</th><th>Share</th><th>Mult.</th><th>Equity</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {results.yearlyData.map((d) => (
                    <tr key={d.year}>
                      <td>Y{d.year}</td><td>{fmtCur(d.revenue)}</td><td>{fmtCur(d.profit)}</td>
                      <td>{d.distribution ? fmtCur(d.distribution) : '—'}</td><td>{fmtPct(d.profitSharePercentage)}</td>
                      <td>{d.returnMultiple}×</td><td>{fmtCur(d.equityValue)}</td><td>{fmtCur(d.totalValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="section-note" style={{ marginTop: 'var(--space-4)' }}>
            For simulation purposes only. All projections are hypothetical and do not represent guaranteed returns.
          </p>
        </>
      )}
    </>
  );
};

export default VentureBondCalculator;
