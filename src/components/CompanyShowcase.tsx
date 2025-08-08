'use client';

import React from 'react';
import PortfolioCTA from './PortfolioCTA';

export default function CompanyShowcase() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 dark:text-white mb-4">
            Deal Flow & Pipeline
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            Explore our systematic approach to capturing and leading a new market through our multidimensional sourcing strategy and AI-enhanced intelligence platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">Annual Deal Flow</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">Venture Feeders</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">4 Weeks</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">Due Diligence Process</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">35</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">Target Portfolio Companies</div>
          </div>
        </div>

        {/* Investment Process Excellence Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-10 rounded-xl text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Investment Process Excellence</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            From initial meeting to funding in 4 weeks through our disciplined, data-driven approach. Our systematic evaluation process ensures we identify founder-product-market-timing fit while providing founders with speed and clarity.
          </p>
        </div>

        {/* Deal Flow Pipeline & Funnel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-5 relative pl-6">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
            Deal Flow Pipeline & Funnel
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Our systematic approach to deal sourcing and evaluation ensures we identify the highest-quality opportunities through a disciplined funnel process powered by our network of 50+ venture feeders.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">1000+ Annual Deals</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Comprehensive deal flow from our network of incubators, accelerators, angel groups, venture studios, and strategic partners including Miami Angels and similar organizations.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Universities and Research Institutions
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Strategically aligned Angel Investors
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    VC/PE Firms and Service Providers
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Direct founder outreach and referrals
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">500 Screened Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Initial screening process focuses on companies in our target sectors with strong fundamentals, operating between seed and growth stages.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    2-5 years operating experience
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    $1M+ ARR or clear path within 12 months
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    50%+ annual growth rate plan
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Strong team and market positioning
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">100 Discovery Meetings</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Deep-dive evaluation process with founding teams, including pitch deck reviews, team meetings, and comprehensive due diligence.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    4-week due diligence timeline
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Team, PMF, and traction analysis
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Financial and capital strategy review
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Strategic exit mapping
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">35 Portfolio Companies</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Final portfolio construction with $2M average investment per company, deployed through milestone-based tranches over 5-year period.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    $2M average cumulative investment
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    4 tranches of $500K each
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Performance-based milestone triggers
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Clear path to exit within 3-5 years
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Target Company Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-5 relative pl-6">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
            Target Company Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We focus on mature founders leading early-stage growth companies in our "sweet spot" between seed and growth stage - companies that traditional VC often overlooks but represent exceptional opportunities for sustainable, profitable growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Financial Criteria</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Strong unit economics and clear path to profitability with demonstrated traction and growth potential.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    $1M+ ARR with path to $20M+ ARR
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    40%+ gross margins capability
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    25%+ net margins within 2 years
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Capital efficient growth (Burn Multiple &lt;1)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Stage & Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Companies with proven operational history and strong fundamentals, positioned for scaled growth.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    2-5 years operating experience
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    DE S-Corp structure preferred
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Bootstrapped → F&F → Angel trajectory
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Clean cap table with limited debt
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Sector Focus</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Human flourishing through technology-enabled services with strong competitive advantages and defensible moats.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    AI/ML, Robotics, Commercial R&D
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Industrial, Finance, Blue Tech
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Health & Wellness, Hospitality
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Media/Entertainment
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Geographic Focus</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Southeast/Florida emphasis with national reach, leveraging our deep regional network and economic development alignment.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    FL/Southeast operational preference
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Regional economic development alignment
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    National investment capability
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Strong local ecosystem support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Multidimensional Sourcing Strategy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-5 relative pl-6">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
            Multidimensional Sourcing Strategy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Content & PR</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Flooding the market with thought leadership and content, positioning the Venture Bond as a breakthrough financial innovation while building media relationships that drive qualified deal flow.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Long-form analysis for intellectual credibility
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Short-form video for accessibility
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Strategic media partnerships
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Conference speaking opportunities
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Network Gravity</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Access to 1000+ deals annually through our network of 50+ venture feeders, creating bidirectional value with ecosystem partners who want us to succeed.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Miami Angels and regional angel groups
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Universities and Research Institutions
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Venture Studios and Accelerators
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Service providers and strategic partners
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Strategic Events</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Participating in and hosting events from small, intimate gatherings to large conferences to evangelize our model, build community, and engage with prospective portfolio companies.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Small dinners and intimate gatherings
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Industry conferences and speaking
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Regional and sector-specific events
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Annual summit hosting opportunity
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">AI Enhancement</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Proprietary EdinOS platform automates company discovery and market intelligence at unprecedented scale through our AI-native operation.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Daily data source scanning
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Market signals and intelligence
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Media stakeholder identification
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Event optimization and follow-up
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tranche-Based Investment Strategy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-5 relative pl-6">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
            Tranche-Based Investment Strategy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Our performance-based investment approach deploys capital systematically through milestone-triggered tranches, aligning our success with portfolio company growth while minimizing risk.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tranche 1 - Initial ($500K)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                25% initial guaranteed funding to achieve first critical milestones and validate investment thesis.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Product development or market expansion
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Team scaling and operational setup
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Initial traction and validation
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Foundation for subsequent growth
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tranches 2-4 ($1.5M)</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Performance-based follow-on funding tied to specific operational milestones and projected metrics.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Revenue and profitability targets
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Customer acquisition milestones
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Product development checkpoints
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Market expansion achievements
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Portfolio Construction</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Systematic deployment across 35 companies over 5-year period with built-in risk management and performance optimization.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    $2M average per company
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    5-year deployment timeline
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Performance-based progression
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Clear exit strategy within 3-5 years
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl border-l-4 border-blue-500 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Risk Mitigation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Tranche structure provides natural downside protection while maintaining upside potential through our Venture Bond model.
              </p>
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Milestone-gated capital deployment
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Right to hold back investment
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Preferential position preservation
                  </li>
                  <li className="text-gray-700 dark:text-gray-400 relative pl-5">
                    <span className="absolute left-0 text-blue-500 font-bold">→</span>
                    Performance-based value creation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Market Creation & Category Leadership */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-10 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-5 relative pl-6">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-700 rounded"></div>
            Market Creation & Category Leadership
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            We stand at a generational moment where venture capital's structural challenges converge with massive untapped opportunity. Our multidimensional sourcing strategy establishes us as category creators with structural advantages competitors cannot replicate without fundamental changes to their investment approach.
          </p>
          
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-lg text-center mb-6">
            <strong className="text-lg">The Reality:</strong> Traditional venture funds chase 15,000 VC-backed startups while hundreds of thousands of high-potential, revenue-producing, cash-flowing businesses remain systematically underserved.
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 italic mt-5 leading-relaxed">
            The systematic advantages we'll have will compound exponentially across every channel, while tech enhancements will accelerate our ability to identify, engage, and close the companies that'll shape the future of sustainable business growth.
          </p>
        </div>

        {/* Keep the existing PortfolioCTA component */}
        <PortfolioCTA />
      </div>
    </div>
  );
} 