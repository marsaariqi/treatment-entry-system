import connectMongo from "@/lib/connectMongo";
import { Treatment, Medication } from "@/models/Manage";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectMongo();
    const { slug, id } = await params;

    if (slug === "treatments") {
      const deletedTreatment = await Treatment.findByIdAndDelete(id);
      if (!deletedTreatment) {
        return NextResponse.json(
          { error: "Treatment not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Treatment deleted successfully" },
        { status: 200 }
      );
    } else if (slug === "medications") {
      const deletedMedication = await Medication.findByIdAndDelete(id);
      if (!deletedMedication) {
        return NextResponse.json(
          { error: "Medication not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Medication deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
