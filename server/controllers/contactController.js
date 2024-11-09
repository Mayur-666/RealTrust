import Contact from "../models/contactSchema.js";
import ErrorHandling from "../utils/ErrorHandling.js";
import HandleAsyncErrors from "../utils/HandleAsyncErrors.js";

const createContact = HandleAsyncErrors(async (req, res, next) => {
  try {
    const { contactData } = req.body;

    if (!contactData) {
      return next(new ErrorHandling("Enter valid details.", 401));
    }

    const isContactExist = await Contact.findOne({
      email: contactData?.email,
    });

    if (isContactExist) {
      return next(new ErrorHandling("Details already exist.", 401));
    }

    await Contact.create({
      fullName: contactData.name,
      email: contactData.email,
      mobile: contactData.mobile,
      city: contactData.city,
    });
    res.status(200).send("We'll shortly reach out to you.");
  } catch (error) {
    return res.status(500).send("Error getting in touch with you.");
  }
});

export { createContact };
