interface Stat {
  id: number | string;
  name: string;
  value: string;
}

interface StatsProps {
  title?: string;
  description?: string;
  stats: Stat[];
  className?: string;
}

export default function Stats({ 
  title = "Trusted by creators worldwide",
  description = "Lorem ipsum dolor sit amet consect adipisicing possimus.",
  stats,
  className = ""
}: StatsProps) {
  return (
    <div className={`bg-white py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {(title || description) && (
            <div className="text-center">
              {title && (
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {title}
                </h2>
              )}
              {description && <p className="mt-4 text-lg/8 text-gray-600">{description}</p>}
            </div>
          )}
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm/6 font-semibold text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
