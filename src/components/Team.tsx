import Image from 'next/image';

const people = [
  {
    name: 'Andrew Davis',
    role: 'Managing Partner',
    imageUrl: '/images/team/andrew.jpeg',
    bio: 'Award-winning founder, operator, and investor with 7+ years of venture experience at Techstars, Comcast, and MakerX. 10+ years operating experience including Founder of Phoenix and Google Community Leaders Program.',
    linkedinUrl: 'https://www.linkedin.com/in/andgerous/',
  },
  {
    name: 'Aurelia Edwards',
    role: 'General Partner',
    imageUrl: '/images/team/aurelia.jpeg',
    bio: 'Award-winning 4x founder and operator with 25 years experience across health, wellness, events, and technology. Trusted by Fortune 100 enterprises and focused on bridging capital gaps for sustainable founders.',
    linkedinUrl: 'https://www.linkedin.com/in/aureliaedwards/',
  },
  {
    name: 'Erick Gavin',
    role: 'General Partner',
    imageUrl: '/images/team/erick.jpeg',
    bio: "Respected ecosystem builder with 10 years developing Miami's innovation landscape. Former Executive Director of Venture Miami, built Florida's largest incubator, and Partner at Reefside Ventures.",
    linkedinUrl: 'https://www.linkedin.com/in/erickgavin/',
  },
  {
    name: 'Nelson Telemaco',
    role: 'General Partner',
    imageUrl: '/images/team/nelson.jpeg',
    bio: "Corporate executive, serial \"intrapreneur\", startup founder, investor, and board director with expertise in scaling businesses, developing teams, and de-risking enterprises through innovation and execution.",
    linkedinUrl: 'https://www.linkedin.com/in/ntelemaco/',
  },
];

export default function Team() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            About the team
          </h2>
          <p className="mt-6 text-md text-gray-600 max-w-2xl">
            Real-world operators and investors fueling sustainable innovation
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {people.map((person) => (
            <div key={person.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-6">
                <Image
                  alt={person.name}
                  src={person.imageUrl}
                  width={120}
                  height={120}
                  className="w-24 h-24 flex-none rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-3">{person.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{person.bio}</p>
                  <div className="mt-4">
                    <a
                      href={person.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="w-4 h-4">
                        <path
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                      View LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 