import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dns from "dns";

// Monkey-patch dns.lookup to fall back to IPv6 (dns.resolve6) when IPv4 fails.
// Supabase DB hosts only have AAAA records, and Vercel's dns.lookup() only returns IPv4.
const _origLookup = dns.lookup;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(dns as any).lookup = function patchedLookup(
  hostname: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionsOrCb?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb?: any,
) {
  const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
  const options = typeof optionsOrCb === "function" ? {} : (optionsOrCb ?? {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (_origLookup as any).call(dns, hostname, options, (err: NodeJS.ErrnoException | null, address: string, family: number) => {
    if (!err) {
      callback(null, address, family);
      return;
    }
    // If lookup failed (e.g. no IPv4), try DNS resolve6
    dns.resolve6(hostname, (err6, addresses6) => {
      if (!err6 && addresses6 && addresses6.length > 0) {
        callback(null, addresses6[0], 6);
      } else {
        callback(err, address, family);
      }
    });
  });
};

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
