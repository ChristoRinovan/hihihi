"use client";

import { useEffect, useRef } from "react";
import LoveIllustration from "./LoveIllustration";

export default function StartScreen({ onStart }) {
  const startRef = useRef(null);
  useEffect(() => startRef.current?.focus(), []);

  return (
    <section className="content-layout start-layout" aria-labelledby="home-title">
      <div className="copy-column">
        
        <h1 id="home-title" className="hero-title">Hihihi <span></span><span className="title-heart">♡</span></h1>
        <p className="hero-description">Jangan cemberut mulu! Main dulu yaak ✨</p>
        <button ref={startRef} type="button" className="primary-button" onClick={onStart}>
          Start the game <span aria-hidden="true">↗</span>
        </button>
        
      </div>
      <div className="illustration-column">
        <div className="art-frame"><LoveIllustration /><span className="art-label"></span></div>
      </div>
    </section>
  );
}
