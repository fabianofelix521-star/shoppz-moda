import { NextRequest, NextResponse } from "next/server";
import * as db from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || "newest";
  const ids = searchParams.get("ids");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  if (ids) {
    const products = await db.findProductsByIds(ids.split(","));
    return NextResponse.json({ products, total: products.length, pages: 1 });
  }

  const result = await db.getProducts({ category, search, sort, page, limit });

  return NextResponse.json(result);
}
