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
          className="flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg w-14 h-14 hover:bg-green-600 transition-all hover:scale-105"
          aria-label="WhatsApp Us"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setError(null);
            setSuccess(null);
          }}
          className="flex items-center gap-2 rounded-full bg-blue-600 text-white shadow-lg px-5 py-3 font-semibold hover:bg-blue-700 transition-all hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Contact Us</span>
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
