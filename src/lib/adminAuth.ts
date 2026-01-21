import crypto from "node:crypto";

const COOKIE_NAME = "arivu_admin";

export function getAdminCookieName() {
  return COOKIE_NAME;
}

function getSecret() {
  // Allow local/dev usage without requiring .env setup.
  // In production you should set ADMIN_AUTH_SECRET to a strong random string.
  return process.env.ADMIN_AUTH_SECRET ?? "arivu_admin_auth_secret_change_me";
}

type SessionPayload = {
  v: 1;
  sub: "admin";
  iat: number;
  exp: number;
};

function base64url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlJson(obj: unknown) {
  return base64url(Buffer.from(JSON.stringify(obj), "utf8"));
}

function hmac(data: string) {
  return base64url(crypto.createHmac("sha256", getSecret()).update(data).digest());
}

export function signAdminSession(ttlSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1,
    sub: "admin",
    iat: now,
    exp: now + ttlSeconds,
  };
  const body = base64urlJson(payload);
  const sig = hmac(body);
  return `${body}.${sig}`;
}

export function verifyAdminSession(token: string | undefined | null) {
  if (!token) return { ok: false as const, reason: "missing" as const };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false as const, reason: "format" as const };
  const [body, sig] = parts;
  const expected = hmac(body);
  // timing safe compare
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false as const, reason: "signature" as const };
  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
  } catch {
    return { ok: false as const, reason: "json" as const };
  }
  const now = Math.floor(Date.now() / 1000);
  if (payload.sub !== "admin" || payload.v !== 1) return { ok: false as const, reason: "claims" as const };
  if (payload.exp <= now) return { ok: false as const, reason: "expired" as const };
  return { ok: true as const };
}

