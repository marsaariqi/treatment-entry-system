import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Treatment =
  mongoose.models.Treatment || mongoose.model("Treatment", treatmentSchema);
const Medication =
  mongoose.models.Medication || mongoose.model("Medication", medicationSchema);

export { Treatment, Medication };
