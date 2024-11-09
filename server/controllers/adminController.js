import Client from "../models/clientSchema.js";
import Contact from "../models/contactSchema.js";
import Newsletter from "../models/newsletterSubscriptionSchema.js";
import Project from "../models/projectSchema.js";
import ErrorHandling from "../utils/ErrorHandling.js";
import HandleAsyncErrors from "../utils/HandleAsyncErrors.js";

const ADMIN_STATIC_USERNAME = "admin";
const ADMIN_STATIC_PASSWORD = "admin";

const adminLogin = HandleAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandling("Please Enter Email & Password", 400));
  }
  const isUserNameMatched = username === ADMIN_STATIC_USERNAME;

  if (!isUserNameMatched) {
    return next(new ErrorHandling("Invalid Email or Password", 401));
  }

  const isPasswordMatched = password === ADMIN_STATIC_PASSWORD;
  if (!isPasswordMatched) {
    return next(new ErrorHandling("Invalid Email or Password", 401));
  }
  res.status(200).send("Logged in Successfully.");
});

const adminLogout = HandleAsyncErrors(async (req, res, next) => {
  res.status(200).send("Logged out Successfully.");
});

const getDetails = HandleAsyncErrors(async (req, res, next) => {
  console.log(req.query);
  const { page, type } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  let data;
  let totalItems;
  switch (type) {
    case "contacts":
      totalItems = await Contact.countDocuments();
      data = await Contact.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      break;
    case "newsletters":
      totalItems = await Newsletter.countDocuments();
      data = await Newsletter.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      break;
    case "projects":
      totalItems = await Project.countDocuments();
      data = await Project.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      break;
    case "clients":
      totalItems = await Client.countDocuments();
      data = await Client.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      break;
    default:
      return next(new ErrorHandling("Invalid type parameter", 400));
  }

  console.log(totalItems);
  res.status(200).json({
    success: true,
    totalItems,
    data,
  });
});

export { adminLogin, adminLogout, getDetails };
