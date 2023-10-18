import express from "express";
import sequelize from "./db/dbConfig.js";
import bodyParser from "body-parser";
import postRoute from "./routes/postRoute.js";
import useRoute from "./routes/userRoute.js";
import likeRoute from "./routes/likeRoute.js";

const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use("/post", postRoute);
app.use("/like", likeRoute);
app.use("/user", useRoute);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
} catch (error) {
  console.error();
}

(async () => {
  await sequelize.sync();
})();
