import express from "express";
import sequelize from "./db/dbConfig.js";
import bodyparser from "body-parser"; 
import likeroute from "./routes/likeRoute.js";



const app =  express();
app.use(bodyparser.json());
const port = 3000;



app.use("/like", likeroute);


 try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port,()=> {
    console.log(`App is listing @ ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  (async()=>{
    await sequelize.sync()
  })();

