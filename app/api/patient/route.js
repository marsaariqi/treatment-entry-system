import connectMongo from "@/lib/connectMongo";
import Patient from "@/models/Patient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const patient = await Patient.create(body);
    return NextResponse.json({ patient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const patients = await Patient.find({});
    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
