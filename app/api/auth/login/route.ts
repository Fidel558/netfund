import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { data: user, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ success: true, userId: user.id });
}
