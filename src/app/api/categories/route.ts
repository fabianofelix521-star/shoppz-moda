import { NextResponse } from "next/server";
import { getCategoriesSimple } from "@/lib/db";

export async function GET() {
  const categories = await getCategoriesSimple();
  return NextResponse.json(categories);
}
