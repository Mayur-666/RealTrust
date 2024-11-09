import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connect from "./config/db.js";
import {
  adminLogin,
  adminLogout,
  getDetails,
} from "./controllers/adminController.js";
import { createClient } from "./controllers/clientController.js";
import { createProject } from "./controllers/projectController.js";
import HandleError from "./utils/HandleErrors.js";
import morgan from "morgan";
import { createContact } from "./controllers/contactController.js";
import { createNewsletter } from "./controllers/newsletterController.js";

//remove in deployment
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

connect();

const app = express();
app.use(
  cors({
    origin: "*", //chage to frontend url
  })
);

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

app.post("/admin/login", adminLogin);
app.get("/admin/logout", adminLogout);
app.get("/get-details", getDetails);
app.post("/create/client", createClient);
app.post("/create/project", createProject);
app.post("/create/contact", createContact);
app.post("/create/newsletter", createNewsletter);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
});

app.use(HandleError);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

//remove in deployment
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
