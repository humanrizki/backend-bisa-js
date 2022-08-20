import express from "express"
import Chapter from './../models/chapters.js'
// import Course from './../models/courses.js'
// import Users from "../models/users.js"
import Module from './../models/modules.js'
import {Courses, Users} from "../models/course_user.js"
const router = express.Router()

router.get('/courses', async(req, res)=>{
    try{
        const courses = await Courses.findAll({
            // attributes: ['title','image','slug','description'],
            include: [
                {
                    model: Users,
                    as: 'users'
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
            include: {
                model: Users,
                as: 'users',
                attributes: ['name','email','username','roleId']
            }
        })
        
        const modules = await Module.findAll({
            where: {
                courseId: course.id
            },
            include: {
                model: Chapter,
            }
        })
        res.status(200).json({course, modules})
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
export default router