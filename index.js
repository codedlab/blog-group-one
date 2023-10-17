import express from "express";
import sequelize from "./db/dbConfig.js";
import userouter from "./routes/userRoute.js"
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())
const port = 3000 ;

app.use("/user",userouter)
app.use("/like", likeroute);

 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port,()=> {
    console.log(`App is listening @ ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }