const people = [
    {
      name: 'Venture Bond',
      description: 'The Venture Bond is a new financial instrument that combines equity and profit sharing to deliver superior risk-adjusted returns with increased liquidity for investors and better alignment for founders.',
      href: '#',
    },
    {
      name: 'AI Platform Approach',
      description: 'Edin Capital uses an AI platform to source, evaluate, and manage investments.',
      href: '#',
    },
    {
      name: 'Investment Sourcing',
      description: 'Edin Capital sources investments from a wide range of industries and geographies.',
      href: '#',
    },
  ]
  
  export default function KeyDocs() {
    return (
      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {people.map((person) => (
            <li key={person.description} className="flex items-center justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{person.name}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-500">{person.description}</p>
                </div>
              </div>
              <a
                href={person.href}
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://www.dropbox.com/scl/fo/xnzximqrp7kkf0wyybrcy/AF5aobDNhC5iuzgOK4l8jQE?rlkey=aepgz84yt58ffysnw73fqwqv5&st=hxb02boc&dl=0"
          target="_blank"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          View all
        </a>
      </div>
    )
  }
  