import { ConvexHttpClient } from "convex/browser";

// Production Convex URL - must be set in environment variables
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error("VITE_CONVEX_URL environment variable is required");
}

// Cloudflare Turnstile Site Key - set in Cloudflare Pages environment variables
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

// Create HTTP client for API calls
const convex = new ConvexHttpClient(CONVEX_URL);

// =============================================================================
// CLIENT FINGERPRINTING
// =============================================================================

/**
 * Generate a simple browser fingerprint for rate limiting
 * This is NOT for tracking users - just for bot protection
 */
export function generateFingerprint(): string {
  if (typeof window === "undefined") return "server";

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
    // Canvas fingerprint (lightweight)
    (() => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return "no-canvas";
        ctx.textBaseline = "top";
        ctx.font = "14px Arial";
        ctx.fillText("fingerprint", 2, 2);
        return canvas.toDataURL().slice(-50);
      } catch {
        return "canvas-error";
      }
    })(),
  ];

  // Simple hash function
  const str = components.join("|");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// =============================================================================
// WAITLIST API
// =============================================================================

type WaitlistArgs = {
  email: string;
  source?: string;
  referrer?: string;
  userAgent?: string;
  fingerprint?: string;
  turnstileToken?: string;
  honeypot?: string;
};

type WaitlistResult = {
  success: boolean;
  alreadyExists: boolean;
};

/**
 * Add email to waitlist with full protection
 * - Rate limiting (server-side)
 * - Honeypot detection
 * - Turnstile verification (if configured)
 * - Fingerprint tracking
 */
export async function addToWaitlist(args: WaitlistArgs): Promise<WaitlistResult> {
  // Add fingerprint if not provided
  const fingerprint = args.fingerprint || generateFingerprint();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (convex as any).action("waitlist:addEmail", {
    ...args,
    fingerprint,
  });
}

export async function getWaitlistCount(): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (convex as any).query("waitlist:getCount", {});
}
