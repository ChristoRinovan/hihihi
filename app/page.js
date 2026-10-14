"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StartScreen from "../components/StartScreen";
import GameScreen from "../components/GameScreen";
import SurpriseEnding from "../components/SurpriseEnding";
import { generateTarget, pickDialog, shouldFakeCatch, shouldShowDialog } from "../lib/game";

export default function HomePage() {
  const [screen, setScreen] = useState("start");
  const [dialog, setDialog] = useState("");
  const [fakeCatch, setFakeCatch] = useState(false);
  const [busy, setBusy] = useState(false);
  const [moveSignal, setMoveSignal] = useState(0);
  const [sessionId, setSessionId] = useState(0);
  const lockRef = useRef(false);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const screenRef = useRef("start");
  const previousDialogRef = useRef(null);
  const dialogTimerRef = useRef(null);
  const timersRef = useRef(new Set());

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) clearTimeout(timer);
    timersRef.current.clear();
    dialogTimerRef.current = null;
  }, []);

  const schedule = useCallback((callback, duration) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, duration);
    timersRef.current.add(timer);
    return timer;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (screen !== "celebrating") return undefined;
    const timer = schedule(() => {
      screenRef.current = "won";
      setScreen("won");
    }, 900);
    return () => {
      clearTimeout(timer);
      timersRef.current.delete(timer);
    };
  }, [screen, schedule]);

  function goToScreen(nextScreen) {
    screenRef.current = nextScreen;
    setScreen(nextScreen);
  }

  function startSession() {
    clearTimers();
    const nextTarget = generateTarget();
    lockRef.current = false;
    progressRef.current = 0;
    targetRef.current = nextTarget;
    previousDialogRef.current = null;
    setDialog("");
    setFakeCatch(false);
    setBusy(false);
    setMoveSignal(0);
    setSessionId((current) => current + 1);
    goToScreen("playing");
  }

  function catchHeart() {
    // A synchronous ref lock rejects double clicks, double taps, and late events.
    if (screenRef.current !== "playing" || lockRef.current) return;
    lockRef.current = true;
    setBusy(true);

    const nextProgress = progressRef.current + 1;
    progressRef.current = nextProgress;

    if (nextProgress >= targetRef.current) {
      // No fake catch or position update is allowed on the winning click.
      clearTimers();
      setDialog("");
      setFakeCatch(false);
      goToScreen("celebrating");
      return;
    }

    const isFakeCatch = shouldFakeCatch(nextProgress, targetRef.current);
    if (shouldShowDialog(nextProgress, isFakeCatch)) {
      const message = pickDialog(previousDialogRef.current);
      previousDialogRef.current = message;
      setDialog(message);
      if (dialogTimerRef.current !== null) {
        clearTimeout(dialogTimerRef.current);
        timersRef.current.delete(dialogTimerRef.current);
      }
      dialogTimerRef.current = schedule(() => {
        dialogTimerRef.current = null;
        setDialog("");
      }, 1550);
    }

    if (isFakeCatch) {
      setFakeCatch(true);
      schedule(() => {
        setFakeCatch(false);
        setMoveSignal((current) => current + 1);
        schedule(() => {
          lockRef.current = false;
          setBusy(false);
        }, 130);
      }, 650);
    } else {
      setMoveSignal((current) => current + 1);
      schedule(() => {
        lockRef.current = false;
        setBusy(false);
      }, 170);
    }
  }

  return (
    <main className="app-shell">
      <div className="background-orb background-orb--left" aria-hidden="true" />
      <div className="background-orb background-orb--right" aria-hidden="true" />
      {screen === "start" && <StartScreen onStart={startSession} />}
      {screen === "playing" && (
        <GameScreen key={sessionId} dialog={dialog} busy={busy} fakeCatch={fakeCatch} moveSignal={moveSignal} onCatch={catchHeart} />
      )}
      {screen === "celebrating" && (
        <section className="celebrate-screen" aria-label="Berhasil, kejutan sedang dibuka" role="status" aria-live="polite">
          <div className="celebrate-hearts" aria-hidden="true">💖 ✨ 💖</div>
          <h1>Yaaay, ketangkep! 🎉</h1>
          <p>Ternyata kamu jago juga... ada sesuatu nih buat kamu!</p>
        </section>
      )}
      {screen === "won" && <SurpriseEnding onReplay={startSession} />}
    </main>
  );
}
