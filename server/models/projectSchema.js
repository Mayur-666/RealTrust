import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter project title"],
      trim: true,
      maxlength: [100, "Project title can not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter project description"],
    },
    image: {
      type: String,
      required: [true, "Please enter project image"],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
