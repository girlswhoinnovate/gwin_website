"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { locations, type ChapterLocation } from "@/lib/chapterLocations";
import { LocationIcon } from "@/lib/chapterIcons";

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
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={onSelect}
      whileHover={{ x: 2 }}
      className="flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors"
      style={{
        borderColor: active ? "#460C61" : "#E2BDFF",
        backgroundColor: active ? "#F6EBFF" : "#FFFFFF",
      }}
    >
      <span
        className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#F6EBFF" }}
      >
        <LocationIcon kind={location.kind} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: "#1E293B" }}>
          {location.school}
        </p>
        <p className="text-xs" style={{ color: "#7A4A8A" }}>
          {location.city}, {location.state}
        </p>
      </div>
    </motion.button>
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
      <div className="relative mb-4 flex-shrink-0">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
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
          className="w-full rounded-full border py-2.5 pl-9 pr-4 text-sm focus:outline-none"
          style={{ borderColor: "#E2BDFF", color: "#1E293B" }}
        />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 space-y-5 overflow-y-auto pr-1" style={{ maxHeight: 460 }}>
        {chapters.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#460C61" }}>
              High School Chapters
            </p>
            <div className="space-y-2">
              {chapters.map((loc) => (
                <ListItem
                  key={loc.id}
                  location={loc}
                  active={activeId === loc.id}
                  onSelect={() => setActiveId(loc.id)}
                />
              ))}
            </div>
          </div>
        )}

        {hubs.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#460C61" }}>
              University Partners
            </p>
            <div className="space-y-2">
              {hubs.map((loc) => (
                <ListItem
                  key={loc.id}
                  location={loc}
                  active={activeId === loc.id}
                  onSelect={() => setActiveId(loc.id)}
                />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-sm" style={{ color: "#7A4A8A" }}>
            No chapters or schools match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}
