'use client';

import React, { useEffect } from 'react';
import styles from '../app/styles/EdinOSComponent.module.css';

const EdinOSComponent: React.FC = () => {
  useEffect(() => {
    // Smooth scroll-in animations for cards
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Apply animation to key elements
    const animatedElements = document.querySelectorAll(`.${styles.statCard}, .${styles.platformSection}, .${styles.ecosystemNode}, .${styles.advantageCard}`);
    animatedElements.forEach((element, index) => {
      const el = element as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });

    // Add hover effects for ecosystem center
    const ecosystemCenter = document.querySelector(`.${styles.ecosystemCenter}`);
    if (ecosystemCenter) {
      const handleMouseEnter = () => {
        const el = ecosystemCenter as HTMLElement;
        el.style.transform = 'scale(1.05)';
        el.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
      };
      
      const handleMouseLeave = () => {
        const el = ecosystemCenter as HTMLElement;
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
      };

      ecosystemCenter.addEventListener('mouseenter', handleMouseEnter);
      ecosystemCenter.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        ecosystemCenter.removeEventListener('mouseenter', handleMouseEnter);
        ecosystemCenter.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Progressive metric counting animation
    const metricNumbers = document.querySelectorAll(`.${styles.metricNumber}`);
    metricNumbers.forEach(metric => {
      const finalValue = metric.textContent || '';
      if (finalValue.includes('x') || finalValue.includes('$') || finalValue.includes('%')) {
        return; // Skip non-numeric values
      }
      
      const numericValue = parseInt(finalValue);
      if (!isNaN(numericValue)) {
        let currentValue = 0;
        const increment = numericValue / 30;
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
          }
          metric.textContent = Math.floor(currentValue).toString();
        }, 50);
      }
    });
  }, []);

  return (
    <div className={styles.dashboardContent}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>
          <div className={styles.titleIcon}>🌳</div>
          EdinOS Platform
        </h1>
        <p className={styles.pageSubtitle}>
          Our comprehensive financial and operational platform that represents the next evolution of venture capital infrastructure. EdinOS creates an insurmountable competitive advantage through intelligent automation, real-time monitoring, and predictive analytics.
        </p>
      </div>

     

      {/* Platform Core Components */}
      <div className={styles.contentGrid}>
        <div className={styles.platformSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>💳</div>
            <h2 className={styles.sectionTitle}>Financial Infrastructure</h2>
          </div>
          <div className={styles.capabilitiesList}>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>🔄</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Real-time Profit Calculations</div>
                <div className={styles.capabilityDescription}>Automated quarterly profit-sharing calculations with intelligent trigger monitoring</div>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>📡</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Smart Distribution Engine</div>
                <div className={styles.capabilityDescription}>Seamless execution of distributions with tiered percentage structures</div>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>🔒</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Secure Payment Rails</div>
                <div className={styles.capabilityDescription}>Bank-grade security with automated reconciliation and audit trails</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.platformSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>📊</div>
            <h2 className={styles.sectionTitle}>Portfolio Intelligence</h2>
          </div>
          <div className={styles.capabilitiesList}>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>🎯</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Health Scoring</div>
                <div className={styles.capabilityDescription}>Real-time company health metrics with predictive risk assessment</div>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>🔮</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Predictive Analytics</div>
                <div className={styles.capabilityDescription}>AI-powered forecasting for revenue, growth, and market trends</div>
              </div>
            </div>
            <div className={styles.capabilityItem}>
              <div className={styles.capabilityIcon}>💡</div>
              <div className={styles.capabilityContent}>
                <div className={styles.capabilityTitle}>Prescriptive Insights</div>
                <div className={styles.capabilityDescription}>Actionable recommendations for operational improvements</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence Ecosystem */}
      <div className={styles.fullWidthSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>🧠</div>
          <h2 className={styles.sectionTitle}>Intelligence Ecosystem</h2>
        </div>
        
        <div className={styles.ecosystemDiagram}>
          <div className={styles.ecosystemCenter}>
            EdinOS<br/>
            Intelligence<br/>
            Core
          </div>
          
          <div className={styles.ecosystemNodes}>
            <div className={styles.ecosystemNode}>
              <div className={styles.nodeIcon}>📊</div>
              <div className={styles.nodeTitle}>Data Capture</div>
              <div className={styles.nodeDescription}>Comprehensive data harvesting from portfolio interactions</div>
            </div>
            
            <div className={styles.ecosystemNode}>
              <div className={styles.nodeIcon}>🤖</div>
              <div className={styles.nodeTitle}>AI Processing</div>
              <div className={styles.nodeDescription}>Machine learning algorithms for pattern recognition</div>
            </div>
            
            <div className={styles.ecosystemNode}>
              <div className={styles.nodeIcon}>🔮</div>
              <div className={styles.nodeTitle}>Predictive Models</div>
              <div className={styles.nodeDescription}>Forecasting company needs and market opportunities</div>
            </div>
            
            <div className={styles.ecosystemNode}>
              <div className={styles.nodeIcon}>⚡</div>
              <div className={styles.nodeTitle}>Automated Actions</div>
              <div className={styles.nodeDescription}>Intelligent responses and operational optimizations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Architecture */}
      <div className={styles.fullWidthSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>⚙️</div>
          <h2 className={styles.sectionTitle}>Operations Architecture</h2>
        </div>
        
        <div className={styles.operationsOverview}>
          <div className={styles.operationsColumn}>
            <h3 className={styles.operationsTitle}>Front Office</h3>
            <ul className={styles.operationsList}>
              <li>Sourcing & Screening</li>
              <li>Due Diligence</li>
              <li>Decision Making</li>
              <li>Investor Relations</li>
            </ul>
          </div>
          
          <div className={styles.operationsColumn}>
            <h3 className={styles.operationsTitle}>Middle Office</h3>
            <ul className={styles.operationsList}>
              <li>Portfolio Monitoring</li>
              <li>Risk Management</li>
              <li>Compliance</li>
              <li>Governance</li>
            </ul>
          </div>
          
          <div className={styles.operationsColumn}>
            <h3 className={styles.operationsTitle}>Back Office</h3>
            <ul className={styles.operationsList}>
              <li>Tax & Accounting</li>
              <li>Treasury Management</li>
              <li>Reporting</li>
              <li>Fund Administration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className={styles.competitiveAdvantages}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>🏆</div>
          <h2 className={styles.sectionTitle}>Competitive Advantages</h2>
        </div>
        
        <div className={styles.advantagesGrid}>
          <div className={styles.advantageCard}>
            <div className={styles.advantageHeader}>
              <div className={styles.advantageIcon}>🚀</div>
              <div className={styles.advantageTitle}>First-Mover Technology</div>
            </div>
            <div className={styles.advantageDescription}>
              Proprietary platform capabilities that create massive barriers to entry while generating exponential value for portfolio companies.
            </div>
          </div>
          
          <div className={styles.advantageCard}>
            <div className={styles.advantageHeader}>
              <div className={styles.advantageIcon}>🔗</div>
              <div className={styles.advantageTitle}>Network Effects</div>
            </div>
            <div className={styles.advantageDescription}>
              Each portfolio company increases platform intelligence and value, creating compounding advantages that become more powerful over time.
            </div>
          </div>
          
          <div className={styles.advantageCard}>
            <div className={styles.advantageHeader}>
              <div className={styles.advantageIcon}>📈</div>
              <div className={styles.advantageTitle}>Operational Excellence</div>
            </div>
            <div className={styles.advantageDescription}>
              AI-driven insights and automation that predict company needs and prescribe solutions before problems emerge.
            </div>
          </div>
          
          <div className={styles.advantageCard}>
            <div className={styles.advantageHeader}>
              <div className={styles.advantageIcon}>🎯</div>
              <div className={styles.advantageTitle}>Market Leadership</div>
            </div>
            <div className={styles.advantageDescription}>
              Systematic positioning as the default choice for exceptional companies seeking intelligent capital and operational support.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EdinOSComponent; 