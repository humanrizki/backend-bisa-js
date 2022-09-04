import express from "express"
import Chapter from './../models/chapters.js'
// import Course from './../models/courses.js'
// import Users from "../models/users.js"
import Sequelize from 'sequelize'
import Module from './../models/modules.js'
import {Courses, Subcribes, Users} from "../models/course_user.js"
import Roles from "../models/roles.js"
import argon2 from 'argon2'
import { verifyUser } from "./../middlewares/AuthUser.js"
const router = express.Router()
import Joi from "joi"
import expressJoi from 'express-joi-validation'
const validator = expressJoi.createValidator({})

// const registerSchema = Joi.object({
//     name: Joi.string().required(),
//     username: Joi.string().alphanum().required()
// })
router.post('/login', async(req, res)=>{
    const registerSchema = Joi.object().keys({ 
        email: Joi.string().email({
            minDomainSegments: 1,
            tlds: {
                allow: ['com']
            }
        }).required().messages({
            "string.empty":"Email tidak boleh kosong",
            "string.email":"Email tidak valid"
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
    })
    const result = registerSchema.validate(req.body, {abortEarly: false})
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
        return res.status(422).json({ 
            msg: 'Gagal Login!', 
            data: value,
            error: error.details
        }) 
    } 
    const user = await Users.findOne({
        where: {
            email: value.email
        }, 
        include: {
            model: Roles,
            as: 'role'
        }
    });
    if(!user) return res.status(404).json({
        msg: "Gagal Login!", 
        error: [
            {
                message: 'User tidak ditemukan!'
            }
        ]
    });
    const match = await argon2.verify(user.password, value.password);
    if(!match) return res.status(400).json({
        msg: "Gagal Login!",
        error: [
            {
                message: 'Password akun salah!'
            }
        ]
    });
    req.session.userId = user.id
    res.status(200).json({msg: "Login berhasil",
    user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role.type,
    }});
})

router.get('/me', async(req, res)=>{
    if(!req.session.userId) return res.status(401).json({
        msg: "Mohon login ke akun anda!"
    })
    const user = await Users.findOne({
        attributes: ['id','name','username','email','roleId'],
        where: {
            id: req.session.userId,
        },
        include: {
            model: Roles,
            as: 'role'
        }
    })
    if(!user) return res.status(404).json({
        msg: "User tidak ditemukan!"
    })
    res.status(200).json({msg: "Credentials user",user})
})

