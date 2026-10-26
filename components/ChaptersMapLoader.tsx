"use client";

import dynamic from "next/dynamic";

// The map projects coordinates with floating-point trig that can differ in
// its last decimal place between server and client runtimes, so it's
// rendered client-only to avoid a cosmetic hydration mismatch.
const ChaptersMap = dynamic(() => import("@/components/ChaptersMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full aspect-[4/3] rounded-2xl border animate-pulse"
      style={{ borderColor: "#E2BDFF", backgroundColor: "#F6EBFF" }}
    />
  ),
});

export default ChaptersMap;
