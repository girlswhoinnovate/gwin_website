"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { locations, type ChapterLocation } from "@/lib/chapterLocations";
import { LocationIcon } from "@/lib/chapterIcons";
import { HOVER_EASE_CSS, HOVER_MS, hoverTransition } from "@/lib/motion";

const colorTransition = `background-color ${HOVER_MS}ms ${HOVER_EASE_CSS}, color ${HOVER_MS}ms ${HOVER_EASE_CSS}`;

function ListItem({
  location,
  active,
  onSelect,
}: {
  location: ChapterLocation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      className="relative flex w-full items-center gap-3 px-3 py-2.5 text-left"
    >
      {/* Highlight slides between rows as the active location changes */}
      {active && (
        <motion.span
          layoutId="chapter-highlight"
          className="absolute inset-0"
          style={{ backgroundColor: "#F4F1F6" }}
          transition={hoverTransition}
        />
      )}

      <span
        className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center"
        style={{ backgroundColor: active ? "#FFFFFF" : "#F4F1F6", transition: colorTransition }}
      >
        <span className="relative h-6 w-6">
          {location.icon ? (
            <Image
              src={location.icon}
              alt={`${location.school} logo`}
              fill
              sizes="24px"
              className="object-contain"
              style={{ transform: location.iconScale ? `scale(${location.iconScale})` : undefined }}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <LocationIcon kind={location.kind} />
            </span>
          )}
        </span>
      </span>

      <span className="relative min-w-0 flex-1">
        <span
          className="block truncate text-[15px] font-medium tracking-[-0.01em]"
          style={{ color: active ? "#460C61" : "#1E293B", transition: colorTransition }}
        >
          {location.school}
        </span>
        <span className="mono-label mt-1 block text-[11px]" style={{ color: "#7A4A8A" }}>
          {location.city}, {location.state}
        </span>
      </span>
    </button>
  );
}

function Group({
  label,
  items,
  activeId,
  setActiveId,
}: {
  label: string;
  items: ChapterLocation[];
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mono-label mb-2 px-3" style={{ color: "#7A4A8A" }}>
        {label} · {items.length}
      </p>
      <div className="space-y-0.5">
        {items.map((loc) => (
          <ListItem
            key={loc.id}
            location={loc}
            active={activeId === loc.id}
            onSelect={() => setActiveId(loc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChapterList({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter(
      (loc) =>
        loc.school.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q)
    );
  }, [query]);

  const chapters = filtered.filter((l) => l.kind === "chapter");
  const hubs = filtered.filter((l) => l.kind === "hub");

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="relative mb-5 flex-shrink-0">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7A4A8A"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by school, city, or state"
          className="w-full py-3 pl-11 pr-4 text-sm outline-none ring-[#460C61]/30 transition-shadow placeholder:text-[#7A4A8A]/70 focus:ring-2"
          style={{ backgroundColor: "#F4F1F6", color: "#1E293B" }}
        />
      </div>

      {/* Scrollable list */}
      <LayoutGroup>
        <div className="-mx-1 max-h-[460px] min-h-0 flex-1 space-y-6 overflow-y-auto px-1 md:max-h-none">
          <Group label="High school chapters" items={chapters} activeId={activeId} setActiveId={setActiveId} />
          <Group label="University partners" items={hubs} activeId={activeId} setActiveId={setActiveId} />

          {filtered.length === 0 && (
            <p className="px-3 text-sm" style={{ color: "#7A4A8A" }}>
              No chapters or schools match &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      </LayoutGroup>
    </div>
  );
}