router.delete('/logout', async(req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({
            msg: 'Tidak dapat Logout!'
        })
        res.status(200).json({
            msg: 'Anda berhasil logout!'
        })
    })
})
router.post('/register', async(req, res)=>{
    if(req.session.userId) return res.status(403).json({
        msg: 'Akses register ditolak, karena anda sudah login!'
    })
    const {body} = req
    const registerSchema = Joi.object().keys({ 
        name: Joi.string().required().messages({
            "string.empty":"Name tidak boleh kosong"
        }),
        email: Joi.string().email({
            minDomainSegments: 1,
            tlds: {
                allow: ['com']
            }
        }).required().messages({
            "string.empty":"Email tidak boleh kosong",
            "string.email":"Email tidak valid"
        }),
        username: Joi.string().required().alphanum().messages({
            "string.empty":"Username tidak boleh kosong",
            "string.alphanum":"Username hanya boleh berisi angka dan huruf tanpa simbol"
        }),
        password: Joi.string().required().alphanum().messages({
            "string.empty":"Password tidak boleh kosong",
            "string.alphanum":"Password hanya boleh berisi angka dan huruf tanpa simbol"
        }),
    }); 
    const result = registerSchema.validate(body, {abortEarly: false})
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
        return res.status(422).json({ 
            msg: 'Gagal registrasi!', 
            data: body,
            error: error
        }) 
    } 
    try{
        const hashPassword = await argon2.hash(value.password)
        await Users.create({
            name: value.name,
            email: value.email,
            username: value.username,
            password: hashPassword,
            roleId: 2
        })
        const user = await Users.findOne({
            where: {
                email: value.email
            },
            include: {
                model: Roles,
                as: "role",
                attributes: ['type']
            }
        })
        req.session.userId = user.id
        return res.status(201).json({
            msg: "User berhasil daftar!"
        })
    }catch(e){
        return res.status(500).json({msg: "Gagal Registrasi", 
        error: e.errors})
    }
})
router.get('/courses', async(req, res)=>{
    try{
        const courses = await Courses.findAll({
            // attributes: ['title','image','slug','description'],
            include: [
                {
                    model: Users,
                    as: 'users'
                },
                { 
                    model: Users,
                    as: 'subscribers'
                }
            ]
        })

        res.status(200).json({courses})
    } catch(e) {
        res.status(500).json({msg: e.message})
    }
})
router.get('/courses/:courseSlug', async(req,res)=>{
    try{
        const course = await Courses.findOne({
            where: {
                slug: req.params.courseSlug,
                
            },
            attributes: ['id','title','image','description'],
            include: [
                {
                    model: Users,
                    as: 'users',
                    attributes: ['name','email','username','roleId'],
                    include: {
                        model: Roles,
                        as: 'role',
                        attributes: ['type']
                    }
                },
                {
                    model: Users,
                    as:"subscribers"
                }
            ]
        })
        if(!course) return res.status(404).json({msg: 'Course not found'})
        const subscribers = await Subcribes.findAll({
            attributes: ['courseId',[Sequelize.fn('count', Sequelize.col('userId')),'subscribers']],
            group: ['courseId'],
            where: {
                courseId: course.id
            },
            
        })
        const modules = await Module.findAll({
            where: {
                courseId: course.id
            },
            include: {
                model: Chapter,
            }
        })
        res.status(200).json({course, modules, subscribers})
    } catch(e) {
        res.status(500).json({msg: e.message})
    }
})
router.post('/chapters', async(req, res)=>{
    try{
        const chapter = await Chapter.create({
            title: req.body.title
        })
        res.status(201).json({chapter})
    } catch(e) {
        res.status(500).json(e.message)
    }
})
router.post('/courses/:courseSlug/subscribe', async(req, res)=>{
    if(!req.session.userId) return res.status(403).json({
        msg: "Aksi subscribe tidak dibolehkan!",
        statusCode: 403
    })
    try{
        const course = await Courses.findOne({
            where: {
                slug: req.params.courseSlug
            }
        })
        if(!course) return res.status(404).json({
            msg: 'Course tidak ditemukan!'
        })
        const subscribe = await Subcribes.findOne({
            where: {
                userId: req.session.userId,
                courseId: course.id,
            }
        })
        if(!subscribe){
            await Subcribes.create({
                courseId: course.id,
                userId: req.session.userId
            })
            return res.status(201).json({
                msg: 'Berhasil subscribe ke course!',
                statusCode: 201
            })
        } else {
            await Subcribes.destroy({
                where: {
                    courseId: course.id,
                    userId: req.session.userId
                }
            })
            return res.status(200).json({
                msg: 'Berhasil UnSubscribe ke course!',
                statusCode: 200
            })
        }
    } catch (e){
        return res.status(500).json(e)
    }
})
router.get('/courses/:courseSlug/subscribe', async(req, res)=>{
    if(!req.session.userId) return res.status(403).json({
        msg: "Anda belum login!",
        statusCode: 403
    })
    try{
        const course = await Courses.findOne({
            where: {
                slug: req.params.courseSlug
            }
        })
        if(!course) return res.status(404).json({
            msg: 'Course tidak ditemukan!'
        })
        const subscribe = await Subcribes.findOne({
            where: {
                userId: req.session.userId,
                courseId: course.id,
            }
        })
        if(!subscribe){
            return res.status(404).json({
                msg: 'Anda belum subscribe'
            })
        } else {
            return res.status(200).json(subscribe)
        }
    } catch (e){
        return res.status(500).json(e)
    }
})
export default router