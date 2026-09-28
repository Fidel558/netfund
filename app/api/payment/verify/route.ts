import { NextResponse } from "next/server";
import axios from "axios";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  if (!reference) return NextResponse.json({ success: false });

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = response.data.data;

    if (data.status === "success" && data.amount === 2250 * 100) {
      await supabaseAdmin
        .from("payments")
        .update({ status: "success", paid_at: new Date().toISOString() })
        .eq("reference", reference);

      await supabaseAdmin
        .from("users")
        .update({ form_unlocked: true })
        .eq("id", data.metadata.userId);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
