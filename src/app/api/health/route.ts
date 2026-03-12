import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "NOT SET",
  };

  try {
    const { data, error } = await supabaseAdmin
      .from("Product")
      .select("id")
      .limit(1);
    if (error) throw error;
    checks.database = { status: "connected", sampleProduct: data?.[0]?.id };
  } catch (err: unknown) {
    const error = err as Error;
    checks.database = { status: "error", message: error.message };
  }

  const status =
    (checks.database as Record<string, unknown>).status === "connected"
      ? 200
      : 500;
  return NextResponse.json(checks, { status });
}
