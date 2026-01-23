import { motion } from 'motion/react';
import { Checkpoint as CheckpointType } from '../types/game';

interface VintageMapProps {
  checkpoints: CheckpointType[];
  onCheckpointClick: (checkpoint: CheckpointType) => void;
}

export function VintageMap({ checkpoints, onCheckpointClick }: VintageMapProps) {
  return (
    <div className="relative w-full h-full">
      {/* Vintage map container with aged paper effect */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        style={{
          filter: 'url(#paper-texture)',
        }}
      >
        <defs>
          {/* Paper texture filter */}
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="#F5E6D3" surfaceScale="2">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
          </filter>

          {/* Decorative patterns */}
          <pattern id="mountain-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 5 25 L 10 15 L 15 25 M 15 25 L 20 10 L 25 25" stroke="#8B7355" strokeWidth="1" fill="none" />
          </pattern>

          <pattern id="tree-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 10 18 L 10 12 M 7 12 L 10 8 L 13 12" stroke="#4A7C59" strokeWidth="1" fill="none" />
          </pattern>

          {/* Decorative border pattern */}
          <pattern id="border-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 0 20 Q 10 10, 20 20 T 40 20"
              stroke="#8B4513"
              strokeWidth="2"
              fill="none"
            />
          </pattern>
        </defs>

        {/* Aged paper background */}
        <rect width="1200" height="800" fill="#F5E6D3" />

        {/* Decorative border */}
        <rect
          x="30"
          y="30"
          width="1140"
          height="740"
          fill="none"
          stroke="#8B4513"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <rect
          x="40"
          y="40"
          width="1120"
          height="720"
          fill="none"
          stroke="#8B4513"
          strokeWidth="2"
        />

        {/* Title banner */}
        <g>
          {/* Flowing ribbon */}
          <motion.path
            d="M 200 80 Q 250 60, 300 80 L 900 80 Q 950 60, 1000 80 L 1000 120 Q 950 100, 900 120 L 300 120 Q 250 100, 200 120 Z"
            fill="#F5E6D3"
            stroke="#8B4513"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          {/* Ribbon tails */}
          <path d="M 200 80 Q 180 90, 190 110 Q 195 100, 200 120" fill="#E5D4C1" stroke="#8B4513" strokeWidth="2" />
          <path d="M 1000 80 Q 1020 90, 1010 110 Q 1005 100, 1000 120" fill="#E5D4C1" stroke="#8B4513" strokeWidth="2" />
          
          <text
            x="600"
            y="108"
            textAnchor="middle"
            fontFamily="serif"
            fontSize="32"
            fontWeight="bold"
            fill="#8B4513"
            style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.1)' }}
          >
            Hành Trình Phật Giáo Việt Nam
          </text>
        </g>

        {/* Mountains in background - Northern region */}
        <g opacity="0.3">
          <path
            d="M 100 300 L 150 200 L 200 250 L 250 180 L 300 240 L 350 200 L 400 280 L 100 300 Z"
            fill="#8B7355"
            stroke="#6B5D52"
            strokeWidth="2"
          />
          <path
            d="M 800 350 L 900 220 L 950 280 L 1000 240 L 1050 300 L 1100 350 L 800 350 Z"
            fill="#8B7355"
            stroke="#6B5D52"
            strokeWidth="2"
          />
        </g>

        {/* Trees - scattered around */}
        {[...Array(40)].map((_, i) => {
          const x = 100 + (i * 27) % 1000;
          const y = 200 + ((i * 43) % 400);
          const size = 8 + (i % 3) * 2;
          
          return (
            <g key={`tree-${i}`} opacity="0.4">
              <line x1={x} y1={y} x2={x} y2={y - size} stroke="#4A7C59" strokeWidth="1.5" />
              <path
                d={`M ${x - size / 2} ${y - size} L ${x} ${y - size * 1.5} L ${x + size / 2} ${y - size} Z`}
                fill="#4A7C59"
                stroke="#2C5234"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Rivers/paths */}
        <motion.path
          d="M 100 650 Q 200 630, 300 650 Q 450 680, 600 650 Q 750 620, 900 650 Q 1000 670, 1100 650"
          fill="none"
          stroke="#87CEEB"
          strokeWidth="3"
          strokeDasharray="5 5"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* The main path connecting checkpoints */}
        <motion.path
          d={generatePathFromCheckpoints(checkpoints)}
          fill="none"
          stroke="#8B4513"
          strokeWidth="4"
          strokeDasharray="8 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1 }}
        />

        {/* Decorative elements - Pagodas/Temples at key locations */}
        {/* Temple 1 - Lý Dynasty */}
        <g transform="translate(200, 550)">
          <TempleIcon />
        </g>

        {/* Temple 2 - Trần Dynasty */}
        <g transform="translate(500, 450)">
          <PagodaIcon />
        </g>

        {/* Temple 3 - Modern */}
        <g transform="translate(900, 300)">
          <TempleIcon />
        </g>

        {/* Compass rose */}
        <g transform="translate(1050, 650)">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0 0' }}
          >
            <circle r="40" fill="none" stroke="#8B4513" strokeWidth="2" />
            <path d="M 0 -35 L 5 -10 L 0 -15 L -5 -10 Z" fill="#C4302B" stroke="#8B4513" strokeWidth="1" />
            <text y="-42" textAnchor="middle" fontSize="12" fontFamily="serif" fill="#8B4513">
              N
            </text>
          </motion.g>
          <text y="55" textAnchor="middle" fontSize="10" fontFamily="serif" fill="#8B4513">
            S
          </text>
          <text x="45" y="5" textAnchor="middle" fontSize="10" fontFamily="serif" fill="#8B4513">
            E
          </text>
          <text x="-45" y="5" textAnchor="middle" fontSize="10" fontFamily="serif" fill="#8B4513">
            W
          </text>
        </g>

        {/* Era labels in vintage style */}
        <text x="250" y="600" fontFamily="serif" fontSize="20" fontStyle="italic" fill="#4A7C59" opacity="0.6">
          Lý - Trần
        </text>
        <text x="550" y="480" fontFamily="serif" fontSize="20" fontStyle="italic" fill="#C4302B" opacity="0.6">
          Tây Sơn
        </text>
        <text x="750" y="380" fontFamily="serif" fontSize="20" fontStyle="italic" fill="#9370DB" opacity="0.6">
          Cận đại
        </text>
        <text x="920" y="280" fontFamily="serif" fontSize="20" fontStyle="italic" fill="#4169E1" opacity="0.6">
          Hiện đại
        </text>

        {/* Age marks and stains */}
        <circle cx="150" cy="150" r="20" fill="#D2B48C" opacity="0.1" />
        <circle cx="1050" cy="200" r="30" fill="#D2B48C" opacity="0.08" />
        <circle cx="300" cy="700" r="25" fill="#D2B48C" opacity="0.09" />
      </svg>
    </div>
  );
}

// Helper function to generate SVG path from checkpoints
function generatePathFromCheckpoints(checkpoints: CheckpointType[]): string {
  if (checkpoints.length === 0) return '';

  const pathParts: string[] = [];
  const mapWidth = 1200;
  const mapHeight = 800;

  // Convert percentage positions to SVG coordinates
  const convertPos = (checkpoint: CheckpointType) => ({
    x: (checkpoint.x / 100) * mapWidth,
    y: (checkpoint.y / 100) * mapHeight,
  });

  const firstPos = convertPos(checkpoints[0]);
  pathParts.push(`M ${firstPos.x} ${firstPos.y}`);

  for (let i = 1; i < checkpoints.length; i++) {
    const pos = convertPos(checkpoints[i]);
    const prevPos = convertPos(checkpoints[i - 1]);
    
    // Create smooth curves using quadratic bezier
    const controlX = (prevPos.x + pos.x) / 2;
    const controlY = (prevPos.y + pos.y) / 2 - 20; // Slight upward curve
    
    pathParts.push(`Q ${controlX} ${controlY} ${pos.x} ${pos.y}`);
  }

  return pathParts.join(' ');
}

// Temple icon component
function TempleIcon() {
  return (
    <g>
      <rect x="-20" y="10" width="40" height="30" fill="#C4302B" stroke="#8B4513" strokeWidth="2" />
      <rect x="-15" y="20" width="10" height="20" fill="#8B4513" />
      <path d="M -25 10 L 0 -5 L 25 10" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      <rect x="-3" y="25" width="6" height="15" fill="#654321" />
    </g>
  );
}

// Pagoda icon component
function PagodaIcon() {
  return (
    <g>
      <path d="M 0 -20 L 8 -15 L 6 -15 L 6 -10 L 12 -5 L 10 -5 L 10 0 L 15 5 L 13 5 L 13 15 L -13 15 L -13 5 L -15 5 L -10 0 L -10 -5 L -12 -5 L -6 -10 L -6 -15 L -8 -15 Z" 
        fill="#C4302B" 
        stroke="#8B4513" 
        strokeWidth="1.5" 
      />
      <rect x="-3" y="8" width="6" height="7" fill="#654321" />
    </g>
  );
}

export default VintageMap;
