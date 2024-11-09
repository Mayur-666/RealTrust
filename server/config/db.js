import mongoose from "mongoose";

const connect = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected: " + client.connection.host);
  } catch (error) {
    console.log(error);
  }
};
export default connect;
