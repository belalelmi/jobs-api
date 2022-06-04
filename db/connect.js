import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.blue);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectdb;
