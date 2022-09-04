import {Users} from '../models/course_user.js'
import Roles from '../models/roles.js'
export const verifyUser = async(req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "mohon login ke akun anda!"})
    }
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        },
        include: {
            model: Roles,
            as: 'role'
        }
    })
    if(!user) {
        return res.status(404).json({msg: "User tidak ditemukan!"})
    }
    req.userId = user.id
    req.role = user.role.type
    next()
}