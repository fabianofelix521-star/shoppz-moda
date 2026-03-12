import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dns from "dns";

// Monkey-patch dns.lookup to fall back to IPv6 (dns.resolve6) when IPv4 fails.
// Supabase DB hosts only have AAAA records, and Vercel's dns.lookup() only returns IPv4.
const _origLookup = dns.lookup;
dns.lookup = function patchedLookup(
  hostname: unknown,
  optionsOrCb?: unknown,
  cb?: unknown,
) {
  const callback =
    typeof optionsOrCb === "function"
      ? (optionsOrCb as (err: NodeJS.ErrnoException | null, address: string, family: number) => void)
      : (cb as (err: NodeJS.ErrnoException | null, address: string, family: number) => void);
  const options =
    typeof optionsOrCb === "function" ? {} : (optionsOrCb ?? {});

  // Call original lookup first
  _origLookup(hostname as string, options as dns.LookupOptions, (err, address, family) => {
    if (!err) {
      callback(null, address, family);
      return;
    }
    // If IPv4 lookup failed, try DNS resolve6
    dns.resolve6(hostname as string, (err6, addresses6) => {
      if (!err6 && addresses6 && addresses6.length > 0) {
        callback(null, addresses6[0], 6);
      } else {
        // Return original error
        callback(err, address, family);
      }
    });
  });
} as typeof dns.lookup;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;
  const parsed = new URL(connectionString);
  const isSupabaseDirect =
    parsed.hostname.includes("db.") && parsed.hostname.includes("supabase.co");

  const pool = new Pool({
    connectionString,
    ssl: isSupabaseDirect ? { rejectUnauthorized: false } : undefined,
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
