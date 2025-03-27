import connectMongo from "@/lib/connectMongo";
import { Treatment, Medication } from "@/models/Manage";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectMongo();
    const { slug } = await params;
    const body = await req.json();

    if (slug === "treatment") {
      const treatment = await Treatment.create(body);
      return NextResponse.json({ treatment }, { status: 201 });
    } else if (slug === "medication") {
      const medication = await Medication.create(body);
      return NextResponse.json({ medication }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const { slug } = await params;

    if (slug === "treatments") {
      const treatments = await Treatment.find({});
      return NextResponse.json({ treatments }, { status: 200 });
    } else if (slug === "medications") {
      const medications = await Medication.find({});
      return NextResponse.json({ medications }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
