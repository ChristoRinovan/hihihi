"use client";

import { forwardRef } from "react";

const MovingButton = forwardRef(function MovingButton(
  { position, onCatch, progress, target, busy, fakeCatch },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onCatch}
      aria-label={`Tangkap hati. Klik berhasil ${progress} dari ${target}.`}
      aria-disabled={busy}
      className={`moving-button ${fakeCatch ? "moving-button--fake" : ""} ${position ? "" : "moving-button--center"}`}
      style={position ? { left: `${position.x}px`, top: `${position.y}px` } : undefined}
    >
      <span className="button-heart" aria-hidden="true">♥</span>
      <span>{fakeCatch ? "Eits!" : "Catch me!"}</span>
      <span className="button-sparkle" aria-hidden="true">✦</span>
    </button>
  );
});

export default MovingButton;
