"use client";

import { useEffect, useRef, useState } from "react";
import LoveIllustration from "./LoveIllustration";
import { PLAYER_NAME, pickEndingMessage } from "../lib/game";

export default function SurpriseEnding({ onReplay }) {
  const replayRef = useRef(null);
  const [message] = useState(() => pickEndingMessage());
  useEffect(() => replayRef.current?.focus(), []);

  return (
    <section className="ending-screen" aria-labelledby="ending-title">
      <span className="step-tag">SURPRISE UNLOCKED ✨</span>
      <div className="confetti confetti--a" aria-hidden="true">♥</div>
      <div className="confetti confetti--b" aria-hidden="true">✦</div>
      <div className="confetti confetti--c" aria-hidden="true">♥</div>
      <div className="confetti confetti--d" aria-hidden="true">✳</div>
      <div className="ending-illustration"><LoveIllustration ending /></div>
      <h1 id="ending-title" className="ending-title">Gotcha! <span aria-hidden="true">💗</span></h1>
      <p className="ending-greeting">Ini buat kamu, <strong>{PLAYER_NAME}</strong>!</p>
      <blockquote className="ending-message">{message}</blockquote>
      <p className="ending-signature">a little reminder, just for you ♡</p>
      <button ref={replayRef} type="button" className="primary-button" onClick={onReplay}>Play Again <span aria-hidden="true">↻</span></button>
    </section>
  );
}
