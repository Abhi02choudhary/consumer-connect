import React from 'react';
import { motion } from 'framer-motion';

// Import your logo images
import zeptoLogo from '../logos/zepto.png';
import bigBasketLogo from '../logos/big-basket.png';
import dMartLogo from '../logos/d-mart.png';
import apolloLogo from '../logos/apollo.png';
import zydusLogo from '../logos/zydus.png';
import amazonLogo from '../logos/amazon.png';
import flipkartLogo from '../logos/flipkart.png';
import relianceLogo from '../logos/reliance.png';
// Import other logos as needed

const TrustedCompanies = () => {
  // Company logos array
  const companyLogos = [
    { name: 'Zepto', logo: zeptoLogo },
    { name: 'Big Basket', logo: bigBasketLogo },
    { name: 'D-Mart', logo: dMartLogo },
    { name: 'Apollo', logo: apolloLogo },
    { name: 'Zydus', logo: zydusLogo },
    { name: 'Amazon', logo: amazonLogo },
    { name: 'Flipkart', logo: flipkartLogo },
    { name: 'Reliance', logo: relianceLogo },
    // Add other companies as needed
  ];
  
  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, x: 50 },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    })
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          {/* Trusted by text on the left */}
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
              Trusted by 50+ companies
            </h2>
            {/* You can add additional text here if needed */}
          </div>
          
          {/* Company logos scrolling from right to left */}
          <div className="md:w-3/4 overflow-hidden">
            <motion.div
              className="flex items-center space-x-10 md:space-x-12"
              animate={{
                x: [0, -1500],
                transition: {
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 30,
                    ease: 'linear',
                  }
                }
              }}
            >
              {companyLogos.map((company, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  className="flex-shrink-0"
                >
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-12 md:h-16 w-auto object-contain" // Larger logos with original colors
                  />
                </motion.div>
              ))}
              
              {/* Duplicate logos for continuous scrolling */}
              {companyLogos.map((company, index) => (
                <motion.div
                  key={`dup-${index}`}
                  custom={index}
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  className="flex-shrink-0"
                >
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-12 md:h-16 w-auto object-contain" // Larger logos with original colors
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;