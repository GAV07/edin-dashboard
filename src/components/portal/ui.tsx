'use client';

import React from 'react';

/* ---- PageHead ---- */
export function PageHead({
  num,
  eyebrow,
  title,
  lede,
  action,
}: {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="page-eyebrow">
        <span className="eyebrow-pill">
          <span className="eyebrow-num">{num}</span>
          <span className="eyebrow-text">{eyebrow}</span>
        </span>
      </div>
      <div className="page-head-row">
        <h1 className="page-title">{title}</h1>
        {action && <div className="page-action">{action}</div>}
      </div>
      {lede && <p className="page-lede">{lede}</p>}
    </header>
  );
}

/* ---- SectionLabel ---- */
export function SectionLabel({
  num,
  children,
  note,
  extra,
}: {
  num?: string;
  children: React.ReactNode;
  note?: string;
  extra?: React.ReactNode;
}) {
  return (
    <>
      <div className="section-label">
        {num && <span className="num">{num}</span>}
        <span className="lab">{children}</span>
        <span className="rule" />
        {extra}
      </div>
      {note && <p className="section-note">{note}</p>}
    </>
  );
}

/* ---- MetricGrid ---- */
export function MetricGrid({
  items,
  cols = 4,
  style,
}: {
  items: Array<{ label: string; value: string; sub?: string; mono?: boolean; style?: React.CSSProperties }>;
  cols?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="metric-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, ...style }}
    >
      {items.map((m, i) => (
        <div className="metric" key={i} style={m.style}>
          <span className="metric-l">{m.label}</span>
          <span className={`metric-v${m.mono ? ' mono' : ''}`}>{m.value}</span>
          {m.sub && <span className="metric-sub">{m.sub}</span>}
        </div>
      ))}
    </div>
  );
}

/* ---- Badge ---- */
export function Badge({
  tone = 'brand',
  dot,
  children,
}: {
  tone?: 'brand' | 'info' | 'neutral';
  dot?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`ed-badge ed-badge--${tone}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}
