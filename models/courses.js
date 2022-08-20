import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import CourseUser from "./course_user.js"
import Users from "./users.js"
const Courses = db.define('courses', {
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
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true,
})
// Courses.hasMany(CourseUser, {
//   foreignKey: 'coursesId'
// })
// Courses.hasMany(CourseUser, {foreignKey: 'courseId'})
export default Courses