import sequelize from "../db/dbConfig.js";
import Dataypes  from "sequelize";


const user = sequelize.define("users",{
    id:{
        type: Dataypes.UUID,
        defaultValue: Dataypes.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    username:{
        type: Dataypes.STRING,
        allowNull: false,

    },

    password:{
        type:Dataypes.STRING,
        allowNull: false
    },

    email:{
        type:Dataypes.STRING,
        allowNull:false,
        validator:{
            isEmail:true
        }
    }

},
// {paranoid:true}
);




export default user;