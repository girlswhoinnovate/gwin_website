// Shared timing for hover/selection feedback in the chapters list and map, so
// the list highlight, map pins and map tooltip all move at the same pace.
export const HOVER_S = 0.35;
export const HOVER_MS = HOVER_S * 1000;
export const HOVER_EASE = [0.22, 1, 0.36, 1] as const;
export const HOVER_EASE_CSS = `cubic-bezier(${HOVER_EASE.join(", ")})`;
export const hoverTransition = { duration: HOVER_S, ease: HOVER_EASE };
