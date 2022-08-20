import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import Roles from "./roles.js"
export const Users = db.define('users', {
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
export const Courses = db.define('courses', {
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
const CourseUser = db.define('courses_users', {
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true,
})
Roles.hasMany(Users)
Users.belongsTo(Roles, {foreignKey: 'roleId'})
Users.belongsToMany(Courses, {
  through: CourseUser,
  as: 'courses',
  foreignKey: 'userId'
})
Courses.belongsToMany(Users, {
  through: CourseUser,
  as: 'users',
  foreignKey: 'courseId'
})
export default CourseUser