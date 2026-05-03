/**
 * Format a number as Indian Rupees with grouping (1,17,350 lakh-style).
 */
export const formatINR = (n: number, opts: { showDecimals?: boolean } = {}): string => {
  const { showDecimals = false } = opts;
  const fixed = showDecimals ? n.toFixed(2) : Math.round(n).toString();
  const parts = fixed.split(".");
  const intPart = parts[0];
  const decPart = parts[1];

  // Indian-style grouping: last 3, then 2-by-2.
  const len = intPart.length;
  let grouped: string;
  if (len <= 3) {
    grouped = intPart;
  } else {
    const last3 = intPart.slice(len - 3);
    const rest = intPart.slice(0, len - 3);
    const restGrouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    grouped = `${restGrouped},${last3}`;
  }

  return decPart ? `₹${grouped}.${decPart}` : `₹${grouped}`;
};

/**
 * Format an integer count: 2,345 -> "2,345"
 */
export const formatCount = (n: number): string => {
  return n.toLocaleString("en-IN");
};

/** Build a slug from a string for SEO-friendly URLs. */
export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Compute vehicle class from total weight in kg. */
export const vehicleClassFor = (weightKg: number): "mini" | "medium" | "heavy" | "x_heavy" => {
  if (weightKg <= 4500) return "mini";
  if (weightKg <= 13500) return "medium";
  if (weightKg <= 27500) return "heavy";
  return "x_heavy";
};

/** Validate Indian GSTIN format. */
export const isValidGstin = (s: string): boolean =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(s.trim());

/** Validate Indian phone (10 digits). */
export const isValidIndianPhone = (s: string): boolean =>
  /^[6-9]\d{9}$/.test(s.replace(/\s|-/g, ""));
