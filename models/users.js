import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import CourseUser from "./course_user.js"
import Courses from "./courses.js"
const Users = db.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    alphadashed: true,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true,
})
// Users.hasMany(CourseUser, {foreignKey: 'userId'})


export default Users