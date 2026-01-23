import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface MapBackgroundProps {
  scrollY: number;
}

export function MapBackground({ scrollY }: MapBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #F5E6D3 40%, #FAF0E6 100%)',
        }}
        animate={{
          y: scrollY * 0.1,
        }}
      />

      {/* Clouds - Layer 1 (far) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`cloud-far-${i}`}
            className="absolute bg-white/30 rounded-full blur-xl"
            style={{
              width: Math.random() * 200 + 150,
              height: Math.random() * 60 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      {/* Clouds - Layer 2 (near) */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 1,
          y: mousePosition.y * 1,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`cloud-near-${i}`}
            className="absolute bg-white/40 rounded-full blur-lg"
            style={{
              width: Math.random() * 150 + 100,
              height: Math.random() * 50 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
            }}
            animate={{
              x: [0, 150, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>

      {/* Sunlight rays */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,223,186,0.4) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Mountain silhouettes - Parallax layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          x: mousePosition.x * 0.3,
        }}
      >
        <svg className="w-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          {/* Far mountains */}
          <motion.path
            d="M0,200 Q200,120 400,180 T800,160 L1200,200 L1200,300 L0,300 Z"
            fill="#8B7355"
            opacity="0.3"
            initial={{ y: 20 }}
            animate={{ y: [20, 0, 20] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          {/* Mid mountains */}
          <motion.path
            d="M0,220 Q150,140 300,200 T600,180 T900,210 L1200,230 L1200,300 L0,300 Z"
            fill="#6B5D52"
            opacity="0.5"
            initial={{ y: 10 }}
            animate={{ y: [10, 0, 10] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* Near mountains */}
          <motion.path
            d="M0,250 Q100,180 200,230 T400,220 T600,240 T800,225 T1000,245 L1200,260 L1200,300 L0,300 Z"
            fill="#4A7C59"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Temples/Pagodas silhouettes */}
      <motion.div
        className="absolute bottom-20 left-10"
        style={{
          x: mousePosition.x * 0.8,
          y: mousePosition.y * 0.5,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100">
          {/* Pagoda */}
          <polygon points="40,10 50,30 30,30" fill="#C4302B" opacity="0.8" />
          <rect x="35" y="28" width="10" height="8" fill="#8B4513" />
          <polygon points="40,36 48,46 32,46" fill="#C4302B" opacity="0.7" />
          <rect x="36" y="44" width="8" height="6" fill="#8B4513" />
          <polygon points="40,50 46,58 34,58" fill="#C4302B" opacity="0.6" />
          <rect x="37" y="56" width="6" height="40" fill="#8B4513" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32"
        style={{
          x: mousePosition.x * 1.2,
          y: mousePosition.y * 0.6,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      >
        <svg width="100" height="120" viewBox="0 0 100 120">
          {/* Temple */}
          <polygon points="50,5 80,25 70,25 70,80 30,80 30,25 20,25" fill="#4A7C59" opacity="0.7" />
          <rect x="42" y="50" width="16" height="30" fill="#2C5234" />
          <polygon points="50,0 85,20 15,20" fill="#C4302B" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Ambient light overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(255,223,186,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 35% 35%, rgba(255,223,186,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(255,223,186,0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
