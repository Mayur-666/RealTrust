import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter client's name"],
      trim: true,
      maxlength: [100, "Project title can not exceed 100 characters"],
    },
    designation: {
      type: String,
      required: [true, "Please enter client's designation"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
    },
    image: {
      type: String,
      required: [true, "Please enter image"],
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
