import test from "node:test";
import assert from "node:assert/strict";
import {
  MIN_CLICKS, MAX_CLICKS, PLAYER_NAME, DIALOGS, ENDING_MESSAGES, pickEndingMessage, generateTarget,
  pickDialog, getRandomPosition, shouldFakeCatch, shouldShowDialog,
} from "../lib/game.js";

test("generateTarget always returns an integer between 6 and 10 over 10,000 draws", () => {
  const observed = new Set();
  for (let i = 0; i < 10_000; i++) {
    const target = generateTarget();
    assert.ok(Number.isInteger(target));
    assert.ok(target >= MIN_CLICKS && target <= MAX_CLICKS);
    observed.add(target);
  }
  assert.equal(observed.size, 5);
});

test("positions always fit inside valid areas with safety padding", () => {
  const geometries = [
    [960, 430, 150, 56], [350, 280, 150, 56], [220, 140, 150, 56],
    [160, 56, 150, 56], [80, 80, 48, 48], [700, 300, 110, 44],
  ];
  for (const [width, height, buttonWidth, buttonHeight] of geometries) {
    for (let i = 0; i < 500; i++) {
      const { x, y } = getRandomPosition(width, height, buttonWidth, buttonHeight);
      assert.ok(x >= 0 && x + buttonWidth <= width, `x out of bounds: ${x}`);
      assert.ok(y >= 0 && y + buttonHeight <= height, `y out of bounds: ${y}`);
      if (width >= buttonWidth + 36) assert.ok(x >= 18 && x + buttonWidth <= width - 18);
      if (height >= buttonHeight + 36) assert.ok(y >= 18 && y + buttonHeight <= height - 18);
    }
    for (const sample of [() => 0, () => 1, () => 0.5]) {
      const { x, y } = getRandomPosition(width, height, buttonWidth, buttonHeight, 18, sample);
      assert.ok(x >= 0 && x + buttonWidth <= width);
      assert.ok(y >= 0 && y + buttonHeight <= height);
    }
  }
});

test("dialog picker never repeats the previous dialog", () => {
  assert.ok(DIALOGS.length >= 10);
  for (const previous of DIALOGS) {
    for (let i = 0; i < 300; i++) {
      const current = pickDialog(previous);
      assert.ok(DIALOGS.includes(current));
      assert.notEqual(current, previous);
    }
  }
  assert.ok(DIALOGS.includes(pickDialog(null)));
});

test("fake catch is a nonterminal visual interruption", () => {
  for (let target = MIN_CLICKS; target <= MAX_CLICKS; target++) {
    assert.equal(shouldFakeCatch(target, target), false);
    for (let progress = 1; progress < target; progress++) {
      assert.equal(shouldFakeCatch(progress, target), progress % 3 === 0);
    }
  }
  assert.ok(shouldShowDialog(1, false));
  assert.ok(shouldShowDialog(3, true));
  assert.equal(shouldShowDialog(2, false), false);
});

test("ending messages are non-empty and picker returns a valid one", () => {
  assert.ok(ENDING_MESSAGES.length >= 1);
  for (const m of ENDING_MESSAGES) {
    assert.equal(typeof m, "string");
    assert.ok(m.trim().length > 0);
  }
  for (let i = 0; i < 300; i++) assert.ok(ENDING_MESSAGES.includes(pickEndingMessage()));
  assert.equal(pickEndingMessage(() => 0), ENDING_MESSAGES[0]);
  assert.equal(pickEndingMessage(() => 1), ENDING_MESSAGES[ENDING_MESSAGES.length - 1]);
});

test("player name is configured in lib and is a non-empty string", () => {
  assert.equal(typeof PLAYER_NAME, "string");
  assert.ok(PLAYER_NAME.trim().length > 0);
});
