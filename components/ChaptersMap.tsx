"use client";

import { useEffect, useLayoutEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { locations, type ChapterLocation } from "@/lib/chapterLocations";
import { PIN_PATH, DIAMOND_PATH, LocationIcon } from "@/lib/chapterIcons";
import { HOVER_EASE, HOVER_EASE_CSS, HOVER_MS } from "@/lib/motion";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const CENTER: [number, number] = [-96, 38.5];
const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_TRANSITION_MS = 400;
const ACTIVE_PIN_SCALE = 1.25;

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
      className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-[#F4F1F6] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
      style={{ color: "#460C61" }}
    >
      {children}
    </button>
  );
}

const PIN_SCALE = 0.95;
const PIN_TIP_X = 12 * PIN_SCALE;
const PIN_TIP_Y = 21.9 * PIN_SCALE;

// The tooltip eases in a touch slower than the pin grows, so it settles in
// just after the pin rather than snapping up with it.
const tooltipTransition = { duration: 0.55, ease: HOVER_EASE, delay: 0.05 };

function Tooltip({
  location,
  zoom,
  offset,
  rectRef,
}: {
  location: ChapterLocation;
  zoom: number;
  offset: { x: number; y: number };
  rectRef: React.RefObject<SVGRectElement | null>;
}) {
  // A flat, square-cornered tag set in the site's mono label style, joined to
  // the pin by a thin leader line, rather than a floating rounded card.
  const label = location.name.toUpperCase();
  const sub = `${location.city}, ${location.state}`.toUpperCase();
  // Mono text widths are estimated from character counts (SVG text can't be
  // measured before render): ~0.6em per glyph plus letter-spacing.
  const textWidth = Math.max(label.length * 7.3, sub.length * 6.5);
  const padX = 12;
  const width = textWidth + padX * 2;
  const height = 42;
  const left = -width / 2;
  const leader = 10;
  // The leader points at the pin even when the tag has been nudged inward
  // from a map edge (the offset shifts the whole tooltip, so undo it here).
  const leaderX = Math.min(Math.max(-offset.x, left + 1), left + width - 1);
  // counter-scale against the map's zoom so the tooltip never grows past its
  // size at the default zoom level, however far in the user zooms
  const scale = 1 / zoom;
  const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" };
  return (
    <g transform={`scale(${scale}) translate(${offset.x}, ${offset.y})`} style={{ pointerEvents: "none" }}>
      <g transform={`translate(0, -${PIN_TIP_Y * ACTIVE_PIN_SCALE + leader})`}>
        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={tooltipTransition}>
          {offset.y <= 0 && (
            <line x1={leaderX} y1={0} x2={leaderX} y2={leader - offset.y} stroke="#2D0840" strokeWidth={1} />
          )}
          <rect ref={rectRef} x={left} y={-height} width={width} height={height} fill="#2D0840" />
          <text x={left + padX} y={-height + 17} fontSize={11} fontWeight={500} letterSpacing="0.06em" fill="#FFFFFF" style={mono}>
            {label}
          </text>
          <text x={left + padX} y={-height + 32} fontSize={10} letterSpacing="0.06em" fill="#E2BDFF" fillOpacity={0.75} style={mono}>
            {sub}
          </text>
        </motion.g>
      </g>
    </g>
  );
}

export function LocationCard({ location }: { location: ChapterLocation }) {
  return (
    <div className="flex w-full items-center gap-3 bg-white px-3 py-2.5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center" style={{ backgroundColor: "#F4F1F6" }}>
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
      <div className="min-w-0">
        <p className="truncate text-[15px] font-medium tracking-[-0.01em]" style={{ color: "#1E293B" }}>
          {location.school}
        </p>
        <p className="mono-label mt-1 text-[11px]" style={{ color: "#7A4A8A" }}>
          {location.city}, {location.state}
        </p>
      </div>
    </div>
  );
}

