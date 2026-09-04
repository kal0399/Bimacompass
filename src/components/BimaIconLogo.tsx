import React from "react";

interface BimaIconLogoProps {
  className?: string;
}

export default function BimaIconLogo({ className = "w-12 h-12" }: BimaIconLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`${className} shrink-0`}
      id="custom-bimacompass-logo-badge"
    >
      <defs>
        {/* Deep, metallic backdrop gradient representing stability and steel-hard protection */}
        <radialGradient id="shieldBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Dynamic primary compass/shield rim gradient */}
        <linearGradient id="primaryGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Compass needle bright side gradient */}
        <linearGradient id="needleActive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        {/* Compass needle shadow/contrast side gradient */}
        <linearGradient id="needleContrast" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        {/* Soft elegant drop shadow for elements */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="8" stdDeviation="6" floodOpacity="0.4" floodColor="#000000" />
        </filter>
      </defs>

      {/* Outer Glow Perimeter Ring */}
      <circle
        cx="256"
        cy="256"
        r="244"
        fill="none"
        stroke="url(#primaryGold)"
        strokeWidth="2"
        strokeOpacity="0.3"
      />

      {/* Main Protective Shield Base Circle (The secure platform) */}
      <circle
        cx="256"
        cy="256"
        r="236"
        fill="url(#shieldBg)"
        stroke="url(#primaryGold)"
        strokeWidth="6"
        filter="url(#logoShadow)"
      />

      {/* Fine-detailed Outer Compass Ring with Degree Marks */}
      <circle
        cx="256"
        cy="256"
        r="212"
        fill="none"
        stroke="#475569"
        strokeWidth="4.5"
        strokeDasharray="4 8"
      />
      <circle
        cx="256"
        cy="256"
        r="218"
        fill="none"
        stroke="#475569"
        strokeWidth="1.5"
      />

      {/* Elegant Radial Multi-Point Star Background (Compass Rose Base) */}
      <g stroke="url(#primaryGold)" strokeWidth="1" strokeOpacity="0.2">
        <line x1="256" y1="20" x2="256" y2="492" />
        <line x1="20" y1="256" x2="492" y2="256" />
        <line x1="89" y1="89" x2="423" y2="423" />
        <line x1="89" y1="423" x2="423" y2="89" />
      </g>

      {/* Direction Tick Plates */}
      {/* North Arrow */}
      <polygon points="256,42 270,70 242,70" fill="url(#primaryGold)" />
      {/* South Indicator */}
      <circle cx="256" cy="466" r="5" fill="#f59e0b" />
      {/* East Indicator */}
      <circle cx="466" cy="256" r="5" fill="#f59e0b" />
      {/* West Indicator */}
      <circle cx="50" cy="256" r="5" fill="#f59e0b" />

      {/* Cardinal Labels */}
      <text
        x="256"
        y="96"
        textAnchor="middle"
        fill="#f8fafc"
        fontSize="24"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        N
      </text>
      <text
        x="424"
        y="264"
        textAnchor="middle"
        fill="#f59e0b"
        fontSize="20"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        E
      </text>
      <text
        x="256"
        y="436"
        textAnchor="middle"
        fill="#64748b"
        fontSize="20"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        S
      </text>
      <text
        x="88"
        y="264"
        textAnchor="middle"
        fill="#f59e0b"
        fontSize="20"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        W
      </text>

      {/* Sub-cardinal Compass Indicators (NE, SE, SW, NW) */}
      <polygon points="340,160 348,172 356,164" fill="#64748b" />
      <polygon points="340,352 356,348 348,340" fill="#64748b" />
      <polygon points="172,352 164,340 156,348" fill="#64748b" />
      <polygon points="172,160 156,164 164,172" fill="#64748b" />

      {/* Central High-Contrast Advisor Compass Needle */}
      {/* The Needle is dynamically rotated to point Northeast (representing success and safe future prediction) */}
      <g transform="rotate(45 256 256)" filter="url(#logoShadow)">
        {/* Active Tip Light Side (Pointing to Northeast equivalent after rotation) */}
        <path
          d="M 256,56 L 282,256 L 256,238 Z"
          fill="url(#needleActive)"
        />
        {/* Active Tip Dark/Shadow Side */}
        <path
          d="M 256,56 L 230,256 L 256,238 Z"
          fill="url(#needleContrast)"
        />

        {/* Counterweight Tail Light Side */}
        <path
          d="M 256,456 L 274,256 L 256,274 Z"
          fill="url(#primaryGold)"
        />
        {/* Counterweight Tail Shadow Side */}
        <path
          d="M 256,456 L 238,256 L 256,274 Z"
          fill="#b45309"
        />
      </g>

      {/* Central Brass Pivot Pin */}
      <circle
        cx="256"
        cy="256"
        r="28"
        fill="#020617"
        stroke="url(#primaryGold)"
        strokeWidth="4"
        filter="url(#logoShadow)"
      />
      <circle
        cx="256"
        cy="256"
        r="14"
        fill="#fbbf24"
      />
      <circle
        cx="253"
        cy="253"
        r="4"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Shield Embossed Grid Accent Lines (Faint, high technology feeling) */}
      <path
        d="M 176,176 Q 256,140 336,176 Q 300,256 336,336 Q 256,372 176,336 Q 212,256 176,176 Z"
        fill="none"
        stroke="url(#primaryGold)"
        strokeWidth="1.5"
        strokeOpacity="0.1"
      />
    </svg>
  );
}

