const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://axeldahan:J6qGjyb9x3HVdxLc@cluster0.84r2fqu.mongodb.net/tickethack";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
