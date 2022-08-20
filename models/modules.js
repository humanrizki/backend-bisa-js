import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import Courses from './courses.js'
const Modules = db.define('modules', {
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  slug: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true,
})
Courses.hasMany(Modules)
Modules.belongsTo(Courses, {foreignKey: 'courseId'})
export default Modules