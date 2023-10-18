import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./db/dbConfig.js";
import bodyParser from "body-parser";
import postRoute from "./routes/postRoute.js";
import useRoute from "./routes/userRoute.js";
import likeRoute from "./routes/likeRoute.js";

const app = express();

app.use(bodyParser.json());
dotenv.config();
const port = process.env.PORT;
app.use("/user", useRoute);
app.use("/post", postRoute);
app.use("/like", likeRoute);

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
