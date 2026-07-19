import { Metadata } from "next";
import { PageHead } from "@/components/portal/ui";
import { FUND } from "@/constants/fund";

export const metadata: Metadata = {
  title: "Legal & Compliance | Investor Dashboard",
  description: "Fund documentation, compliance framework, and regulatory disclosures.",
};

const sections = [
  {
    title: "Fund entity & structure",
    items: [
      `${FUND.legalName} — a ${FUND.domicile} limited partnership`,
      `General Partner & Management Company: ${FUND.gpEntity}`,
      `Asset class: ${FUND.assetClass} (the ${FUND.instrument})`,
      `Target size ${FUND.targetSize} · Hard cap ${FUND.hardCap}`,
      `Management fee ${FUND.managementFee} · Carried interest ${FUND.carry}`,
      `Minimum LP commitment: ${FUND.minCommitment}`,
    ],
    note: null,
  },
  {
    title: "Fund documents",
    items: [
      "Limited Partnership Agreement (LPA)",
      "Private Placement Memorandum (PPM)",
      "Subscription Agreement",
      "Certificate of Limited Partnership — Edin Capital Fund I LP",
      "Certificate of Formation — Edin Capital Fund I GP LLC",
      "Certificate of Formation — Edin Capital LLC (Management Co.)",
      "Operating Agreement — Edin Capital Fund I GP LLC",
      "Operating Agreement — Edin Capital LLC",
    ],
    note: "Final versions are provided to committed investors during the subscription process. Contact your Edin representative for access.",
  },
  {
    title: "Compliance",
    items: [
      "Anti-Money Laundering (AML) policy",
      "Know Your Customer (KYC) procedures",
      "Accredited-investor verification",
      "Data privacy & security policy",
      "Conflicts-of-interest policy",
    ],
    note: "Edin Capital maintains compliance policies aligned with SEC regulations for exempt fund offerings. The compliance manual is available on request.",
  },
  {
    title: "Service providers",
    items: [
      `Auditor: ${FUND.auditor} (audited annual financials within 120 days of year end)`,
      `Banking: ${FUND.banks.join('; ')}`,
      `Legal counsel: ${FUND.legalCounsel}`,
    ],
    note: null,
  },
  {
    title: "Regulatory disclosures",
    items: [
      `Operates under Regulation D, Rule ${FUND.regDRule} exemption`,
      `Investment Company Act ${FUND.icaExemption} (≤100 beneficial owners; accredited investors only)`,
      `Adviser relies on the ${FUND.adviserExemption} exemption`,
      "Securities offered are not registered under the Securities Act of 1933",
      "Investment restricted to accredited investors as defined by the SEC",
      "Past performance is not indicative of future results",
      "All investments involve substantial risk, including loss of principal",
    ],
    note: null,
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHead
        num="09"
        eyebrow="Legal & compliance"
        title={<>Fund documentation & <em>disclosures.</em></>}
        lede={`Documentation, compliance framework, and regulatory disclosures for ${FUND.legalName}.`}
      />

      <div className="ed-grid" style={{ gap: "var(--space-4)" }}>
        {sections.map((sec) => (
          <div className="panel panel-pad" key={sec.title}>
            <div style={{
              fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)",
              color: "var(--text-strong)", marginBottom: "var(--space-4)",
              paddingBottom: "var(--space-3)",
              borderBottom: "1px solid var(--border-subtle)",
            }}>
              {sec.title}
            </div>

            <ul style={{
              display: "flex", flexDirection: "column", gap: "var(--space-2)",
              listStyle: "none", padding: 0, margin: 0,
              marginBottom: sec.note ? "var(--space-4)" : 0,
            }}>
              {sec.items.map((it) => (
                <li key={it} style={{
                  display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
                  fontSize: "var(--text-sm)", color: "var(--text-secondary)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--gold-500)", marginTop: 7, flex: "none",
                  }} />
                  {it}
                </li>
              ))}
            </ul>

            {sec.note && (
              <p style={{
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                fontSize: "var(--text-sm)", color: "var(--text-muted)",
                lineHeight: 1.55, paddingTop: "var(--space-3)",
                borderTop: "1px solid var(--border-subtle)",
              }}>
                {sec.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
