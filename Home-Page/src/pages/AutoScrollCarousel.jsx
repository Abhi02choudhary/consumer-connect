import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
//Imaages
import { Star } from 'lucide-react';
import GirlImg from '../cards/GirlImg.png'
import boyImg from '../cards/boyImg.jpg'
import OkGirl from '../cards/OkGirl.png'
import OkBoy from '../cards/OkBoy.png'

// For demonstration, we'll use placeholder URLs but you'd replace these with your actual imports
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    message: "ConsumerConnect helped me resolve a refund issue with Amazon that had been pending for weeks. Their team was responsive and got me my money back within days!",
    // You'd use your imported avatar here: avatar: avatar1
    avatar: GirlImg // Replace with your actual cartoon avatar
  },
  {
    id: 2,
    name: "Raj Patel",
    rating: 5,
    message: "After struggling to get a response from D-Mart about a faulty product, ConsumerConnect stepped in and facilitated communication. Issue resolved in 48 hours!",
    avatar: boyImg // Replace with your actual cartoon avatar
  },
  {
    id: 3,
    name: "Amelia Williams",
    rating: 4,
    message: "I had billing concerns with Zydus Hospitals that were causing stress. ConsumerConnect provided clear guidance and helped rectify the overcharge promptly.",
    avatar: OkGirl // Replace with your actual cartoon avatar
  },
  {
    id: 4,
    name: "David Chen",
    rating: 4,
    message: "When Apollo Diagnostics mixed up my test results, ConsumerConnect guided me through the complaint process. Their expertise was invaluable!",
    avatar: OkBoy // Replace with your actual cartoon avatar
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
    className="flex-shrink-0 w-80 mx-4 mt-10 mb-8"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative pt-40 pl-12">
      {/* Avatar positioned to the left top of the card */}
      <div className="absolute -top-0 -left-2 w-40 h-40">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name} avatar`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full">
            {/* Empty div - you'll add images later */}
          </div>
        )}
      </div>
      
      {/* Card with content */}
      <div className="bg-white rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed text-center">{testimonial.message}</p>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const AutoScrollCarousel = () => {
  const carouselRef = useRef(null);
  const controls = useAnimation();
  
  useEffect(() => {
    let scrollInterval;
    let isPaused = false;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (carouselRef.current && !isPaused) {
          if (carouselRef.current.scrollLeft >= 
              carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10) {
            // Reset to start when reaching the end
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll by one card width
            carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
          }
        }
      }, 1200); // Scroll every 3 seconds
    };
    
    // Start auto-scrolling
    startAutoScroll();
    
    // Pause scrolling when user interacts
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    const handleTouchStart = () => { isPaused = true; };
    const handleTouchEnd = () => {
      isPaused = false;
      // Resume after 2 seconds of no touch
      setTimeout(() => { isPaused = false; }, 2000);
    };
    
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
      carousel.addEventListener('touchstart', handleTouchStart);
      carousel.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      clearInterval(scrollInterval);
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        carousel.removeEventListener('touchstart', handleTouchStart);
        carousel.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        💬 Stories from Satisfied Consumers
      </h2>
      
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
          
          {/* Clone first few cards to create infinite scroll effect */}
          {testimonials.slice(0, 2).map(testimonial => (
            <TestimonialCard 
              key={`clone-${testimonial.id}`} 
              testimonial={testimonial} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel;