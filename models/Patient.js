import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  treatmentDate: {
    type: Date,
    required: true,
  },
  treatmentDescriptions: {
    type: [String],
    default: [],
  },
  medications: {
    type: [String],
    default: [],
  },
  cost: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Patient ||
  mongoose.model("Patient", PatientSchema);
