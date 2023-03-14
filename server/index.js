const tasks = require("./routes/tasks");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const port = process.env.PORT || 8083;
app.listen(port, () => console.log(`Listening on port ${port}...`));
