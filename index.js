import express from "express";
import sequelize from "./db/dbConfig.js";
import userouter from "./routes/userRoute.js"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())
const port = 3000 ;

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

(async () => {
  await sequelize.sync();
})();