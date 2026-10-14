"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getRandomPosition } from "../lib/game";
import GameDialog from "./GameDialog";
import MovingButton from "./MovingButton";

// Seluruh viewport adalah lahan permainan (tanpa box, skor, atau progress bar).
export default function GameScreen({ dialog, busy, fakeCatch, moveSignal, onCatch }) {
  const areaRef = useRef(null);
  const buttonRef = useRef(null);
  const [position, setPosition] = useState(null);
  const previousPositionRef = useRef(null);

  const reposition = useCallback(() => {
    const area = areaRef.current;
    const button = buttonRef.current;
    if (!area || !button) return;

    const width = area.clientWidth;
    const height = area.clientHeight;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    if (!width || !height || !buttonWidth || !buttonHeight) return;

    // Retry a few times to avoid a barely perceptible move in spacious areas.
    let candidate = getRandomPosition(width, height, buttonWidth, buttonHeight);
    const last = previousPositionRef.current;
    if (last && width > 220 && height > 220) {
      for (let attempt = 0; attempt < 8; attempt++) {
        if (Math.hypot(candidate.x - last.x, candidate.y - last.y) >= 120) break;
        candidate = getRandomPosition(width, height, buttonWidth, buttonHeight);
      }
    }
    previousPositionRef.current = candidate;
    setPosition(candidate);
  }, []);

  useLayoutEffect(() => {
    reposition();
  }, [moveSignal, reposition]);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const area = areaRef.current;
    const button = buttonRef.current;
    if (!area || !button) return undefined;
    let animationFrame = null;
    const handleResize = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(reposition);
    };
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(handleResize) : null;
    observer?.observe(area);
    observer?.observe(button);
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [reposition]);

  return (
    <section className="game-screen" ref={areaRef} aria-label="Area permainan">
      <span className="area-deco area-deco--a" aria-hidden="true">✳</span>
      <span className="area-deco area-deco--b" aria-hidden="true">♡</span>
      <span className="area-deco area-deco--c" aria-hidden="true">✦</span>
      <span className="area-deco area-deco--d" aria-hidden="true">✳</span>
      <MovingButton ref={buttonRef} position={position} onCatch={onCatch} busy={busy} fakeCatch={fakeCatch} />
      <GameDialog message={dialog} />
    </section>
  );
}
