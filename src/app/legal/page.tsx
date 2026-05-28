import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Compliance | Investor Dashboard",
  description: "Edin Capital fund documents, compliance information, and regulatory disclosures.",
};

const sections = [
  {
    title: "Fund Structure & Legal Documents",
    items: [
      "Limited Partnership Agreement (LPA)",
      "Private Placement Memorandum (PPM)",
      "Subscription Agreement",
      "Certificate of Formation",
      "Operating Agreement",
    ],
    note: "Final versions of fund documents will be provided to committed investors during the subscription process. Contact your Edin representative for access.",
  },
  {
    title: "Compliance",
    items: [
      "Anti-Money Laundering (AML) Policy",
      "Know Your Customer (KYC) Procedures",
      "Accredited Investor Verification",
      "Data Privacy & Security Policy",
      "Conflicts of Interest Policy",
    ],
    note: "Edin Capital maintains compliance policies aligned with SEC regulations for exempt fund offerings. Our compliance manual is available upon request.",
  },
  {
    title: "Regulatory Disclosures",
    items: [
      "This fund operates under Regulation D, Rule 506(b) exemption",
      "Securities offered have not been registered under the Securities Act of 1933",
      "Investment is restricted to accredited investors as defined by the SEC",
      "Past performance is not indicative of future results",
      "All investments involve substantial risk, including the potential loss of principal",
    ],
    note: null,
  },
];

export default function LegalPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Legal & Compliance
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            Fund documentation, compliance framework, and regulatory disclosures
            for Edin Capital Fund I.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2 mb-4">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {section.note && (
                <p className="text-xs text-gray-500 italic border-t border-gray-200 pt-3">
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
