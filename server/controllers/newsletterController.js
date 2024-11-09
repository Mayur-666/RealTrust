import Newsletter from "../models/newsletterSubscriptionSchema.js";
import ErrorHandling from "../utils/ErrorHandling.js";
import HandleAsyncErrors from "../utils/HandleAsyncErrors.js";

const createNewsletter = HandleAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandling("Enter valid email.", 401));
    }
    const isEmailExists = await Newsletter.findOne({ email: email });
    if (isEmailExists) {
      return next(new ErrorHandling("Email already exists.", 401));
    }
    await Newsletter.create({
      email: email,
    });
    res.status(200).send("Congrats! On subscribing to out newsletter.");
  } catch (error) {
    return res.status(500).send("Error in subscribing.");
  }
});

export { createNewsletter };
