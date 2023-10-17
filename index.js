import express from "express";
import sequelize from "./db/dbConfig.js";
import bodyParser from "body-parser";
import postRoute from "./routes/postRoute.js";
import userouter from "./routes/userRoute.js"

const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use("/post", postRoute);
app.use("/like", likeroute);
app.use("/user",userouter)

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
} catch (error) {
  console.error();
}
