export type ChapterLocation = {
  id: string;
  name: string;
  school: string;
  city: string;
  state: string;
  coordinates: [number, number];
  kind: "chapter" | "hub";
  icon?: string;
  // relative size multipliers for `icon`, since the source logos aren't
  // cropped to the same visual weight (e.g. UVA's mark sits in a lot of
  // whitespace). `iconScale` applies in the sidebar list, `mapIconScale`
  // on the map; each defaults to 1 when omitted.
  iconScale?: number;
  mapIconScale?: number;
};

export const locations: ChapterLocation[] = [
  {
    id: "apex",
    name: "Apex Friendship High School",
    school: "Apex Friendship High School",
    city: "Apex",
    state: "NC",
    coordinates: [-78.8503, 35.7327],
    kind: "chapter",
  },
  {
    id: "winsor",
    name: "Winsor School",
    school: "Winsor School",
    city: "Boston",
    state: "MA",
    coordinates: [-71.1232, 42.3399],
    kind: "chapter",
  },
  {
    id: "interlake",
    name: "Interlake High School",
    school: "Interlake High School",
    city: "Bellevue",
    state: "WA",
    coordinates: [-122.1715, 47.6101],
    kind: "chapter",
  },
  {
    id: "echs",
    name: "East Chapel Hill High School",
    school: "East Chapel Hill High School",
    city: "Chapel Hill",
    state: "NC",
    // nudged northwest from the true coordinates (35.9132, -79.0558) so the
    // pin doesn't sit on top of the nearby Apex and Duke markers
    coordinates: [-80.31, 36.43],
    kind: "chapter",
  },
  {
    id: "nanuet",
    name: "Nanuet Senior High School",
    school: "Nanuet Senior High School",
    city: "Nanuet",
    state: "NY",
    coordinates: [-74.0121, 41.0909],
    kind: "chapter",
  },
  {
    id: "uva",
    name: "University of Virginia",
    school: "University of Virginia",
    city: "Charlottesville",
    state: "VA",
    coordinates: [-78.508, 38.0336],
    kind: "hub",
    icon: "/images/uva_mini.png",
    iconScale: 0.9,
  },
  {
    id: "duke",
    name: "Duke University",
    school: "Duke University",
    city: "Durham",
    state: "NC",
    // nudged southeast from the true coordinates (36.0014, -78.9382) so the
    // pin doesn't sit on top of the nearby Apex and Chapel Hill markers
    coordinates: [-77.6, 34.69],
    kind: "hub",
    icon: "/images/duke_mini.png",
    iconScale: 0.85,
    mapIconScale: 0.9,
  },
  {
    id: "barnard-columbia",
    name: "Barnard & Columbia University",
    school: "Columbia University and Barnard College",
    city: "New York City",
    state: "NY",
    // nudged southwest from the true coordinates (40.8075, -73.9626) so the
    // pin doesn't sit on top of the nearby Nanuet marker
    coordinates: [-75.42, 40.36],
    kind: "hub",
    icon: "/images/columbia_mini.png",
  },
];
