import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";

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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email } = parsed.data;

  try {
    await db.newsletterSubscriber.create({
      data: { email },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.toLowerCase().includes("unique")) {
      return NextResponse.json(
        { ok: false, error: "Unique constraint failed: already subscribed" },
        { status: 409 },
      );
    }
    console.error("[api/newsletter] db error", err);
    return NextResponse.json(
      { ok: false, error: "Failed to subscribe" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
