import { useMemo } from 'react';

type ShapeType = 'cube' | 'triangle' | 'square' | 'diamond' | 'circle' | 'star';

interface FloatingShape {
  id: number;
  type: ShapeType;
  size: number;
  left: number;
  top: number;
  color: string;
  duration: number;
  reverse: boolean;
  delay: number;
}

const COLORS = [
  '#f0a830',
  '#ffd966',
  '#8b6f54',
  '#a8896a',
  '#6b5240',
  '#e87d8b',
  '#5fbf6f',
];

const SHAPE_TYPES: ShapeType[] = ['cube', 'triangle', 'square', 'diamond', 'circle', 'star'];

function Shape({ shape }: { shape: FloatingShape }) {
  const animClass = shape.reverse ? 'animate-float-rev' : 'animate-float';

  if (shape.type === 'cube') {
    return (
      <div
        className={`absolute ${animClass} no-select`}
        style={{
          left: `${shape.left}%`,
          top: `${shape.top}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          animationDuration: `${shape.duration}s`,
          animationDelay: `${shape.delay}s`,
          transformStyle: 'preserve-3d',
          perspective: '100px',
        }}
      >
        <div
          className="w-full h-full animate-spin-slow"
          style={{
            animationDuration: `${shape.duration * 2}s`,
            backgroundImage: `
              linear-gradient(45deg, ${shape.color} 25%, transparent 25%, transparent 75%, ${shape.color} 75%),
              linear-gradient(45deg, ${shape.color} 25%, transparent 25%, transparent 75%, ${shape.color} 75%)`,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 4px 4px',
            backgroundColor: `${shape.color}55`,
            boxShadow: `inset 0 0 0 3px ${shape.color}`,
            imageRendering: 'pixelated',
          }}
        />
      </div>
    );
  }

  if (shape.type === 'triangle') {
    return (
      <div
        className={`absolute ${animClass} no-select`}
        style={{
          left: `${shape.left}%`,
          top: `${shape.top}%`,
          width: '0',
          height: '0',
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
          animationDuration: `${shape.duration}s`,
          animationDelay: `${shape.delay}s`,
          filter: `drop-shadow(2px 2px 0 rgba(0,0,0,0.4))`,
        }}
      />
    );
  }

  if (shape.type === 'diamond') {
    return (
      <div
        className={`absolute ${animClass} no-select`}
        style={{
          left: `${shape.left}%`,
          top: `${shape.top}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          animationDuration: `${shape.duration}s`,
          animationDelay: `${shape.delay}s`,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: 'rotate(45deg)',
            backgroundColor: `${shape.color}66`,
            border: `3px solid ${shape.color}`,
            imageRendering: 'pixelated',
          }}
        />
      </div>
    );
  }

  if (shape.type === 'star') {
    const points = [];
    const cx = shape.size / 2;
    const cy = shape.size / 2;
    const outerR = shape.size / 2;
    const innerR = shape.size / 4;
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return (
      <div
        className={`absolute ${animClass} no-select`}
        style={{
          left: `${shape.left}%`,
          top: `${shape.top}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          animationDuration: `${shape.duration}s`,
          animationDelay: `${shape.delay}s`,
          filter: `drop-shadow(2px 2px 0 rgba(0,0,0,0.4))`,
        }}
      >
        <svg width={shape.size} height={shape.size} className="animate-spin-slow" style={{ animationDuration: `${shape.duration * 3}s` }}>
          <polygon
            points={points.join(' ')}
            fill={`${shape.color}55`}
            stroke={shape.color}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  if (shape.type === 'circle') {
    return (
      <div
        className={`absolute ${animClass} no-select`}
        style={{
          left: `${shape.left}%`,
          top: `${shape.top}%`,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          animationDuration: `${shape.duration}s`,
          animationDelay: `${shape.delay}s`,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius: '50%',
            backgroundColor: `${shape.color}33`,
            border: `3px solid ${shape.color}`,
            boxShadow: `0 0 12px ${shape.color}44`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute ${animClass} no-select`}
      style={{
        left: `${shape.left}%`,
        top: `${shape.top}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        animationDuration: `${shape.duration}s`,
        animationDelay: `${shape.delay}s`,
        backgroundColor: `${shape.color}33`,
        border: `3px solid ${shape.color}`,
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default function PixelBackground() {
  const shapes = useMemo<FloatingShape[]>(() => {
    const arr: FloatingShape[] = [];
    for (let i = 0; i < 14; i++) {
      arr.push({
        id: i,
        type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
        size: 24 + Math.floor(Math.random() * 48),
        left: Math.random() * 90,
        top: Math.random() * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: 4 + Math.random() * 5,
        reverse: Math.random() > 0.5,
        delay: Math.random() * 3,
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1410 0%, #2a1f18 40%, #1a1410 100%)',
        }}
      />
      <div className="absolute inset-0 pixel-grid-bg opacity-40" />
      {shapes.map((s) => (
        <Shape key={s.id} shape={s} />
      ))}
      <div className="absolute inset-0 crt-vignette scanlines" />
    </div>
  );
}
