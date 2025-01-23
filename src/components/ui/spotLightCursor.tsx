"use client";

import { HTMLAttributes, useEffect, useState, useMemo } from "react";
import useSpotlightEffect from "@/hooks/useSpotlightEffect";

// Define an interface for the spotlight configuration
interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
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
  const [isMobile, setIsMobile] = useState(false);

  // Use matchMedia for accurate device detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Map config properties correctly for useSpotlightEffect
  const spotlightConfig = useMemo(
    () => ({
      spotlightSize: config.radius ?? 500, // Mapping radius -> spotlightSize
      spotlightIntensity: config.brightness ?? 1, // Mapping brightness -> spotlightIntensity
      glowColor: config.color ? config.color.replace("#", "") : "20, 40, 70", // Mapping color -> glowColor
      fadeSpeed: config.smoothing ?? 0.8, // Mapping smoothing -> fadeSpeed
    }),
    [config]
  );

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full transition-opacity duration-300 ${
        isMobile ? "opacity-0 invisible" : "opacity-100 visible"
      } ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
