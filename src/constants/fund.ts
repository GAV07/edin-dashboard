/**
 * Authoritative fund economics — single source of truth.
 *
 * Every page that displays fund terms, fees, or structure must import from
 * here rather than hardcoding values. Remaining TODO [CONFIRM]: target
 * portfolio count (financial model being redone).
 */

export const FUND = {
  /* ── Entities ── */
  legalName: 'Edin Capital Fund I LP',
  domicile: 'Delaware',
  structure: 'Limited Partnership',
  gpEntity: 'Edin Capital LLC',
  gpRole: 'General Partner & Management Company',

  /* ── Economics ── */
  targetSize: '$85M',
  hardCap: '$110M',
  managementFee: '2.0%',
  carry: '20%',
  minCommitment: '$250K',
  gpCommitment: '1%',
  targetPortfolio: '~30',       // TODO [CONFIRM] — financial model is being redone; count may change
  avgCheck: '$2M',
  term: 'Perpetual',
  deploymentPeriod: '4 years',
  geography: 'US · Southeast focus · South Florida roots',

  /* ── Venture Bond / Integrated Capital ── */
  assetClass: 'Integrated Capital',
  instrument: 'Venture Bond',
  tranches: '20% → 10% → 5% → 1%',
  trancheDetail: [
    { label: 'Tranche I',  pct: '20%', target: 'until 2× returned', share: 20 },
    { label: 'Tranche II', pct: '10%', target: 'until 4× returned', share: 10 },
    { label: 'Tranche III', pct: '5%', target: 'until 6× returned', share: 5 },
    { label: 'Tranche ∞',  pct: '1%', target: 'in perpetuity',      share: 1 },
  ],
  triggerDesign: 'later of',    // profit-sharing activates at the later of time trigger AND revenue/margin condition

  /* ── Regulatory ── */
  exemptions: 'Reg D 506(b) · ICA §3(c)(1) · §203(l) ERA',
  regDRule: '506(b)',
  icaExemption: '§3(c)(1)',
  adviserExemption: '§203(l) Exempt Reporting Adviser',

  /* ── Service providers ── */
  auditor: 'BDO',
  banks: ['First Citizens Bank', 'Silicon Valley Bank'],
  legalCounsel: 'Fenwick',
} as const;
