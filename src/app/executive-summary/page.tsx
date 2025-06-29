import React from 'react';
// If you haven't already, install lucide-react: npm install lucide-react
import { ArrowUpRight, Rocket, DollarSign, Users, Target, ChartBar, Calendar, BarChart2, TrendingUp, Briefcase } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

interface StrategyPointProps {
  text: string;
}

interface TableRowProps {
  label: string;
  value: string;
}

interface TeamMemberProps {
  name: string;
  title: string;
  bio: string;
  location: string;
}

const EdinCapitalSummary = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Edin Capital</h1>
            <p className="text-warmLight mt-1">Fund I Executive Summary</p>
          </div>
          {/* <div className="bg-white bg-opacity-20 rounded-lg p-2">
            <span className="text-white text-sm font-medium">Updated: May 13, 2025</span>
          </div> */}
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50">
        <MetricCard 
          icon={<DollarSign className="h-6 w-6 text-accent" />}
          title="Target Fund Size"
          value="$86M"
          subtitle="Total committed capital with $70M investable"
        />
        <MetricCard 
          icon={<Users className="h-6 w-6 text-mintAccent" />}
          title="Portfolio Size"
          value="35 Companies"
          subtitle="$2M average check size"
        />
        <MetricCard 
          icon={<Target className="h-6 w-6 text-secondary" />}
          title="Target Returns"
          value="3.73x TVPI"
          subtitle="4.56x MOIC | 2.98x DPI"
        />
      </div>

      {/* Fund Strategy */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Rocket className="h-5 w-5 mr-2 text-accent" />
          Investment Strategy
        </h2>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 mb-4">Edin Capital introduces the <span className="font-semibold">Venture Bond</span> — a new financial instrument combining equity with profit sharing that aims to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StrategyPoint text="Increase investor returns & liquidity" />
            <StrategyPoint text="Decrease portfolio risk" />
            <StrategyPoint text="Better align founders and investors interest" />
            <StrategyPoint text="Increased market size for potential companies" />
          </div>
          <div className="mt-6 bg-warmLight p-4 rounded-lg">
            <h3 className="text-md font-semibold text-primary mb-2">Target Profile</h3>
            <p className="text-gray-700">We invest in Goldilocks companies — profitable businesses with $1M+ revenue led by domain experts who are positioned perfectly between early-stage uncertainty and late-stage maturity, seeking patient capital and technology - enabled growth without the constraints of traditional venture capital&apos;s boom-or-bust model.</p>
          </div>
        </div>
      </div>

      {/* Venture Bond Structure */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ChartBar className="h-5 w-5 mr-2 text-secondary" />
          Venture Bond Structure
        </h2>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Investment Components</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-warmLight flex items-center justify-center text-primary mt-0.5 mr-2 flex-shrink-0">1</div>
                  <span className="text-gray-700">Convertible Equity with valuation cap</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-warmLight flex items-center justify-center text-primary mt-0.5 mr-2 flex-shrink-0">2</div>
                  <span className="text-gray-700">Profit-Sharing component with specific triggers</span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Profit-Sharing Triggers (Example)</h3>
              <ul className="space-y-2">
                                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-warmLight flex items-center justify-center text-mintAccent mt-0.5 mr-2 flex-shrink-0">•</div>
                    <span className="text-gray-700">Time: 4 years post-investment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-warmLight flex items-center justify-center text-mintAccent mt-0.5 mr-2 flex-shrink-0">•</div>
                    <span className="text-gray-700">Revenue: $1M LTM</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-warmLight flex items-center justify-center text-mintAccent mt-0.5 mr-2 flex-shrink-0">•</div>
                    <span className="text-gray-700">Margins: 30%</span>
                  </li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-800 mb-2">Profit-Sharing Mechanics</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-2 flex-shrink-0">•</div>
                  <span className="text-gray-700">20% until 2x initial investment</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-2 flex-shrink-0">•</div>
                  <span className="text-gray-700">10% until 4x initial investment</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-2 flex-shrink-0">•</div>
                  <span className="text-gray-700">5% until 6x initial investment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Structure and Economics */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
          Fund Structure & Economics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Fund Terms</h3>
            <table className="w-full">
              <tbody>
                <TableRow label="Fund Life" value="Perpetual" />
                <TableRow label="Deployment Period" value="4 years" />
                <TableRow label="Management Fee" value="2.5%" />
                <TableRow label="Carry" value="20%" />
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Capital Allocation</h3>
            <table className="w-full">
              <tbody>
                <TableRow label="Committed Capital" value="$86M" />
                <TableRow label="Average Check Size" value="$2,000,000" />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Expected Returns */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          Expected Returns & Performance
        </h2>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3">Portfolio Performance</h3>
              <table className="w-full">
                <tbody>
                  <TableRow label="Portfolio Success Rate" value="75% (average)" />
                  <TableRow label="Expected Number of Exits" value="3" />
                  <TableRow label="Average Entry Ownership" value="16%" />
                  <TableRow label="Average Exit Ownership" value="11%" />
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3">Cash Flow Projections</h3>
              <table className="w-full">
                <tbody>
                  <TableRow label="Total Distributions (10y)" value="$222M" />
                  <TableRow label="Portfolio Profits (10y)" value="$1.2B" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Management Team */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TeamMember
            name="Andrew Davis"
            title="Managing Partner"
            bio="3x founder, global investor, and startup advisor with experience at Google & Comcast. Former EIR & Investment Principal at Techstars and Investment Partner at MakerX."
            location="Palm Beach County, FL"
          />
          <TeamMember
            name="Aurelia Edwards"
            title="General Partner"
            bio="Award-winning founder & operator backed by Fortune 100 enterprises. Advisor & community builder among HNWIs, family offices, and institutions."
            location="Broward County, FL"
          />
          <TeamMember
              name="Nelson T"
              title="General Partner"
              bio="Global exec with 25+ yrs Fortune 10-100 & founder of accelerator. Built business from inception to $1B+ in 4yrs @ Sompo. Led ops to $600M - 16 countries, serving 1k multinationals @ AIG. Created first VC/PE asset protection instruments @ Chubb"
              location="Broward County, FL"
            />
          <TeamMember
            name="Erick Gavin"
            title="General Partner"
            bio="10 years of Ecosystem Development in Miami. Former Executive Director at Venture Miami and built Florida&apos;s largest incubator. Partner at Reefside Ventures."
            location="Miami-Dade County, FL"
          />
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
          Competitive Advantage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold text-blue-700 mb-2">Team Expertise</h3>
            <p className="text-gray-700 mb-3">Cross-sector expertise spanning entrepreneurship, investing, startup support, and economic development with extensive network connections across leading organizations.</p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">Network includes Techstars, Fortune 100 enterprises, government entities, HNWIs, celebrities & athletes, and family offices.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-md font-semibold text-blue-700 mb-2">Regional Strength</h3>
            <p className="text-gray-700 mb-3">Deep network across South Florida&apos;s three counties, one of the fastest growing, most diverse, and wealthiest regions in the world.</p>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">Natural proximity to substantial capital with high concentrations of HNWIs, family offices, and financial institutions globally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-100 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button className="mt-3 md:mt-0 flex items-center text-blue-600 hover:text-blue-800 transition">
            <span className="font-medium">View Full Investment Memo</span>
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricCard = ({ icon, title, value, subtitle }: MetricCardProps) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex items-start">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 mt-1">{value}</h3>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

const StrategyPoint = ({ text }: StrategyPointProps) => (
  <div className="flex items-start">
    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 mr-2 flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="text-gray-700">{text}</span>
  </div>
);

const TableRow = ({ label, value }: TableRowProps) => (
  <tr className="border-b border-gray-100 last:border-0">
    <td className="py-2 text-sm text-gray-600">{label}</td>
    <td className="py-2 text-sm font-medium text-gray-900 text-right">{value}</td>
  </tr>
);

const TeamMember = ({ name, title, bio, location }: TeamMemberProps) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <h3 className="font-bold text-gray-900">{name}</h3>
    <p className="text-sm text-blue-600 mb-2">{title}</p>
    <p className="text-sm text-gray-700 mb-3">{bio}</p>
    <div className="flex items-center text-xs text-gray-500">
      <Calendar className="h-3 w-3 mr-1" />
      <span>{location}</span>
    </div>
  </div>
);

export default EdinCapitalSummary;
