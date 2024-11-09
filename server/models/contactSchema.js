import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxlength: [100, "Name can not exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    mobile: {
      type: String,
      required: [true, "Please enter subject"],
    },
    city: {
      type: String,
      required: [true, "Please enter message"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
