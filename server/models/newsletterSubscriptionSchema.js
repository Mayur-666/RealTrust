import mongoose from "mongoose";

const newsletterSubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
  },
  { timestamps: true }
);

const Newsletter = mongoose.model("Newsletter", newsletterSubscriptionSchema);
export default Newsletter;
