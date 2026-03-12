import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dns from "dns";
import net from "net";

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
  const host = "db.rxlbfqwwfsinnirbpnsv.supabase.co";
  try {
    const [resolve4, resolve6, lookup] = await Promise.allSettled([
      new Promise((res, rej) => dns.resolve4(host, (err, addr) => err ? rej(err) : res(addr))),
      new Promise((res, rej) => dns.resolve6(host, (err, addr) => err ? rej(err) : res(addr))),
      new Promise((res, rej) => dns.lookup(host, { all: true }, (err, addr) => err ? rej(err) : res(addr))),
    ]);
    checks.dns = { resolve4, resolve6, lookup };
  } catch (e) {
    checks.dns = { error: String(e) };
  }

  // TCP IPv6 connection test
  try {
    const ipv6 = await new Promise<string>((res, rej) =>
      dns.resolve6(host, (err, addr) => (err ? rej(err) : res(addr[0])))
    );
    const tcpResult = await new Promise<string>((resolve, reject) => {
      const socket = net.createConnection({ host: ipv6, port: 5432, family: 6 }, () => {
        socket.destroy();
        resolve("TCP IPv6 connected to " + ipv6 + ":5432");
      });
      socket.setTimeout(5000);
      socket.on("timeout", () => { socket.destroy(); reject(new Error("TCP timeout")); });
      socket.on("error", (err) => reject(err));
    });
    checks.tcp = { status: "ok", result: tcpResult };
  } catch (e) {
    checks.tcp = { status: "error", message: String(e) };
  }

  // Pooler TCP test
  try {
    const poolerResult = await new Promise<string>((resolve, reject) => {
      const socket = net.createConnection({ host: "aws-0-us-east-1.pooler.supabase.com", port: 6543 }, () => {
        socket.destroy();
        resolve("TCP pooler connected");
      });
      socket.setTimeout(5000);
      socket.on("timeout", () => { socket.destroy(); reject(new Error("TCP timeout")); });
      socket.on("error", (err) => reject(err));
    });
    checks.poolerTcp = { status: "ok", result: poolerResult };
  } catch (e) {
    checks.poolerTcp = { status: "error", message: String(e) };
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
