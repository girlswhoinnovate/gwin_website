"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { locations } from "@/lib/chapterLocations";
import { PIN_PATH, DIAMOND_PATH } from "@/lib/chapterIcons";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const CENTER: [number, number] = [-96, 38.5];
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

function ZoomButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-full border shadow-sm transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E2BDFF", color: "#460C61" }}
    >
      {children}
    </button>
  );
}

const PIN_SCALE = 0.95;
const PIN_TIP_X = 12 * PIN_SCALE;
const PIN_TIP_Y = 21.9 * PIN_SCALE;

function Tooltip({ label, sub }: { label: string; sub: string }) {
  const width = Math.max(150, label.length * 8.6 + 32);
  const height = 46;
  return (
    <g transform={`translate(0, -${PIN_TIP_Y + 12})`} style={{ pointerEvents: "none" }}>
      <rect
        x={-width / 2}
        y={-height}
        width={width}
        height={height}
        rx={8}
        fill="#2D0840"
        stroke="#E2BDFF"
        strokeWidth={1.25}
      />
      <text textAnchor="middle" y={-27} fontSize={14} fontWeight={700} fill="#FFFFFF">
        {label}
      </text>
      <text textAnchor="middle" y={-10} fontSize={12} fill="#E2BDFF">
        {sub}
      </text>
    </g>
  );
}

export default function ChaptersMap({
  activeId,
  setActiveId,
}: {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}) {
  const [zoom, setZoom] = useState(1);
  const activeLocation = locations.find((loc) => loc.id === activeId) ?? null;

  const zoomIn = () => setZoom((z) => Math.min(z * 1.5, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.5, MIN_ZOOM));

  return (
    <div
      className="relative w-full rounded-2xl border p-3 sm:p-5"
      style={{ borderColor: "#E2BDFF", backgroundColor: "#F6EBFF" }}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-auto"
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          center={CENTER}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={({ zoom: z }) => {
            if (z !== undefined) setZoom(z);
          }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#FFFFFF"
                  stroke="#D8B4FE"
                  strokeWidth={0.75}
                  style={{ outline: "none" }}
                />
              ))
            }
          </Geographies>

          {locations.map((loc) => {
            const isActive = activeId === loc.id;
            const isHub = loc.kind === "hub";
            return (
              <Marker
                key={loc.id}
                coordinates={loc.coordinates}
                onMouseEnter={() => setActiveId(loc.id)}
                onMouseLeave={() => setActiveId((cur) => (cur === loc.id ? null : cur))}
                onClick={() => setActiveId((cur) => (cur === loc.id ? null : loc.id))}
                style={{ cursor: "pointer" }}
              >
                {isHub ? (
                  <g transform={`translate(0, -10) ${isActive ? "scale(1.25)" : ""}`}>
                    <path d={DIAMOND_PATH} fill="#FFFFFF" stroke="#460C61" strokeWidth={2} />
                    <circle cx={0} cy={0} r={2.5} fill="#460C61" />
                  </g>
                ) : (
                  <g
                    transform={`${
                      isActive ? "scale(1.2) " : ""
                    }translate(${-PIN_TIP_X}, ${-PIN_TIP_Y}) scale(${PIN_SCALE})`}
                  >
                    <path d={PIN_PATH} fill="#460C61" stroke="#FFFFFF" strokeWidth={0.75} />
                  </g>
                )}
              </Marker>
            );
          })}

          {/* Rendered last (and outside each pin's own group) so the tooltip
              always paints above every marker, regardless of draw order. */}
          {activeLocation && (
            <Marker coordinates={activeLocation.coordinates} style={{ pointerEvents: "none" }}>
              <Tooltip label={activeLocation.name} sub={`${activeLocation.city}, ${activeLocation.state}`} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex flex-col gap-2">
        <ZoomButton onClick={zoomIn} disabled={zoom >= MAX_ZOOM} label="Zoom in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </ZoomButton>
        <ZoomButton onClick={zoomOut} disabled={zoom <= MIN_ZOOM} label="Zoom out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M5 12h14" />
          </svg>
        </ZoomButton>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs font-medium" style={{ color: "#1E293B" }}>
        <span className="inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path d={PIN_PATH} fill="#460C61" />
          </svg>
          High School Chapter
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="-10 -11 20 22">
            <path d={DIAMOND_PATH} fill="#FFFFFF" stroke="#460C61" strokeWidth={2} />
          </svg>
          University Partner
        </span>
      </div>
    </div>
  );
}
