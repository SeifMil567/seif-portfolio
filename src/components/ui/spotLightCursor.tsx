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

const DEFAULT_CONFIG: SpotlightConfig = {};

const SpotlightCursor: React.FC<SpotlightCursorProps> = ({
  config = DEFAULT_CONFIG,
  className = "",
  ...rest
}) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsHidden(mobileQuery.matches || motionQuery.matches);
    };

    update();
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
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
      className={`fixed top-0 left-0 pointer-events-none z-40 w-full h-full transition-opacity duration-300 ${
        isHidden ? "opacity-0 invisible" : "opacity-100 visible"
      } ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
