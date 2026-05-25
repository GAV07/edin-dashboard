'use client';

import Image from 'next/image';
import { useState } from 'react';

const people = [
  {
    name: 'Andrew Davis',
    role: 'Managing Partner',
    imageUrl: '/images/team/andrew.jpeg',
    shortBio: 'Award-winning founder, operator, and investor with 7+ years of venture experience at Techstars, Comcast, and MakerX.',
    fullBio: `Andrew Davis is an award-winning founder, operator, and investor with over a decade of experience building and scaling companies at the intersection of technology and impact. He has held venture roles at Techstars, Comcast Ventures, and MakerX, where he sourced deals, supported portfolio companies, and helped shape investment strategy across early-stage ecosystems.

As the founder of Phoenix, Andrew built a platform recognized by Google's Community Leaders Program for its contribution to entrepreneurial development. His operating experience spans go-to-market strategy, product development, and organizational scaling — giving him a practitioner's lens on what it takes to build durable businesses.

Andrew brings a unique blend of investment acumen and hands-on operating experience to Edin Capital, where he leads fund strategy, investor relations, and portfolio construction. He is deeply committed to deploying capital in ways that generate both financial returns and meaningful socioeconomic impact.`,
    linkedinUrl: 'https://www.linkedin.com/in/andgerous/',
  },
  {
    name: 'Aurelia Edwards',
    role: 'General Partner',
    imageUrl: '/images/team/aurelia.jpeg',
    shortBio: 'Award-winning 4x founder and operator with 25 years experience across health, wellness, events, and technology.',
    fullBio: `Aurelia Edwards is an award-winning 4x founder and operator with 25 years of experience building businesses across health, wellness, events, and technology. She has been trusted by Fortune 100 enterprises to deliver innovative solutions and has a proven track record of bridging capital gaps for sustainable founders.

Aurelia's entrepreneurial journey spans founding and operating multiple companies, giving her deep empathy for the challenges founders face when scaling — particularly those building outside of traditional venture-backed ecosystems. Her experience extends across business development, strategic partnerships, and community-driven growth strategies.

At Edin Capital, Aurelia leads portfolio support and the founder experience, ensuring that the companies Edin invests in receive not just capital but the operational guidance, network access, and strategic support needed to thrive. She is passionate about creating pathways for underestimated founders to build generational wealth and community impact.`,
    linkedinUrl: 'https://www.linkedin.com/in/aureliaedwards/',
  },
  {
    name: 'Erick Gavin',
    role: 'General Partner',
    imageUrl: '/images/team/erick.jpeg',
    shortBio: "Respected ecosystem builder with 10 years developing Miami's innovation landscape. Former Executive Director of Venture Miami.",
    fullBio: `Erick Gavin is a respected ecosystem builder with over 10 years of experience developing Miami's innovation landscape. As the former Executive Director of Venture Miami — the City of Miami's official tech and entrepreneurship initiative — he played a pivotal role in positioning Miami as a leading hub for startups and technology talent.

Erick built Florida's largest incubator program and served as a Partner at Reefside Ventures, where he gained firsthand experience in deal sourcing, due diligence, and portfolio management across early-stage companies. His deep network spans founders, investors, corporate partners, and government stakeholders throughout South Florida's tri-county area and beyond.

At Edin Capital, Erick leads technology, data infrastructure, and deal flow operations. He is responsible for building the firm's internal systems — including the investor portal and analytical tools — and manages the technical architecture that powers Edin's investment operations. His unique combination of ecosystem knowledge and technical capability enables Edin to operate with efficiency and insight beyond its size.`,
    linkedinUrl: 'https://www.linkedin.com/in/erickgavin/',
  },
];

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Team() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Leadership Team
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
            Real-world operators and investors with deep expertise in venture, technology,
            and ecosystem building.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <div key={person.name} className="rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    alt={person.name}
                    src={person.imageUrl}
                    width={120}
                    height={120}
                    className="w-24 h-24 flex-none rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-medium text-green-700 mb-3">{person.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{person.shortBio}</p>

                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    <span>{expandedIndex === index ? 'Show less' : 'Read full bio'}</span>
                    <ExpandIcon expanded={expandedIndex === index} />
                  </button>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line text-left">
                    {person.fullBio}
                  </div>
                </div>
              )}

              <div className="px-6 pb-6 flex justify-center">
                <a
                  href={person.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="w-4 h-4">
                    <path
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
