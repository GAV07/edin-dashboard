'use client';

import React from 'react';
import {
  BarChart, Bar, LineChart, Line, ComposedChart as ReComposed, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  PieChart, Pie, Cell,
} from 'recharts';

/* Resolved color tokens for Recharts (can't use CSS vars in SVG fills) */
export const C = {
  ink: '#1F1E19',
  muted: '#757266',
  rule: '#E4D9C6',
  ruleSoft: '#DCD8CC',
  pine: '#2C4A1E',
  pine5: '#46602D',
  sage: '#768D64',
  teal: '#1C6273',
  gold: '#B49150',
  cream: '#F6F1E8',
  green050: '#E9F0DD',
};

const tooltipStyle = {
  borderRadius: 8,
  border: '1px solid #DCD8CC',
  fontSize: 13,
  fontFamily: "'IBM Plex Mono', monospace",
  background: '#FFFFFF',
};

const axisTick = { fill: '#757266', fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" };

const fmtM = (v: number) => `$${v}M`;

/* ---- Interactive Bar Chart (annual distributions) ---- */
export function Bars({
  data,
  unit = '$M',
  marker,
}: {
  data: Array<{ label: string; value: number }>;
  unit?: string;
  marker?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={C.ruleSoft} strokeDasharray="" />
        <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: C.ruleSoft }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}`} />
        <Tooltip
          formatter={(value: number) => [`${value} ${unit}`, 'Distribution']}
          contentStyle={tooltipStyle}
        />
        {marker && (
          <ReferenceLine x={marker} stroke={C.muted} strokeDasharray="3 3" label={{ value: '10y', position: 'top', fill: C.muted, fontSize: 10 }} />
        )}
        <Bar dataKey="value" fill={C.pine} radius={[2, 2, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---- Interactive Trend Line (cumulative) ---- */
export function Trend({
  data,
  unit = '$M',
  color = C.sage,
  marker,
  height = 220,
}: {
  data: Array<{ label: string; value: number }>;
  unit?: string;
  color?: string;
  marker?: string;
  height?: number;
  last?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReComposed data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={C.ruleSoft} />
        <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: C.ruleSoft }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(value: number) => [`${value} ${unit}`, '']}
          contentStyle={tooltipStyle}
        />
        {marker && (
          <ReferenceLine x={marker} stroke={C.muted} strokeDasharray="3 3" label={{ value: '10y', position: 'top', fill: C.muted, fontSize: 10 }} />
        )}
        <Area type="monotone" dataKey="value" fill={color} fillOpacity={0.12} stroke="none" />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ fill: '#FFFFFF', stroke: color, strokeWidth: 1.5, r: 2.5 }} activeDot={{ r: 4, fill: color }} />
      </ReComposed>
    </ResponsiveContainer>
  );
}

/* ---- Interactive Donut ---- */
export function Donut({
  data,
  height = 200,
}: {
  data: Array<{ name: string; value: number }>;
  height?: number;
}) {
  const COLORS = [C.pine, C.gold, C.teal, C.sage];
  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={height * 0.26}
            outerRadius={height * 0.40}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`${Math.round(value)}%`, name]} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label overlay */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{ fontSize: height * 0.16, fontFamily: "'Newsreader', Georgia, serif", color: C.ink, lineHeight: 1 }}>
          {Math.round(data[0]?.value ?? 0)}%
        </div>
        <div style={{ fontSize: height * 0.05, fontFamily: "'Hanken Grotesk', sans-serif", color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
          {data[0]?.name}
        </div>
      </div>
    </div>
  );
}

/* ---- Interactive Stacked/Grouped Bars ---- */
export function StackBars({
  data,
  height = 220,
  keys,
  colors,
}: {
  data: Array<Record<string, any>>;
  height?: number;
  keys: string[];
  colors: string[];
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={C.ruleSoft} />
        <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: C.ruleSoft }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i]} radius={[1, 1, 0, 0]} maxBarSize={14} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ---- Interactive Composed: grouped bars + cumulative line (venture bond) ---- */
export function Composed({
  data,
  height = 300,
}: {
  data: Array<{ year: number; profit: number; distribution: number; cumulative: number }>;
  height?: number;
}) {
  const fmtUsd = (v: number) => v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1e3)}K`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReComposed data={data} margin={{ top: 10, right: 50, left: 10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={C.ruleSoft} />
        <XAxis dataKey="year" tick={axisTick} axisLine={{ stroke: C.ruleSoft }} tickLine={false} tickFormatter={(v) => `Y${v}`} />
        <YAxis yAxisId="left" tick={axisTick} axisLine={false} tickLine={false} tickFormatter={fmtUsd} />
        <YAxis yAxisId="right" orientation="right" tick={{ ...axisTick, fill: C.gold }} axisLine={false} tickLine={false} tickFormatter={fmtUsd} />
        <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [fmtUsd(value), name]} />
        <Bar yAxisId="left" dataKey="profit" fill={C.pine5} name="Company profit" radius={[1, 1, 0, 0]} maxBarSize={14} />
        <Bar yAxisId="left" dataKey="distribution" fill={C.teal} name="Distribution" radius={[1, 1, 0, 0]} maxBarSize={14} />
        <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke={C.gold} strokeWidth={2} name="Cumulative" dot={{ fill: C.gold, r: 2.2 }} />
      </ReComposed>
    </ResponsiveContainer>
  );
}

/* ---- Legend ---- */
export function ChartLegend({
  items,
}: {
  items: Array<{ label: string; color: string }>;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10 }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          <span style={{ width: 11, height: 11, borderRadius: 2, background: it.color, display: 'inline-block' }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}
