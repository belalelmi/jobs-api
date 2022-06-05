import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      maxlength: [20, "Company name must be at most 20 characters"],
    },
    position: {
      type: String,
      required: [true, "Position name is required"],
      maxlength: [20, "Position name must be at most 20 characters"],
    },
    status: {
      type: String,
      enum: [
        "applied",
        "interviewing",
        "hired",
        "rejected",
        "declined",
        "pending",
      ],
      default: "pending",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      maxlength: [20, "Location must be at most 20 characters"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      maxlength: [10, "Salary must be at most 20 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
