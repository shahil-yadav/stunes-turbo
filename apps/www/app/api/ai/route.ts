import { NextRequest, NextResponse } from "next/server";
import { BASE_URL_2 } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const songId = searchParams.get("songId");
  if (!songId) {
    return NextResponse.json(
      { error: "Missing song id parameters" },
      { status: 400 },
    );
  }

  const response = await fetch(`${BASE_URL_2}/songs/${songId}/suggestions`);
  const json = await response.json();
  return NextResponse.json(json, { status: 200 });
}
