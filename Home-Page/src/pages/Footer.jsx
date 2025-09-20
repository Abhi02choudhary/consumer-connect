import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const FooterLink = ({ children, href = "#" }) => {
    const linkId = children.replace(/\s+/g, '-').toLowerCase();
    const textRef = useRef(null);
    const [textWidth, setTextWidth] = useState(0);
    
    useLayoutEffect(() => {
      if (textRef.current) {
        // Measure text width when hovered
        if (hoveredItem === linkId) {
          setTextWidth(textRef.current.getBoundingClientRect().width);
        }
      }
    }, [hoveredItem, linkId]);
    
    return (
      <div className="relative mb-2">
        <a
          ref={textRef}
          href={href}
          className="text-gray-600 hover:text-gray-800 transition-colors inline-block relative"
          onMouseEnter={() => setHoveredItem(linkId)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {children}
        </a>
        
        {/* Blue line as a separate element */}
        {hoveredItem === linkId && (
          <motion.div
            className="absolute left-0 right-0 mx-auto -bottom-1 h-0.5 bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: textWidth }}
            exit={{ width: 0 }}
            transition={{ duration: 0.2 }}
            style={{ 
              width: textWidth,
              maxWidth: textWidth
            }}
          />
        )}
      </div>
    );
  };
  
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand section */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <div className="text-xl font-bold text-gray-800">
                ConsumerConnect
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Copyright © 2025 ConsumerConnect Ltd.
              <br />
              All rights reserved.
            </p>
          </div>
          
          {/* About */}
          <div className="md:col-span-3">
            <h3 className="text-gray-800 font-medium mb-4">About</h3>
            <div className="flex flex-col gap-2">
              <FooterLink>Product</FooterLink>
              <FooterLink>Use cases</FooterLink>
              <FooterLink>Company</FooterLink>
              <FooterLink>Blog</FooterLink>
            </div>
          </div>
          
          {/* Platform */}
          <div className="md:col-span-3">
            <h3 className="text-gray-800 font-medium mb-4">Platform</h3>
            <div className="flex flex-col gap-2">
              <FooterLink>Developers</FooterLink>
              <FooterLink>Log in</FooterLink>
              <FooterLink>Status</FooterLink>
              <FooterLink>Say Hi</FooterLink>
            </div>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-gray-800 font-medium mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <FooterLink>Privacy policy</FooterLink>
              <FooterLink>Terms of Use</FooterLink>
              <FooterLink>Cookie Policy</FooterLink>
              <FooterLink>Merchant Terms & Conditions</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;