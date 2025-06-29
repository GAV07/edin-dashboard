import React from 'react';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  CubeTransparentIcon, 
  BoltIcon 
} from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
}

const features: Feature[] = [
  {
    name: 'Data Capture',
    description:
      'Comprehensive data harvesting from portfolio interactions, creating a rich foundation for intelligent decision-making and automated insights.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'AI Processing',
    description:
      'Machine learning algorithms for pattern recognition that continuously learn from portfolio data to identify trends and opportunities.',
    href: '#',
    icon: CpuChipIcon,
  },
  {
    name: 'Predictive Models',
    description:
      'Forecasting company needs and market opportunities through advanced analytics, enabling proactive investment strategies.',
    href: '#',
    icon: CubeTransparentIcon,
  },
  {
    name: 'Automated Actions',
    description:
      'Intelligent responses and operational optimizations that execute automatically based on data insights and predictive analysis.',
    href: '#',
    icon: BoltIcon,
  },
];

const IntelligenceEcosystem: React.FC = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            Intelligence Ecosystem
          </h2>
          <p className="mt-6 text-lg/8 text-gray-300">
            EdinOS Intelligence Core leverages advanced AI and machine learning to create a comprehensive ecosystem 
            that transforms raw data into actionable insights and automated responses.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceEcosystem; 