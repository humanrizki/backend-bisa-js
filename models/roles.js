import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
const Roles = db.define('roles', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
  
}, {
  freezeTableName: true,
})
export default Roles