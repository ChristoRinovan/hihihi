"use client";

import { useEffect, useRef } from "react";
import LoveIllustration from "./LoveIllustration";

export default function StartScreen({ onStart }) {
  const startRef = useRef(null);
  useEffect(() => startRef.current?.focus(), []);

  return (
    <section className="content-layout start-layout" aria-labelledby="home-title">
      <div className="copy-column">
        <div className="eyebrow"><span className="eyebrow-dot" /> A LITTLE SOMETHING FOR YOU</div>
        <h1 id="home-title" className="hero-title">Mischievous <span>Love</span><span className="title-heart">♡</span></h1>
        <p className="hero-description">Sebuah game kecil, sedikit jahil, dan dibuat khusus untuk bikin harimu lebih manis.</p>
        <p className="handwritten">psst... ada kejutan di akhirnya! ✨</p>
        <button ref={startRef} type="button" className="primary-button" onClick={onStart}>
          Start the game <span aria-hidden="true">↗</span>
        </button>
        <div className="under-button">made with <span aria-hidden="true">♥</span> &amp; a little mischief</div>
      </div>
      <div className="illustration-column">
        <div className="art-frame"><LoveIllustration /><span className="art-label">a tiny love letter for you ♡</span></div>
      </div>
    </section>
  );
}
