import Project from "../models/projectSchema.js";
import ErrorHandling from "../utils/ErrorHandling.js";
import HandleAsyncErrors from "../utils/HandleAsyncErrors.js";

const createProject = HandleAsyncErrors(async (req, res, next) => {
  try {
    const { projectData } = req.body;
    if (!projectData) {
      return next(new ErrorHandling("Enter valid details.", 401));
    }
    await Project.create({
      title: projectData.title,
      description: projectData.description,
      image: projectData.image,
    });
    res.status(200).send("Project created successfully.");
  } catch (error) {
    return res.status(500).send("Error in creating project");
  }
});

export { createProject };
