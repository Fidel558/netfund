import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.text();
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== req.headers.get("x-paystack-signature")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.event === "charge.success") {
    const { reference, metadata, amount } = event.data;
    if (amount === 2250 * 100) {
      await supabaseAdmin
        .from("payments")
        .update({ status: "success", paid_at: new Date().toISOString() })
        .eq("reference", reference);

      await supabaseAdmin
        .from("users")
        .update({ form_unlocked: true })
        .eq("id", metadata.userId);
    }
  }

  return NextResponse.json({ received: true });
}
