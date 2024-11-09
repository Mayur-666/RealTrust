import ErrorHandling from "../utils/ErrorHandling.js";
import HandleAsyncErrors from "../utils/HandleAsyncErrors.js";
import Client from "../models/clientSchema.js";

const createClient = HandleAsyncErrors(async (req, res, next) => {
  try {
    const { clientData } = req.body;

    if (!clientData) {
      return next(new ErrorHandling("Enter valid details.", 401));
    }
    console.log(clientData.name);
    await Client.create({
      name: clientData.name,
      designation: clientData.designation,
      description: clientData.description,
      image: clientData.image,
    });
    console.log(clientData.designation);

    res.status(200).send("Client created succesfully!");
  } catch (error) {
    return res.status(500).send("Error in creating client");
  }
});

export { createClient };
