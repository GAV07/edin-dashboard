import React from 'react';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  SignalIcon,
  LightBulbIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'financial' | 'intelligence';
}

const features: Feature[] = [
  {
    name: 'Real-time Profit Calculations',
    description: 'Automated quarterly profit-sharing calculations with intelligent trigger monitoring',
    icon: CurrencyDollarIcon,
    category: 'financial',
  },
  {
    name: 'Smart Distribution Engine',
    description: 'Seamless execution of distributions with tiered percentage structures',
    icon: SignalIcon,
    category: 'financial',
  },
  {
    name: 'Secure Payment Rails',
    description: 'Bank-grade security with automated reconciliation and audit trails',
    icon: ShieldCheckIcon,
    category: 'financial',
  },
  {
    name: 'Health Scoring',
    description: 'Real-time company health metrics with predictive risk assessment',
    icon: EyeIcon,
    category: 'intelligence',
  },
  {
    name: 'Predictive Analytics',
    description: 'AI-powered forecasting for revenue, growth, and market trends',
    icon: ChartBarIcon,
    category: 'intelligence',
  },
  {
    name: 'Prescriptive Insights',
    description: 'Actionable recommendations for operational improvements',
    icon: LightBulbIcon,
    category: 'intelligence',
  },
];

const EdinOSFeatures: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <h2 className="col-span-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Platform Core Components
          </h2>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className={`mb-4 flex h-8 w-8 items-center justify-center rounded ${
                    feature.category === 'financial' 
                      ? 'bg-emerald-600' 
                      : 'bg-blue-600'
                  }`}>
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EdinOSFeatures; 