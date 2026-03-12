import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dns from "dns";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.replace(/:[^@]+@/, ":***@")
        : "NOT SET",
      DIRECT_URL: process.env.DIRECT_URL
        ? process.env.DIRECT_URL.replace(/:[^@]+@/, ":***@")
        : "NOT SET",
    },
  };

  // DNS check
  try {
    const host = "db.rxlbfqwwfsinnirbpnsv.supabase.co";
    const [resolve4, resolve6, resolveAll] = await Promise.allSettled([
      new Promise((res, rej) => dns.resolve4(host, (err, addr) => err ? rej(err) : res(addr))),
      new Promise((res, rej) => dns.resolve6(host, (err, addr) => err ? rej(err) : res(addr))),
      new Promise((res, rej) => dns.resolve(host, (err, addr) => err ? rej(err) : res(addr))),
    ]);
    checks.dns = { resolve4, resolve6, resolveAll };
  } catch (e) {
    checks.dns = { error: String(e) };
  }

  try {
    const result = await prisma.$queryRaw`SELECT 1 as ok`;
    checks.database = { status: "connected", result };
  } catch (err: unknown) {
    const error = err as Error;
    checks.database = {
      status: "error",
      message: error.message,
      name: error.constructor.name,
    };
  }

  const status =
    (checks.database as Record<string, unknown>).status === "connected"
      ? 200
      : 500;
  return NextResponse.json(checks, { status });
}
