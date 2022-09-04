import { db } from "../config/Database.js"
import { DataTypes } from "sequelize"
import Roles from "./roles.js"
import Sequelize from 'sequelize'
export const Subcribes = db.define('subcribes', {
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true
}) 
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
    unique: {
      args: true,
      msg: 'Ups, Akun dengan Username ini sudah ada!',
      fields: [Sequelize.fn('lower', Sequelize.col('username'))]
    },
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Ups, Akun dengan Email ini sudah ada!',
      fields: [Sequelize.fn('lower', Sequelize.col('email'))]
    },
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
  indexes: [
    {
      unique: true,
      fields: ['username', 'email']
    }
  ]
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
Users.belongsToMany(Courses, {
  through: Subcribes,
  as: 'coursesSub',
  foreignKey: 'userId'
})
Courses.belongsToMany(Users, {
  through: CourseUser,
  as: 'users',
  foreignKey: 'courseId'
})
Courses.belongsToMany(Users, {
  through: Subcribes,
  foreignKey: 'courseId',
  as: 'subscribers'
})
export default CourseUser