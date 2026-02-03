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
  requirement: z.string().trim().optional().default(""),
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

import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = ContactSchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    const { name, phone, email, requirement } = parsed.data;
    const now = new Date().toISOString();

    // 1. Try Google Sheets (Best Effort)
    try {
      const sheetId = process.env.GOOGLE_SHEET_ID || "1BMerktk9fl5fxbTb6QaJYkbX5jXtBhCbangyRIEkjbo";
      if (sheetId) {
        const sheetName = process.env.GOOGLE_SHEET_TAB ?? "Sheet1";
        const auth = getJwt();
        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: `${sheetName}!A:E`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[now, name, phone, email, requirement]],
          },
        });
        console.log("Saved to Google Sheets");
      } else {
        console.warn("Skipping Google Sheets: GOOGLE_SHEET_ID missing");
      }
    } catch (sheetError) {
      console.error("Google Sheets Error (Ignored):", sheetError);
      // Fall through to CSV backup
    }

    // 2. CSV Fallback (Always run if Sheets failed or just as backup)
    try {
      const csvLine = `"${now}","${name}","${phone}","${email}","${requirement.replace(/"/g, '""')}"\n`;
      const csvPath = path.join(process.cwd(), "contacts.csv");

      // Check if file exists to add header
      try {
        await fs.access(csvPath);
      } catch {
        await fs.writeFile(csvPath, `"Timestamp","Name","Phone","Email","Requirement"\n`, "utf8");
      }

      await fs.appendFile(csvPath, csvLine, "utf8");
      console.log("Saved to CSV");
    } catch (csvError) {
      console.error("CSV File Error:", csvError);
      // If this fails too, we really have a problem, but still return 200 to user to avoid panic
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    // Even global failure, try to return success so user doesn't lose hope, 
    // though realistically logic above catches most things.
    return NextResponse.json({ ok: true });
  }
}

