import React from 'react';
import { cn } from "@/lib/utils";
import {
  IconSearch,
  IconClipboardCheck,
  IconBrain,
  IconUsers,
  IconEye,
  IconShield,
  IconScale,
  IconSettings,
  IconCalculator,
  IconCoin,
  IconFileText,
  IconDatabase,
} from "@tabler/icons-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function OperationsArchitecture() {
  const features: Feature[] = [
    // Front Office
    {
      title: "Sourcing & Screening",
      description: "Systematic identification and initial evaluation of investment opportunities across target markets.",
      icon: <IconSearch />,
    },
    {
      title: "Due Diligence",
      description: "Comprehensive analysis and verification of investment opportunities through rigorous evaluation processes.",
      icon: <IconClipboardCheck />,
    },
    {
      title: "Decision Making",
      description: "Strategic investment committee processes that leverage data-driven insights for optimal outcomes.",
      icon: <IconBrain />,
    },
    {
      title: "Investor Relations",
      description: "Transparent communication and relationship management with limited partners and stakeholders.",
      icon: <IconUsers />,
    },
    // Middle Office
    {
      title: "Portfolio Monitoring",
      description: "Real-time tracking and performance analysis of portfolio companies and investment health.",
      icon: <IconEye />,
    },
    {
      title: "Risk Management",
      description: "Proactive identification, assessment, and mitigation of investment and operational risks.",
      icon: <IconShield />,
    },
    {
      title: "Compliance",
      description: "Adherence to regulatory requirements and industry standards across all operations.",
      icon: <IconScale />,
    },
    {
      title: "Governance",
      description: "Board representation and strategic guidance for portfolio companies and fund operations.",
      icon: <IconSettings />,
    },
    // Back Office
    {
      title: "Tax & Accounting",
      description: "Comprehensive financial reporting, tax optimization, and accounting operations management.",
      icon: <IconCalculator />,
    },
    {
      title: "Treasury Management",
      description: "Capital deployment, cash management, and financial planning across fund operations.",
      icon: <IconCoin />,
    },
    {
      title: "Reporting",
      description: "Regular performance reporting and analytics for investors and regulatory requirements.",
      icon: <IconFileText />,
    },
    {
      title: "Fund Administration",
      description: "Operational support, record keeping, and administrative services for fund management.",
      icon: <IconDatabase />,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Operations Architecture
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Our comprehensive operational framework spans front, middle, and back office functions, 
            ensuring seamless execution and management across all aspects of venture capital operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200",
        (index === 0 || index === 4 || index === 8) && "lg:border-l border-neutral-200",
        index < 8 && "lg:border-b border-neutral-200"
      )}
    >
      {index < 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none" />
      )}
      {index >= 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-emerald-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 