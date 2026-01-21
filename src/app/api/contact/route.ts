import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

const PhoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => normalizePhone(v).length === 10, "Invalid phone number");

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: PhoneSchema,
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  requirement: z.string().trim().min(1, "Requirement is required"),
});

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

function getJwt() {
  const clientEmail = requireEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = requireEnv("GOOGLE_SHEETS_PRIVATE_KEY").replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function POST(req: NextRequest) {
  try {
    const parsed = ContactSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    const sheetId = requireEnv("GOOGLE_SHEET_ID");
    const sheetName = process.env.GOOGLE_SHEET_TAB ?? "Sheet1";

    const auth = getJwt();
    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date().toISOString();
    const { name, phone, email, requirement } = parsed.data;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:E`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[now, name, phone, email, requirement]],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}

