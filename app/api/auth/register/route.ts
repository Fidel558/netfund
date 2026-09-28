import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, level, institution, department, password } = body;
    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabaseAdmin
      .from("users")
      .insert({
        name,
        email,
        phone,
        level,
        institution,
        department,
        password_hash: hash,
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, userId: data.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
