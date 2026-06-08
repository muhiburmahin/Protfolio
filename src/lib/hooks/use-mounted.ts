"use client";

import { useSyncExternalStore } from "react";

/** True after client hydration — avoids SSR/client mismatch without setState in effects. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
