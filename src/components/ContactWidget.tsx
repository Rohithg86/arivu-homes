"use client";

import { useMemo, useState } from "react";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  requirement: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.phone.trim()) return false;
    if (!form.email.trim() || !isValidEmail(form.email)) return false;
    if (!form.requirement.trim()) return false;
    return true;
  }, [form]);

  async function submit() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = (await res.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
    if (!res.ok) {
      setError(data?.error ?? "Failed to submit");
      setLoading(false);
      return;
    }
    setSuccess("Thanks! We’ll contact you shortly.");
    setForm({ name: "", phone: "", email: "", requirement: "" });
    setLoading(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setError(null);
          setSuccess(null);
        }}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-600 text-white shadow-lg px-5 py-3 font-semibold hover:bg-blue-700"
      >
        Contact Us
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <p className="text-sm text-gray-600 mt-1">Share your requirement and we’ll get back quickly.</p>
              </div>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <input
                className="border rounded-lg p-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className="border rounded-lg p-2"
                placeholder="Phone Number"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <input
                className="border rounded-lg p-2"
                placeholder="Email ID"
                inputMode="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
              <textarea
                className="border rounded-lg p-2"
                placeholder="Short requirement description"
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

