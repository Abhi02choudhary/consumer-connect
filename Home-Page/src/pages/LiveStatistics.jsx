import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFileAlt, FaCheckCircle } from 'react-icons/fa';

const StatisticCard = ({ icon, label, value, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const countingDuration = 2000; // 2 seconds for the counting animation
  
  useEffect(() => {
    if (inView) {
      // Animate the card
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay }
      });
      
      // Animate the counter
      const startTime = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - startTime;
        const progress = Math.min(timePassed / countingDuration, 1);
        const currentCount = Math.floor(progress * value);
        
        if (progress >= 1) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(currentCount);
        }
      }, 16); // ~60fps
      
      return () => clearInterval(timer);
    }
  }, [inView, value, controls, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className="relative flex flex-col items-center p-6 md:p-8 rounded-xl shadow-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
    >
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-md">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-medium text-gray-800">{label}</h3>
      <div className="flex items-baseline mt-2">
        <span className="text-4xl font-bold text-blue-600 tracking-tight">
          {count.toLocaleString()}
        </span>
        {suffix && <span className="ml-1 text-xl text-blue-500">{suffix}</span>}
      </div>
    </motion.div>
  );
};

const LiveStatistics = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 }
      });
    }
  }, [controls, inView]);
  
  const statistics = [
    {
      icon: <FaFileAlt className="text-blue-500" size={24} />,
      label: "Total Complaints Issued",
      value: 15782,
      delay: 0
    },
    {
      icon: <FaCheckCircle className="text-green-500" size={24} />,
      label: "Total Complaints Resolved",
      value: 12453,
      delay: 0.2
    }
  ];
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Live ConsumerConnect Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every number tells a story—of voices raised, issues resolved, and trust rebuilt through ConsumerConnect.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LiveStatistics;