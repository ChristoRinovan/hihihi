"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getRandomPosition } from "../lib/game";
import GameDialog from "./GameDialog";
import MovingButton from "./MovingButton";

export default function GameScreen({ name, target, progress, dialog, busy, fakeCatch, moveSignal, onCatch }) {
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
        if (Math.hypot(candidate.x - last.x, candidate.y - last.y) >= 80) break;
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
    <section className="game-screen" aria-labelledby="game-title">
      <div className="game-topline"><span className="step-tag">STEP 02 / 02</span><span className="game-player">playing as <strong>{name}</strong> ♡</span></div>
      <div className="game-heading">
        <div><h1 id="game-title" className="section-title">Catch my heart! <span aria-hidden="true">💘</span></h1><p className="section-subtitle">Kejar tombol pink-nya sampai ketangkep, ya!</p></div>
        <div className="score-pill" aria-label={`${progress} dari ${target} klik berhasil`}><strong>{progress}</strong><span> / {target}</span></div>
      </div>
      <div className="progress-track" role="progressbar" aria-label="Progres permainan" aria-valuemin={0} aria-valuemax={target} aria-valuenow={progress}>
        <div className="progress-fill" style={{ width: `${(progress / target) * 100}%` }} />
      </div>
      <div className="play-area" ref={areaRef}>
        <span className="area-deco area-deco--a" aria-hidden="true">✳</span><span className="area-deco area-deco--b" aria-hidden="true">♡</span><span className="area-deco area-deco--c" aria-hidden="true">✦</span><span className="area-deco area-deco--d" aria-hidden="true">✳</span>
        <MovingButton ref={buttonRef} position={position} onCatch={onCatch} progress={progress} target={target} busy={busy} fakeCatch={fakeCatch} />
      </div>
      <GameDialog message={dialog} />
      <p className="game-hint">💡 Tip: tombolnya suka kabur, tapi kamu pasti bisa!</p>
    </section>
  );
}
