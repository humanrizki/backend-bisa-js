import express from "express"
import Chapter from './../models/chapters.js'
// import Course from './../models/courses.js'
// import Users from "../models/users.js"
import Sequelize from 'sequelize'
import Module from './../models/modules.js'
import {Courses, Subcribes, Users} from "../models/course_user.js"

// import { verifyUser } from "./../middlewares/AuthUser.js"
const router = express.Router()
import Roles from './../models/roles.js'

import {login, logout, me, register} from './../controllers/Authentication.js'

router.post('/login', login)

router.get('/me', me)

router.delete('/logout', logout)

router.post('/register', register)
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