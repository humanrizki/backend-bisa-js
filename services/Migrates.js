import { up as upUsers } from "./../migrations/users.js";
import { up as upCourses} from "./../migrations/courses.js";
import { up as upRoles} from "./../migrations/roles.js";
import { bisajs } from "./../config/Database.js"
import { DataTypes } from "sequelize"
const queryInterface = bisajs.getQueryInterface()
export const migrateAll = () => {
    upUsers(queryInterface, DataTypes)
    upRoles(queryInterface, DataTypes)
    upCourses(queryInterface, DataTypes)
}