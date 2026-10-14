"use client";

import { useEffect, useRef, useState } from "react";

export default function NameForm({ onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Isi namamu dulu, ya! Aku mau tahu siapa yang lagi main 💗");
      inputRef.current?.focus();
      return;
    }
    onSubmit(trimmed);
  }

  return (
    <section className="name-screen screen-panel" aria-labelledby="name-title">
      <button type="button" className="back-button" onClick={onBack}>← <span>Kembali</span></button>
      <div className="round-icon" aria-hidden="true">💌</div>
      <span className="step-tag">STEP 01 / 02</span>
      <h1 id="name-title" className="section-title">First things first...</h1>
      <p className="section-subtitle">Siapa nih yang mau aku ajak main? 🌷</p>
      <form onSubmit={handleSubmit} className="name-form" noValidate>
        <label htmlFor="player-name">Nama kamu</label>
        <input
          id="player-name"
          ref={inputRef}
          type="text"
          value={name}
          onChange={(event) => { setName(event.target.value); if (error) setError(""); }}
          placeholder="Tulis nama manismu di sini..."
          maxLength={30}
          autoComplete="given-name"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "name-error" : "name-hint"}
        />
        <div className="input-feedback">
          <p id="name-hint" className="field-hint">Maks. 30 karakter</p>
          <span className="character-count">{name.length}/30</span>
        </div>
        <p id="name-error" className="validation-message" aria-live="polite">{error}</p>
        <button type="submit" className="primary-button primary-button--wide">Lanjut, yuk! <span aria-hidden="true">→</span></button>
      </form>
      <div className="bottom-scribble" aria-hidden="true">♡ ♡ ♡</div>
    </section>
  );
}
