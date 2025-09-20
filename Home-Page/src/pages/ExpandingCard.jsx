import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, Activity, Star, ThumbsUp ,CheckCircle} from 'lucide-react';

export default function ExpandingCard() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.05]);
  
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  
  const isCard1InView = useInView(card1Ref, { once: false, amount: 0.3 });
  const isCard2InView = useInView(card2Ref, { once: false, amount: 0.3 });
  const isCard3InView = useInView(card3Ref, { once: false, amount: 0.3 });

  return (
    <div className="w-full py-24 bg-gradient-to-b from-gray-50 to-blue-50" ref={containerRef}>
      <motion.div 
        style={{ scale }} 
        className="max-w-6xl mx-auto rounded-3xl bg-white shadow-xl p-8 md:p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">ConsumerConnect Experience</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Discover how our platform transforms interactions between consumers and services
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between">
          {/* Why ConsumerConnect Card */}
          <motion.div 
            ref={card1Ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isCard1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-gradient-to-br from-sky-500 to-indigo-500 text-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-2xl font-bold">Why ConsumerConnect</div>
              <Shield className="text-white" size={28} />
            </div>
            
            <div className="bg-white bg-opacity-20 p-4 rounded-xl mb-5">
              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-16 h-28 bg-gray-100 rounded-xl shadow-inner mx-auto"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-green-400 animate-blink" size={24} />
                  </div>
                </div>
              </div>
              <div className="text-center text-sm mt-2">Secure submission</div>
            </div>
            
            <p className="mb-4">Empower consumers with confidence through our secure, transparent interface for seamless interactions with services.</p>
            <div className="flex items-center mt-6">
              <div className="h-2 w-full bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-white rounded-full"></div>
              </div>
              <span className="ml-2 font-medium">80%</span>
            </div>
            <div className="text-xs mt-1 opacity-80">faster form submissions</div>
          </motion.div>
          
          {/* Live Tracking Card */}
          <motion.div 
            ref={card2Ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isCard2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-2xl font-bold">Live Tracking</div>
              <Activity className="text-white" size={28} />
            </div>
            
            <div className="bg-white bg-opacity-20 p-4 rounded-xl mb-5">
              <div className="space-y-3">
                {/* Progress bar */}
                <div className="relative flex items-center h-3 rounded-full overflow-hidden mb-2">
                  <div className="w-1/3 h-full bg-emerald-300" />
                  <div className="w-1/3 h-full bg-blue-300" />
                  <div className="w-1/3 h-full bg-gray-300" />
                  <div className="absolute left-1/3 w-3 h-3 bg-white rounded-full shadow-md animate-pulse" />
                </div>

                {/* Labels */}
                <div className="flex justify-between text-xs px-1">
                  <span>Processing</span>
                  <span>In Review</span>
                  <span>Resolved</span>
                </div>

                {/* Status Updates */}
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between bg-white bg-opacity-10 p-2 rounded">
                      <CheckCircle className="text-green-300 animate-blink" size={16} />
                      <div className="flex-1 mx-2 text-xs">Status update {i}</div>
                      <div className="text-xs opacity-80">Now</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mb-4">Monitor progress with our intuitive dashboard featuring live updates and detailed insights at every step.</p>
            <div className="text-4xl font-bold">24/7</div>
            <div className="text-sm opacity-80">real-time monitoring</div>
          </motion.div>

          
          {/* Rating Card */}
          <motion.div 
            ref={card3Ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isCard3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 bg-gradient-to-br from-emerald-400 to-emerald-500 text-white p-8 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-2xl font-bold">You Rate, We Improve</div>
              <Star className="text-white" size={28} fill="white" />
            </div>
            
            <div className="bg-white bg-opacity-20 p-4 rounded-xl mb-5">
              <div className="h-32">
                {/* Rating UI */}
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={i <= 4 ? "text-yellow-300" : "text-white text-opacity-30"} 
                      fill={i <= 4 ? "#fcd34d" : "none"} 
                    />
                  ))}
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-lg mb-3">
                  <div className="text-xs italic">"Great experience! The platform made everything so simple."</div>
                  <div className="text-xs mt-1 font-semibold">- Happy Customer</div>
                </div>
                
                {/* <div className="flex justify-around mt-4">
                  <div className="flex flex-col items-center">
                    <ThumbsUp size={20} className="text-green-300" />
                    <span className="text-xs mt-1">Helpful</span>
                  </div>
                  <div className="w-px h-8 bg-white bg-opacity-30"></div>
                  <div className="flex flex-col items-center opacity-60">
                    <ThumbsUp size={20} className="transform rotate-180" />
                    <span className="text-xs mt-1">Not helpful</span>
                  </div>
                </div> */}
              </div>
              <div className="text-center text-sm mt-2">Customer feedback</div>
            </div>
            
            <p className="mb-4">Share your experience and help us continuously improve our services based on your valuable feedback.</p>
            <div className="text-4xl font-bold">4.8/5</div>
            <div className="text-sm opacity-80">average satisfaction rating</div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all">
            Experience the Difference
          </button>
        </div>
      </motion.div>
    </div>
  );
}