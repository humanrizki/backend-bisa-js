import {Sequelize} from "sequelize"

export const db = new Sequelize('bisajs_dev', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
