"use client";

import { useMemo, useState, useEffect } from "react";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  requirement: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isValidPhone(phone: string) {
  const digits = normalizePhone(phone);
  return digits.length === 10;
}

export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const phoneInvalid = useMemo(() => {
    if (!form.phone.trim()) return false;
    return !isValidPhone(form.phone);
  }, [form.phone]);

  const emailInvalid = useMemo(() => {
    if (!form.email.trim()) return false;
    return !isValidEmail(form.email);
  }, [form.email]);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.phone.trim() || !isValidPhone(form.phone)) return false;
    if (!form.email.trim() || !isValidEmail(form.email)) return false;
    return true;
  }, [form]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setError(null);
        setSuccess(null);
        setForm({ name: "", phone: "", email: "", requirement: "" });
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  async function submit() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (!res.ok) {
        setError(data?.error ?? "Failed to submit. Please try again.");
        setLoading(false);
        return;
      }
      setSuccess("Thanks! We'll contact you shortly.");
      setForm({ name: "", phone: "", email: "", requirement: "" });
      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 2000);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
        <a
          href="https://wa.me/916361867464"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-green-500 text-white shadow-lg px-4 py-2 font-semibold hover:bg-green-600 transition-all hover:scale-105"
        >
          <span className="text-xl">💬</span>
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setError(null);
            setSuccess(null);
          }}
          className="rounded-full bg-blue-600 text-white shadow-lg px-5 py-3 font-semibold hover:bg-blue-700 transition-all hover:scale-105"
        >
          Contact Support
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setOpen(false); setError(null); setSuccess(null); setForm({ name: "", phone: "", email: "", requirement: "" }); }} />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <p className="text-sm text-gray-600 mt-1">Share your requirement and we&apos;ll get back quickly.</p>
                <p className="text-xs text-gray-500 mt-1">Phone number and email ID are mandatory.</p>
              </div>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-900"
                onClick={() => { setOpen(false); setError(null); setSuccess(null); setForm({ name: "", phone: "", email: "", requirement: "" }); }}
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <input
                className="border rounded-lg p-2"
                placeholder="Name *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <input
                className={`border rounded-lg p-2 ${phoneInvalid ? "border-red-500" : ""}`}
                placeholder="Phone Number *"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                required
                aria-invalid={phoneInvalid}
              />
              {phoneInvalid && <div className="text-xs text-red-600">Enter a valid 10-digit phone number.</div>}
              <input
                className={`border rounded-lg p-2 ${emailInvalid ? "border-red-500" : ""}`}
                placeholder="Email ID *"
                type="email"
                inputMode="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                aria-invalid={emailInvalid}
              />
              {emailInvalid && <div className="text-xs text-red-600">Enter a valid email address.</div>}
              <textarea
                className="border rounded-lg p-2"
                placeholder="Short requirement description (optional)"
                rows={4}
                value={form.requirement}
                onChange={(e) => setForm((p) => ({ ...p, requirement: e.target.value }))}
              />

              {error && <div className="text-sm text-red-600">{error}</div>}
              {success && <div className="text-sm text-green-700">{success}</div>}

              <button
                type="button"
                disabled={!canSubmit || loading}
                onClick={submit}
                className="mt-1 w-full rounded-lg bg-black text-white py-2 font-semibold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
