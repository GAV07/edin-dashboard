interface StatItem {
  name: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface StatsProps {
  stats: StatItem[];
  className?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Stats({ stats, className = '' }: StatsProps) {
  return (
    <dl className={classNames(
      "mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
          {stat.change && (
            <dd
              className={classNames(
                stat.changeType === 'negative' ? 'text-rose-600' : 
                stat.changeType === 'positive' ? 'text-emerald-600' : 'text-gray-700',
                'text-xs font-medium',
              )}
            >
              {stat.change}
            </dd>
          )}
          <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
  