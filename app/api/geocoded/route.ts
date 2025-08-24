import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try{
    const searchParams = req.nextUrl.searchParams;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const city = searchParams.get('search');

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const res = await axios.get(url);

    // console.log(res.data)

    return NextResponse.json(res.data);
  } catch(err) {
    console.error(err);
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}