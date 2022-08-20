import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import Modules from "./modules.js"

const Chapters = db.define('chapters', {
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    validate:{
      notEmpty: true
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true,
})
Modules.hasMany(Chapters)
Chapters.belongsTo(Modules, {foreignKey: 'moduleId'})
export default Chapters