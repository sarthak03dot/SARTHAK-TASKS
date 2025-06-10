const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/Task");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("Error in connection:", err);
  });

app.use("/api/tasks", taskRoutes);

app.get("/hii", (req, res) => {
  res.send("This is My Secret.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
