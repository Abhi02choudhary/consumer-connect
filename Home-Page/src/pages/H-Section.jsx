import { useEffect } from 'react';
import {
  ArrowRight, User, ShoppingBag, MapPin, Camera, MessageSquare, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const nodes = [
    { id: 'user', top: 15, left: 50, icon: <User className="text-gray-400" />, delay: 0.4 },
    { id: 'chat', top: 25, left: 85, icon: <MessageSquare className="text-gray-400" />, delay: 0.8 },
    { id: 'shop', top: 45, left: 95, icon: <ShoppingBag className="text-gray-400" />, delay: 1.2 },
    { id: 'support', top: 65, left: 80, icon: <HelpCircle className="text-gray-400" />, delay: 1.6 },
    { id: 'camera', top: 75, left: 60, icon: <Camera className="text-gray-400" />, delay: 2.0 },
    { id: 'location', top: 68, left: 30, icon: <MapPin className="text-gray-400" />, delay: 2.3 }
  ];

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Connecting lines */}
      <svg className="absolute w-full h-full top-0 left-0 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M50,15 C60,20 80,30 85,25" stroke="#E5E7EB" strokeWidth="0.3" fill="none"/>
        <path d="M85,25 L95,45" stroke="#E5E7EB" strokeWidth="0.3" fill="none"/>
        <path d="M95,45 C85,55 80,65 80,65" stroke="#E5E7EB" strokeWidth="0.3" fill="none"/>
        <path d="M80,65 L60,75" stroke="#E5E7EB" strokeWidth="0.3" fill="none"/>
        <path d="M60,75 C50,73 40,70 30,68" stroke="#E5E7EB" strokeWidth="0.3" fill="none"/>
        <path d="M50,15 C55,35 60,50 30,68" stroke="#E5E7EB" strokeWidth="0.2" strokeDasharray="1 1" fill="none"/>
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute rounded-full bg-white shadow-md flex items-center justify-center z-10"
          style={{
            width: '44px',
            height: '44px',
            top: `${node.top}%`,
            left: `${node.left}%`,
            animation: `float ${5 + Math.random()}s ease-in-out ${node.delay}s infinite`
          }}
        >
          {node.icon}
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 md:pt-40">
        <div className="max-w-2xl">
          <p className="text-gray-600 mb-2">Powering consumer connections</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            A network built to connect consumers
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Consumer Connect bridges the gap between people and services—
            enabling secure, seamless, and smart interactions across industries.
          </p>
          <Button className="rounded-full bg-blue-500 hover:bg-blue-700 px-6 py-6">
            <span className="mr-2">Get Started</span>
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      {/* Optional trademark/logo corner */}
      {/* <div className="absolute top-16 right-16 text-2xl font-bold text-gray-400">
        CC
      </div> */}
    </div>
  );
}