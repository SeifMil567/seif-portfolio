"use client";

import { HTMLAttributes } from "react";
import useSpotlightEffect from "@/hooks/useSpotlightEffect";

// Define an interface for the spotlight configuration
interface SpotlightConfig {
  radius?: number; // Maps to spotlightSize
  brightness?: number; // Maps to spotlightIntensity
  color?: string; // Maps to glowColor
  smoothing?: number; // Maps to fadeSpeed
}

// Combine props with potential HTML canvas attributes
interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

const SpotlightCursor: React.FC<SpotlightCursorProps> = ({
  config = {},
  className = "",
  ...rest
}) => {
  // Map the properties to match what useSpotlightEffect expects
  const spotlightConfig = {
    spotlightSize: config.radius ?? 200, // Mapping radius -> spotlightSize
    spotlightIntensity: config.brightness ?? 0.15, // Mapping brightness -> spotlightIntensity
    glowColor: config.color ? config.color.replace("#", "") : "255, 255, 255", // Mapping color -> glowColor
    fadeSpeed: config.smoothing ?? 0.1, // Mapping smoothing -> fadeSpeed
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