export default function ChaptersMap({
  activeId: activeIdProp,
  setActiveId: setActiveIdProp,
}: {
  activeId?: string | null;
  setActiveId?: Dispatch<SetStateAction<string | null>>;
} = {}) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const isControlled = setActiveIdProp !== undefined;
  const activeId = isControlled ? activeIdProp ?? null : internalActiveId;
  const setActiveId = isControlled ? setActiveIdProp! : setInternalActiveId;

  const [zoom, setZoom] = useState(1);
  const [isZoomAnimating, setIsZoomAnimating] = useState(false);
  const zoomAnimationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeLocation = locations.find((loc) => loc.id === activeId) ?? null;

  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRectRef = useRef<SVGRectElement>(null);
  const tooltipOffsetRef = useRef({ x: 0, y: 0 });
  const [tooltipOffset, setTooltipOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (zoomAnimationTimeout.current) clearTimeout(zoomAnimationTimeout.current);
    };
  }, []);

  // Keep the active tooltip from being clipped by the map's edges: measure
  // where it actually lands on screen and nudge it back inward if needed.
  // The previous offset is subtracted back out so each pass starts from the
  // tooltip's natural (unshifted) position rather than compounding drift.
  useLayoutEffect(() => {
    const svg = svgRef.current;
    const rect = tooltipRectRef.current;
    if (!svg || !rect || !activeLocation) {
      tooltipOffsetRef.current = { x: 0, y: 0 };
      setTooltipOffset({ x: 0, y: 0 });
      return;
    }

    const svgRect = svg.getBoundingClientRect();
    const tipRect = rect.getBoundingClientRect();
    const ctm = rect.getScreenCTM();
    const scaleX = ctm?.a || 1;
    const scaleY = ctm?.d || 1;
    // wide enough that the tooltip's drop shadow isn't clipped by the map edge
    const margin = 18;

    const prevOffsetPxX = tooltipOffsetRef.current.x * scaleX;
    const prevOffsetPxY = tooltipOffsetRef.current.y * scaleY;
    const left = tipRect.left - prevOffsetPxX;
    const right = tipRect.right - prevOffsetPxX;
    const top = tipRect.top - prevOffsetPxY;
    const bottom = tipRect.bottom - prevOffsetPxY;

    let dxPx = 0;
    if (left < svgRect.left + margin) dxPx = svgRect.left + margin - left;
    else if (right > svgRect.right - margin) dxPx = svgRect.right - margin - right;

    let dyPx = 0;
    if (top < svgRect.top + margin) dyPx = svgRect.top + margin - top;
    else if (bottom > svgRect.bottom - margin) dyPx = svgRect.bottom - margin - bottom;

    const next = { x: scaleX ? dxPx / scaleX : 0, y: scaleY ? dyPx / scaleY : 0 };
    tooltipOffsetRef.current = next;
    setTooltipOffset(next);
  }, [activeId, zoom, activeLocation]);

  const animateZoom = (updater: (z: number) => number) => {
    setIsZoomAnimating(true);
    setZoom(updater);
    if (zoomAnimationTimeout.current) clearTimeout(zoomAnimationTimeout.current);
    zoomAnimationTimeout.current = setTimeout(() => setIsZoomAnimating(false), ZOOM_TRANSITION_MS);
  };

  const zoomIn = () => animateZoom((z) => Math.min(z * 1.5, MAX_ZOOM));
  const zoomOut = () => animateZoom((z) => Math.max(z / 1.5, MIN_ZOOM));

  return (
    <div className="relative w-full p-3 sm:p-5" style={{ backgroundColor: "#F4F1F6" }}>
      <ComposableMap
        ref={svgRef}
        projection="geoAlbersUsa"
        className="w-full h-auto"
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          center={CENTER}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          style={{
            transition: isZoomAnimating ? `transform ${ZOOM_TRANSITION_MS}ms ${HOVER_EASE_CSS}` : undefined,
          }}
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
                  stroke="#E6DCEE"
                  strokeWidth={0.6}
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
                {/* Grows from the marker's anchor point (the pin tip), at the same
                    pace as the list highlight */}
                <g
                  style={{
                    transform: `scale(${isActive ? ACTIVE_PIN_SCALE : 1})`,
                    transition: `transform ${HOVER_MS}ms ${HOVER_EASE_CSS}`,
                  }}
                >
                  {isHub ? (
                    <g transform="translate(0, -10)">
                      {loc.icon ? (
                        <image
                          href={loc.icon}
                          x={-11 * (loc.mapIconScale ?? 1)}
                          y={-11 * (loc.mapIconScale ?? 1)}
                          width={22 * (loc.mapIconScale ?? 1)}
                          height={22 * (loc.mapIconScale ?? 1)}
                          preserveAspectRatio="xMidYMid meet"
                        />
                      ) : (
                        <>
                          <path d={DIAMOND_PATH} fill="#FFFFFF" stroke="#460C61" strokeWidth={2} />
                          <circle cx={0} cy={0} r={2.5} fill="#460C61" />
                        </>
                      )}
                    </g>
                  ) : (
                    <g transform={`translate(${-PIN_TIP_X}, ${-PIN_TIP_Y}) scale(${PIN_SCALE})`}>
                      <path d={PIN_PATH} fill="#460C61" stroke="#FFFFFF" strokeWidth={0.75} />
                    </g>
                  )}
                </g>
              </Marker>
            );
          })}

          {/* Rendered last (and outside each pin's own group) so the tooltip
              always paints above every marker, regardless of draw order. */}
          {activeLocation && (
            <Marker coordinates={activeLocation.coordinates} style={{ pointerEvents: "none" }}>
              <Tooltip
                key={activeLocation.id}
                location={activeLocation}
                zoom={zoom}
                offset={tooltipOffset}
                rectRef={tooltipRectRef}
              />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden bg-white shadow-[0_6px_20px_rgba(45,8,64,0.08)] sm:bottom-5 sm:right-5">
        <ZoomButton onClick={zoomIn} disabled={zoom >= MAX_ZOOM} label="Zoom in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </ZoomButton>
        <span className="mx-2 h-px" style={{ backgroundColor: "#F4F1F6" }} />
        <ZoomButton onClick={zoomOut} disabled={zoom <= MIN_ZOOM} label="Zoom out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25}>
            <path strokeLinecap="round" d="M5 12h14" />
          </svg>
        </ZoomButton>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 px-1" style={{ color: "#7A4A8A" }}>
        <span className="mono-label inline-flex items-center gap-2 text-[11px]">
          <svg width="12" height="12" viewBox="0 0 24 24">
            <path d={PIN_PATH} fill="#460C61" />
          </svg>
          High school chapter
        </span>
        <span className="mono-label inline-flex items-center gap-2 text-[11px]">
          <svg width="12" height="12" viewBox="-10 -11 20 22">
            <path d={DIAMOND_PATH} fill="#FFFFFF" stroke="#460C61" strokeWidth={2} />
          </svg>
          University partner
        </span>
      </div>
    </div>
  );
}
