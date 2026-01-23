import { motion } from 'motion/react';
import { Flower2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.6, 0.4, 0],
            rotate: [0, 180, 360],
            x: [0, Math.sin(particle.id) * 30],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Flower2
            className="text-amber-300/40"
            style={{ width: particle.size, height: particle.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}
