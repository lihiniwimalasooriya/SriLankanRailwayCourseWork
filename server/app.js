const express = require("express");
const path=require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const trainseatsroutes=require('../server/routes/trainseatroutes')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://lihinisupunikaw:lWW1RF07nPD5csOg@cluster0.j7swb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

const locationRoutes = require("./routes/locationRoutes");
app.use("/api", locationRoutes);
app.use("/book",trainseatsroutes);

const PORT = process.env.PORT || 8080;
// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
