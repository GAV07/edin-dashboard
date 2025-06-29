'use client';

import React, { useEffect } from 'react';
import styles from '../app/styles/EdinOSComponent.module.css';
import { EdinOSHero } from './EdinOSHero';
import EdinOSFeatures from './EdinOSFeatures';
import IntelligenceEcosystem from './IntelligenceEcosystem';
import { OperationsArchitecture } from './OperationsArchitecture';
import CompetitiveAdvantages from './CompetitiveAdvantages';

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
    <div>
      {/* Enhanced Hero Section */}
      <EdinOSHero />

      {/* Platform Core Components */}
      <EdinOSFeatures />

      {/* Intelligence Ecosystem */}
      <IntelligenceEcosystem />

      {/* Operations Architecture */}
      <OperationsArchitecture />

      {/* Competitive Advantages */}
      <CompetitiveAdvantages />
    </div>
  );
};

export default EdinOSComponent; 