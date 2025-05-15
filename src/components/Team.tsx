import Image from 'next/image';

const people = [
  {
    name: 'Aurelia Edwards',
    role: 'General Partner',
    imageUrl: '/images/team/aurelia.jpeg',
    bio: 'Aurelia Edwards is an accomplished entrepreneur and investor with over 24 years of operating experience. As a three-time founder, she has built and led multiple successful ventures including Standard Measure Technologies as CEO, Pink Scissors Stationery as Principal, and her own therapy practice. Aurelia brings a wealth of global investment experience and startup advisory expertise to Edin Capital. Based in Palm Beach County, she combines her diverse background and entrepreneurial insights to identify promising investment opportunities and support founders on their growth journeys.&apos;',
    xUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/aureliaedwards/',
  },
  {
    name: 'Erick Gavin',
    role: 'General Partner',
    imageUrl: '/images/team/erick.jpeg',
    bio: "Erick Gavin is a respected ecosystem builder with 10 years of experience developing Miami&apos;s innovation landscape. As the former Executive Director of Venture Miami for the City of Miami, he played a pivotal role in shaping the region&apos;s entrepreneurial environment. Erick successfully built Florida&apos;s largest incubator and serves as a Partner at Reefside Ventures. His background includes product design leadership at Dream Impact HK and serving as Senior Program Manager at the Center for Black Innovation. Based in Miami-Dade County, Erick leverages his extensive network and deep understanding of the startup ecosystem to create value for Edin Capital&apos;s portfolio companies.&quot;",
    xUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/erickgavin/',
  },
  {
    name: 'Andrew Davis',
    role: 'Managing Partner',
    imageUrl: '/images/team/andrew.jpeg',
    bio: 'Andrew Davis is an award-winning founder, operator, and investor with impressive credentials in the venture capital world. With 7+ years of venture experience across prestigious firms including Techstars, Comcast, and MakerX, Andrew has developed a keen eye for promising investments. His 10+ years of operating experience spans multiple successful ventures, including roles as Founder of Phoenix, participation in Google&apos;s Community Leaders Program, and leadership positions at companies like Village Music (Founder &amp; CEO) and Musicasa (Head of Product). Based in Broward County, Andrew has built strong relationships with high-net-worth individuals, family offices, and institutions, making him a trusted advisor and community builder within the investment landscape.&apos;',
    xUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/andgerous/',
  },
];

export default function Team() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-full px-6 lg:px-8 xl:grid-cols-6">
        <div className="max-w-xl xl:col-span-2 py-12">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            About the team
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            We&apos;re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our clients.
          </p>
        </div>
        <ul role="list" className="divide-y divide-gray-200 xl:col-span-3">
          {people.map((person) => (
            <li key={person.name} className="flex flex-col gap-10 py-12 first:pt-0 last:pb-0 sm:flex-row">
              <Image
                alt={person.name}
                src={person.imageUrl}
                width={200}
                height={200}
                className="aspect-square w-52 max-h-52 flex-none rounded-2xl object-cover"
              />
              <div className="max-w-4xl flex-auto">
                <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base/7 text-gray-600">{person.role}</p>
                <p className="mt-6 text-base/7 text-gray-600">{person.bio}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a href={person.xUrl} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">X</span>
                      <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                </ul>
                <div className="mt-4">
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 