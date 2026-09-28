import { NextResponse } from "next/server";
import axios from "axios";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("email, form_unlocked")
      .eq("id", userId)
      .single();

    if (error || !user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.form_unlocked) return NextResponse.json({ error: "Already paid" }, { status: 400 });

    const reference = `NETFUND_${String(userId).slice(0, 6)}_${Date.now()}`;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount: 2250 * 100,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/verify`,
        metadata: { userId, purpose: "netfund_form_fee" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    await supabaseAdmin.from("payments").insert({
      user_id: userId,
      reference,
      amount: 2250,
      status: "pending",
    });

    return NextResponse.json({
      authorization_url: response.data.data.authorization_url,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
