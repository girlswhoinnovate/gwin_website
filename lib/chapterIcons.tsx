export const PIN_PATH =
  "M12 0C7.58 0 4 3.58 4 8c0 5.25 6.42 13.09 7.11 13.91.22.26.6.26.82 0C12.58 21.09 20 13.25 20 8c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z";

export const DIAMOND_PATH = "M0,-11 L9.5,0 L0,11 L-9.5,0 Z";

export function LocationIcon({
  kind,
  size = 14,
}: {
  kind: "chapter" | "hub";
  size?: number;
}) {
  if (kind === "hub") {
    return (
      <svg width={size} height={size} viewBox="-10 -11 20 22">
        <path d={DIAMOND_PATH} fill="#FFFFFF" stroke="#460C61" strokeWidth={2} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={PIN_PATH} fill="#460C61" />
    </svg>
  );
}
