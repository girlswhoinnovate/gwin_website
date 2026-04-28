"use client";

// Infinite horizontal marquee — CSS-driven so it's silky smooth at any frame rate.

const items = [
  "95 Girls Impacted",
  "561 Girls Interested",
  "43 Schools & Universities",
  "Free Summer Bootcamp",
  "Applications Open · Summer 2026",
  "Female Entrepreneurship",
  "Innovation Has No Age Limit",
  "Pitch. Build. Lead.",
];

function Dot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full mx-6 flex-shrink-0 self-center"
      style={{ backgroundColor: "#E2BDFF" }}
    />
  );
}

export default function MarqueeTicker() {
  // Duplicate the list so the seam is invisible
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ backgroundColor: "#460C61", borderColor: "#7A4A8A" }}
      aria-hidden
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to right, #460C61, transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
        style={{ background: "linear-gradient(to left, #460C61, transparent)" }}
      />

      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((text, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "#E2BDFF" }}
            >
              {text}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
