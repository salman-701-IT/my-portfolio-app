import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await db.contactMessage.create({
      data: { name, email, subject, message },
    });
  } catch (err) {
    console.error("[api/contact] db error", err);
    return NextResponse.json(
      { ok: false, error: "Failed to store message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
